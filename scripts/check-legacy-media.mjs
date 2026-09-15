import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIRS = [
  join(ROOT, "src", "content", "blog"),
  join(ROOT, "src", "content", "translations"),
];
const LEGACY_PREFIX = "/blog/images/";
const CANONICAL_PREFIX = "/images/";
const CANONICAL_HINT = ".pages.yml media.output is /images/posts";

function listContentFiles() {
  const files = [];
  const walk = (directory) => {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const full = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/^[^_].*\.(md|mdx)$/i.test(entry.name)) continue;
      files.push(full);
    }
  };
  for (const directory of CONTENT_DIRS) walk(directory);
  return files.sort();
}

function splitFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: null, body: text, delimiterEnd: 0 };
  return { frontmatter: match[1], body: match[2], delimiterEnd: match[0].length - match[2].length };
}

function frontmatterLineCount(text) {
  const { frontmatter } = splitFrontmatter(text);
  if (frontmatter === null) return 0;
  return text.slice(0, text.indexOf(frontmatter) + frontmatter.length).split(/\r?\n/).length + 1;
}

function inlineCodeRanges(line) {
  const ranges = [];
  let index = 0;
  while (index < line.length) {
    const start = line.indexOf("`", index);
    if (start === -1) break;
    const delimiter = line.slice(start).match(/^`+/)?.[0] || "`";
    const end = line.indexOf(delimiter, start + delimiter.length);
    const stop = end === -1 ? line.length : end + delimiter.length;
    ranges.push([start, stop]);
    index = stop;
  }
  return ranges;
}

function isInRanges(position, ranges) {
  return ranges.some(([start, stop]) => position >= start && position < stop);
}

export function findIssuesForText(relativePath, text) {
  const issues = [];
  const { frontmatter } = splitFrontmatter(text);
  const lines = text.split(/\r?\n/);
  const frontmatterEndLine = frontmatter === null
    ? 0
    : (() => {
      const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return header ? header[0].split(/\r?\n/).length : 0;
    })();

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const lineNumber = lineIndex + 1;
    const inFrontmatter = lineIndex < frontmatterEndLine;
    if (inFrontmatter) {
      const frontmatterMatch = line.match(/^\s*(coverImage|heroImage)\s*:\s*["']?(\/blog\/images\/[^\s"'`]+)/);
      if (frontmatterMatch) {
        const legacy = frontmatterMatch[2];
        issues.push({
          file: relativePath,
          line: lineNumber,
          column: line.indexOf(LEGACY_PREFIX) + 1,
          kind: "frontmatter",
          legacy,
          fixed: legacy.replace(LEGACY_PREFIX, CANONICAL_PREFIX),
          snippet: line.trim().slice(0, 160),
        });
      }
      continue;
    }
  }

  let inFence = false;
  let fenceChar = "";
  let fenceLength = 0;
  for (let lineIndex = frontmatterEndLine; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    const lineNumber = lineIndex + 1;
    const trimmed = line.trimStart();
    const fenceMatch = trimmed.match(/^(```+|~~~+)/)?.[1];
    if (inFence) {
      if (fenceMatch && fenceMatch[0] === fenceChar && fenceMatch.length >= fenceLength) {
        inFence = false;
      }
      continue;
    }
    if (fenceMatch) {
      inFence = true;
      fenceChar = fenceMatch[0];
      fenceLength = fenceMatch.length;
      continue;
    }
    if (/^\s{4}\S/.test(line)) continue;

    const codeRanges = inlineCodeRanges(line);

    const checkMatch = (matchIndex, legacy) => {
      if (isInRanges(matchIndex, codeRanges)) return;
      issues.push({
        file: relativePath,
        line: lineNumber,
        column: matchIndex + 1,
        kind: "markdown",
        legacy,
        fixed: legacy.replace(LEGACY_PREFIX, CANONICAL_PREFIX),
        snippet: line.trim().slice(0, 160),
      });
    };

    for (const match of line.matchAll(/!?\[[^\]]*\]\(\s*(\/blog\/images\/[^)\s]+)/g)) {
      const legacy = match[1];
      const matchIndex = (match.index || 0) + match[0].indexOf(legacy);
      checkMatch(matchIndex, legacy);
    }
    const refMatch = line.match(/^\s*\[[^\]]+\]:\s*(\/blog\/images\/\S+)/);
    if (refMatch) {
      const legacy = refMatch[1];
      const matchIndex = line.indexOf(legacy);
      checkMatch(matchIndex, legacy);
    }
    for (const match of line.matchAll(/src\s*=\s*["'](\/blog\/images\/[^"']+)["']/g)) {
      const legacy = match[1];
      const matchIndex = (match.index || 0) + match[0].indexOf(legacy);
      checkMatch(matchIndex, legacy);
    }
  }

  void frontmatterLineCount;
  return issues;
}

export function fixText(text) {
  const lines = text.split(/\r?\n/);
  const { frontmatter } = splitFrontmatter(text);
  const frontmatterEndLine = frontmatter === null
    ? 0
    : (() => {
      const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return header ? header[0].split(/\r?\n/).length : 0;
    })();

  let count = 0;
  const fixedLines = [...lines];

  for (let lineIndex = 0; lineIndex < frontmatterEndLine; lineIndex += 1) {
    const line = fixedLines[lineIndex];
    if (/^\s*(coverImage|heroImage)\s*:/.test(line) && line.includes(LEGACY_PREFIX)) {
      fixedLines[lineIndex] = line.replaceAll(LEGACY_PREFIX, CANONICAL_PREFIX);
      count += line.split(LEGACY_PREFIX).length - 1;
    }
  }

  let inFence = false;
  let fenceChar = "";
  let fenceLength = 0;
  for (let lineIndex = frontmatterEndLine; lineIndex < fixedLines.length; lineIndex += 1) {
    const line = fixedLines[lineIndex];
    const trimmed = line.trimStart();
    const fenceMatch = trimmed.match(/^(```+|~~~+)/)?.[1];
    if (inFence) {
      if (fenceMatch && fenceMatch[0] === fenceChar && fenceMatch.length >= fenceLength) inFence = false;
      continue;
    }
    if (fenceMatch) {
      inFence = true;
      fenceChar = fenceMatch[0];
      fenceLength = fenceMatch.length;
      continue;
    }
    if (/^\s{4}\S/.test(line)) continue;
    if (!line.includes(LEGACY_PREFIX)) continue;

    const codeRanges = inlineCodeRanges(line);
    let result = "";
    let cursor = 0;
    const segments = [];
    const sorted = [...codeRanges].sort((a, b) => a[0] - b[0]);
    for (const [start, stop] of sorted) {
      segments.push({ text: line.slice(cursor, start), code: false });
      segments.push({ text: line.slice(start, stop), code: true });
      cursor = stop;
    }
    segments.push({ text: line.slice(cursor), code: false });

    for (const segment of segments) {
      if (segment.code) {
        result += segment.text;
        continue;
      }
      let chunk = segment.text;
      const before = chunk;
      chunk = chunk.replace(/(!?\[[^\]]*\]\(\s*)\/blog\/images\//g, "$1/images/");
      chunk = chunk.replace(/^(\s*\[[^\]]+\]:\s*)\/blog\/images\//, "$1/images/");
      chunk = chunk.replace(/(src\s*=\s*["'])\/blog\/images\//g, "$1/images/");
      if (chunk !== before) {
        const occurrences = (before.match(/\/blog\/images\//g) || []).length - (chunk.match(/\/blog\/images\//g) || []).length;
        count += Math.max(0, occurrences);
      }
      result += chunk;
    }
    fixedLines[lineIndex] = result;
  }

  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  return { fixed: fixedLines.join(eol), count };
}

function toRepoPath(absolute) {
  return relative(ROOT, absolute).split(sep).join("/");
}

export function checkFiles() {
  const files = listContentFiles();
  const allIssues = [];
  for (const absolute of files) {
    const text = readFileSync(absolute, "utf8");
    const issues = findIssuesForText(toRepoPath(absolute), text);
    allIssues.push(...issues);
  }
  return allIssues;
}

function printIssues(issues) {
  for (const issue of issues) {
    console.error(`- ${issue.file}:${issue.line}:${issue.column} legacy media path ${issue.legacy} -> ${issue.fixed} [${issue.kind}]`);
  }
  console.error(`\nFound ${issues.length} legacy Markdown media reference(s) using ${LEGACY_PREFIX}`);
  console.error(`Canonical media paths use ${CANONICAL_PREFIX} (${CANONICAL_HINT}).`);
  console.error("Fix safely with: node scripts/check-legacy-media.mjs --fix");
  console.error("Only Markdown destinations and coverImage/heroImage frontmatter are rewritten; prose, code blocks, inline code and external URLs are left untouched.");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fix = process.argv.includes("--fix");
  if (fix) {
    const files = listContentFiles();
    let total = 0;
    let touched = 0;
    for (const absolute of files) {
      const text = readFileSync(absolute, "utf8");
      const { fixed, count } = fixText(text);
      if (count > 0 && fixed !== text) {
        writeFileSync(absolute, fixed);
        console.log(`Fixed ${count} reference(s) in ${toRepoPath(absolute)}`);
        total += count;
        touched += 1;
      }
    }
    console.log(touched === 0 ? "No legacy Markdown media references to fix." : `Normalized ${total} reference(s) in ${touched} file(s).`);
  } else {
    const issues = checkFiles();
    if (issues.length > 0) {
      printIssues(issues);
      process.exitCode = 1;
    } else {
      console.log(`No legacy ${LEGACY_PREFIX} Markdown media references in ${listContentFiles().length} content files.`);
    }
  }
}
