import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

import { translateSegments } from "./translate-provider.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "src", "content", "blog");
const TRANS_DIR = join(ROOT, "src", "content", "translations");
const TARGETS = ["en", "es", "de", "pt-br", "it", "ja", "zh-cn"];
const TRANSLATED_FRONTMATTER = [
  { name: "title", path: ["title"] },
  { name: "description", path: ["description"] },
  { name: "heroImageAlt", path: ["heroImageAlt"] },
  { name: "coverAlt", path: ["coverAlt"] },
  { name: "seriesTitle", path: ["series", "title"] },
];

export function slugOf(filename) {
  return filename.replace(/\.(md|mdx)$/, "");
}

export function splitFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { frontmatter: "", body: text };
  return { frontmatter: match[1], body: match[2] };
}

export function frontmatterValue(frontmatter, key) {
  return parseFrontmatter(frontmatter)[key];
}

export function parseFrontmatter(frontmatter) {
  const value = yaml.load(frontmatter, { schema: yaml.JSON_SCHEMA });
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}

function pathValue(value, path) {
  return path.reduce((current, key) => current && typeof current === "object" ? current[key] : undefined, value);
}

function setPathValue(value, path, translated) {
  let current = value;
  for (const key of path.slice(0, -1)) {
    if (!current[key] || typeof current[key] !== "object") current[key] = {};
    current = current[key];
  }
  current[path.at(-1)] = translated;
}

function serializeDocument(data, body) {
  const frontmatter = yaml.dump(data, {
    schema: yaml.JSON_SCHEMA,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
  return `---\n${frontmatter}---\n\n${body}`;
}

function addPart(parts, value, translate = false) {
  if (!value) return;
  const previous = parts.at(-1);
  if (previous && previous.translate === translate) previous.value += value;
  else parts.push({ value, translate });
}

function closingDelimiter(text, start, opener, closer) {
  let depth = 0;
  let quote = "";
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (quote) {
      if (char === "\\") index += 1;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === opener) depth += 1;
    if (char === closer) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function findBracketEnd(text, start) {
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === "\\") {
      index += 1;
      continue;
    }
    if (text[index] === "[") depth += 1;
    if (text[index] === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return -1;
}

function inlineParts(text) {
  const parts = [];
  let cursor = 0;
  let plain = "";
  const flush = () => {
    addPart(parts, plain, /\p{Letter}/u.test(plain));
    plain = "";
  };

  while (cursor < text.length) {
    const char = text[cursor];
    if (char === "\r" || char === "\n") {
      flush();
      const newline = char === "\r" && text[cursor + 1] === "\n" ? "\r\n" : char;
      addPart(parts, newline);
      cursor += newline.length;
      continue;
    }
    if (char === "\\") {
      flush();
      addPart(parts, text.slice(cursor, cursor + 2));
      cursor += 2;
      continue;
    }
    if (char === "`") {
      flush();
      const delimiter = text.slice(cursor).match(/^`+/)?.[0] || "`";
      const end = text.indexOf(delimiter, cursor + delimiter.length);
      const stop = end === -1 ? text.length : end + delimiter.length;
      addPart(parts, text.slice(cursor, stop));
      cursor = stop;
      continue;
    }
    if (char === "$" && text[cursor - 1] !== "\\") {
      flush();
      const delimiter = text.startsWith("$$", cursor) ? "$$" : "$";
      const end = text.indexOf(delimiter, cursor + delimiter.length);
      const stop = end === -1 ? text.length : end + delimiter.length;
      addPart(parts, text.slice(cursor, stop));
      cursor = stop;
      continue;
    }
    if (char === "<") {
      flush();
      const end = closingDelimiter(text, cursor, "<", ">");
      const stop = end === -1 ? text.length : end + 1;
      addPart(parts, text.slice(cursor, stop));
      cursor = stop;
      continue;
    }
    if (char === "{") {
      flush();
      const end = closingDelimiter(text, cursor, "{", "}");
      const stop = end === -1 ? text.length : end + 1;
      addPart(parts, text.slice(cursor, stop));
      cursor = stop;
      continue;
    }
    if (text.startsWith("http://", cursor) || text.startsWith("https://", cursor) || text.startsWith("mailto:", cursor)) {
      flush();
      const match = text.slice(cursor).match(/^[^\s)>\]]+/)?.[0] || text.slice(cursor);
      addPart(parts, match);
      cursor += match.length;
      continue;
    }
    if (char === "&") {
      const entity = text.slice(cursor).match(/^&(?:#\d+|#x[\da-f]+|[a-z][\da-z]+);/i)?.[0];
      if (entity) {
        flush();
        addPart(parts, entity);
        cursor += entity.length;
        continue;
      }
    }
    const image = char === "!" && text[cursor + 1] === "[";
    if (image || char === "[") {
      const bracketStart = cursor + (image ? 1 : 0);
      const bracketEnd = findBracketEnd(text, bracketStart);
      if (bracketEnd !== -1) {
        const after = text[bracketEnd + 1];
        const referenceEnd = after === "[" ? findBracketEnd(text, bracketEnd + 1) : -1;
        const destinationEnd = after === "(" ? closingDelimiter(text, bracketEnd + 1, "(", ")") : -1;
        const suffixEnd = destinationEnd !== -1 ? destinationEnd + 1 : referenceEnd !== -1 ? referenceEnd + 1 : bracketEnd + 1;
        const label = text.slice(bracketStart + 1, bracketEnd);
        if (/^(?:\^|@|#|\d+|[ xX])$/.test(label)) {
          flush();
          addPart(parts, text.slice(cursor, suffixEnd));
        } else {
          flush();
          addPart(parts, image ? "![" : "[");
          for (const part of inlineParts(label)) addPart(parts, part.value, part.translate);
          addPart(parts, text.slice(bracketEnd, suffixEnd));
        }
        cursor = suffixEnd;
        continue;
      }
    }
    if ("*_~|".includes(char)) {
      flush();
      addPart(parts, char);
      cursor += 1;
      continue;
    }
    plain += char;
    cursor += 1;
  }
  flush();
  return parts;
}

export function markdownParts(body) {
  const parts = [];
  const lines = body.match(/.*(?:\r?\n|$)/g)?.filter(Boolean) || [];
  let fence = "";
  let mathBlock = false;

  for (const line of lines) {
    const trimmed = line.trimStart();
    const fenceMatch = trimmed.match(/^(```+|~~~+)/)?.[1];
    if (fence) {
      addPart(parts, line);
      if (fenceMatch?.startsWith(fence[0]) && fenceMatch.length >= fence.length) fence = "";
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch;
      addPart(parts, line);
      continue;
    }
    if (/^\s*\$\$\s*(?:\r?\n)?$/.test(line)) {
      mathBlock = !mathBlock;
      addPart(parts, line);
      continue;
    }
    if (mathBlock || /^\s*(?:import|export)\b/.test(line) || /^\s{4}\S/.test(line)) {
      addPart(parts, line);
      continue;
    }
    if (/^\s*\[[^\]]+\]:\s*\S+/.test(line)) {
      addPart(parts, line);
      continue;
    }
    const prefix = line.match(/^(?:\s*(?:(?:>\s*)+|(?:[-+*]|\d+[.)])\s+|#{1,6}\s+))+/)?.[0] || "";
    addPart(parts, prefix);
    for (const part of inlineParts(line.slice(prefix.length))) addPart(parts, part.value, part.translate);
  }
  return parts;
}

export function sourceFiles() {
  if (!existsSync(SOURCE_DIR)) return [];
  return readdirSync(SOURCE_DIR)
    .filter((name) => /^[^_].*\.(md|mdx)$/.test(name))
    .sort()
    .map((name) => {
      const path = join(SOURCE_DIR, name);
      const text = readFileSync(path, "utf8");
      const { frontmatter, body } = splitFrontmatter(text);
      return { slug: slugOf(name), name, path, text, frontmatter, data: parseFrontmatter(frontmatter), body };
    })
    .filter((source) => source.data.draft !== true);
}

export function sourceHash(source) {
  const frontmatter = Object.fromEntries(
    TRANSLATED_FRONTMATTER.map((field) => [field.name, pathValue(source.data, field.path) || ""]),
  );
  const body = markdownParts(source.body)
    .filter((part) => part.translate)
    .map((part) => part.value);
  return createHash("sha256").update(JSON.stringify({ frontmatter, body })).digest("hex");
}

export function translationPath(locale, slug, ext = "md") {
  return join(TRANS_DIR, locale, `${slug}.${ext}`);
}

export function readTranslation(locale, slug) {
  for (const ext of ["md", "mdx"]) {
    const path = translationPath(locale, slug, ext);
    if (existsSync(path)) {
      const text = readFileSync(path, "utf8");
      const { frontmatter } = splitFrontmatter(text);
      const data = parseFrontmatter(frontmatter);
      return {
        path,
        sourceHash: data.sourceHash,
        manual: data.manual !== false,
      };
    }
  }
  return undefined;
}

function selectedValue(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? undefined : process.argv[index + 1];
}

function selection() {
  const slug = selectedValue("--slug");
  const locale = selectedValue("--locale");
  if (locale && !TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
  return { slug, locale };
}

export function status(filters = {}) {
  const rows = [];
  const sources = sourceFiles().filter((source) => !filters.slug || source.slug === filters.slug);
  const locales = filters.locale ? [filters.locale] : TARGETS;
  for (const source of sources) {
    const hash = sourceHash(source);
    for (const locale of locales) {
      const existing = readTranslation(locale, source.slug);
      rows.push({
        slug: source.slug,
        locale,
        state: !existing ? "missing" : existing.sourceHash === hash ? "current" : "stale",
        manual: existing?.manual ?? false,
        hash,
        path: existing?.path,
      });
    }
  }
  return rows;
}

function printStatus(rows, json) {
  if (json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log("No published French source articles require translation.");
    return;
  }
  const counts = Object.fromEntries(["current", "stale", "missing"].map((state) => [state, rows.filter((row) => row.state === state).length]));
  for (const row of rows) {
    const mode = row.manual ? " manual" : " automatic";
    console.log(`${row.state.toUpperCase().padEnd(7)} ${row.locale.padEnd(5)} ${row.slug}${row.state === "missing" ? "" : mode}`);
  }
  console.log(`\n${counts.current} current, ${counts.stale} stale, ${counts.missing} missing (${rows.length} pairs)`);
}

function safeTranslations(values) {
  if (!Array.isArray(values) || values.some((value) => typeof value !== "string")) return false;
  return values.every((value) => !/[\r\n\[\]{}<>`*_~|]/.test(value));
}

async function translatedDocument(source, locale, hash) {
  const fields = TRANSLATED_FRONTMATTER.map((field) => pathValue(source.data, field.path) || "");
  const parts = markdownParts(source.body);
  const bodySegments = parts.filter((part) => part.translate).map((part) => part.value);
  const input = [...fields, ...bodySegments];
  const translated = await translateSegments(input, { sourceLocale: "fr", targetLocale: locale });
  if (translated.length !== input.length || !safeTranslations(translated)) {
    throw new Error("provider returned structurally unsafe output");
  }
  const translatedFields = translated.slice(0, fields.length);
  const translatedBody = translated.slice(fields.length);
  let cursor = 0;
  const body = parts.map((part) => part.translate ? translatedBody[cursor++] : part.value).join("");
  const data = structuredClone(source.data);
  delete data.canonicalUrl;
  data.locale = locale;
  data.sourceSlug = source.slug;
  data.sourceHash = hash;
  data.manual = false;
  data.draft = false;
  TRANSLATED_FRONTMATTER.forEach((field, index) => {
    if (fields[index]) setPathValue(data, field.path, translatedFields[index]);
  });
  return serializeDocument(data, body);
}

async function runTranslate(filters) {
  const allRows = status(filters);
  const rows = allRows.filter((row) =>
    row.state === "missing" || (!row.manual && (row.state === "stale" || filters.force)),
  );
  const manualStale = allRows.filter((row) => row.state === "stale" && row.manual);
  for (const row of manualStale) console.log(`MANUAL  ${row.locale.padEnd(5)} ${row.slug} requires review and will not be overwritten.`);
  if (rows.length === 0) {
    console.log("Nothing can be translated automatically for this selection.");
    return 0;
  }
  const sources = new Map(sourceFiles().map((source) => [source.slug, source]));
  for (const row of rows) {
    const source = sources.get(row.slug);
    const output = await translatedDocument(source, row.locale, row.hash);
    const extension = source.name.endsWith(".mdx") ? "mdx" : "md";
    const path = translationPath(row.locale, row.slug, extension);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, output);
    console.log(`Generated ${row.locale}/${row.slug}.`);
  }
  return 0;
}

function markReviewed(locale, slug) {
  if (!TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
  const existing = readTranslation(locale, slug);
  if (!existing) throw new Error(`No translation file for ${locale}/${slug}.`);
  const source = sourceFiles().find((item) => item.slug === slug);
  if (!source) throw new Error(`No published French source for ${slug}.`);
  const text = readFileSync(existing.path, "utf8");
  const { frontmatter, body } = splitFrontmatter(text);
  const data = parseFrontmatter(frontmatter);
  if (!data.sourceHash || typeof data.manual !== "boolean") throw new Error(`Translation metadata is incomplete in ${existing.path}.`);
  data.sourceHash = sourceHash(source);
  data.manual = true;
  writeFileSync(existing.path, serializeDocument(data, body));
  console.log(`Marked ${locale}/${slug} as manually reviewed.`);
  return 0;
}

const args = process.argv.slice(2);
try {
  if (args.includes("--help") || args.includes("-h")) {
    console.log("translate: static translation status and provider-neutral generation for published French articles");
    console.log("  npm run translate -- [--slug <slug>] [--locale <locale>] [--json] [--check]");
    console.log("  npm run translate -- --translate [--force] [--slug <slug>] [--locale <locale>]");
    console.log("  npm run translate -- --mark-reviewed <locale> <slug>");
  } else if (args.includes("--mark-reviewed")) {
    const index = args.indexOf("--mark-reviewed");
    process.exitCode = markReviewed(args[index + 1], args[index + 2]);
  } else {
    const filters = selection();
    if (filters.slug && !sourceFiles().some((source) => source.slug === filters.slug)) {
      throw new Error(`No published French source for "${filters.slug}".`);
    }
    if (args.includes("--translate")) {
      process.exitCode = await runTranslate({ ...filters, force: args.includes("--force") });
    } else {
      const rows = status(filters);
      printStatus(rows, args.includes("--json"));
      if (args.includes("--check")) process.exitCode = rows.some((row) => row.state !== "current") ? 1 : 0;
    }
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
