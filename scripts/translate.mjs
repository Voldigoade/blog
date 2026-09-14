import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

import { closeProvider, translateSegments } from "./translate-provider.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "src", "content", "blog");
const TRANS_DIR = join(ROOT, "src", "content", "translations");
export const TARGETS = ["en", "es", "de"];
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

function selectedValue(args, flag) {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

function selection(args) {
  const slug = selectedValue(args, "--slug");
  const locale = selectedValue(args, "--locale");
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

export function automaticRows(filters = {}) {
  return selectAutomaticRows(status(filters), filters.force);
}

export function selectAutomaticRows(rows, force = false) {
  return rows.filter((row) =>
    row.state === "missing" || (!row.manual && (row.state === "stale" || force)),
  );
}

export function hasPublishedSource(slug) {
  return sourceFiles().some((source) => source.slug === slug);
}

export function removeAutomaticTranslation(locale, slug) {
  if (!TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
  const existing = readTranslation(locale, slug);
  if (!existing) return false;
  if (existing.manual) throw new Error(`Manual translation ${locale}/${slug} cannot be removed automatically.`);
  unlinkSync(existing.path);
  console.log(`Removed automatic translation ${locale}/${slug}.`);
  return true;
}

export function assertCurrentTranslation(locale, slug) {
  if (!TARGETS.includes(locale)) throw new Error(`Unsupported locale "${locale}".`);
  const row = status({ locale, slug })[0];
  if (!row || row.state !== "current") {
    throw new Error(`Translation ${locale}/${slug} is not current with the published French source.`);
  }
  const source = sourceFiles().find((item) => item.slug === slug);
  const existing = readTranslation(locale, slug);
  const translatedText = readFileSync(existing.path, "utf8");
  const { frontmatter, body } = splitFrontmatter(translatedText);
  const data = parseFrontmatter(frontmatter);
  if (
    data.locale !== locale ||
    data.sourceSlug !== slug ||
    data.sourceHash !== row.hash ||
    typeof data.manual !== "boolean" ||
    data.draft === true ||
    !body.trim()
  ) {
    throw new Error(`Translation metadata or body is invalid for ${locale}/${slug}.`);
  }
  const protectedValues = [
    ...shieldInline(source.body).placeholders.map(({ original }) => original),
    ...tokenizeBlocks(source.body).filter(({ type }) => type === "raw").map(({ content }) => content.trim()).filter(Boolean),
  ];
  for (const value of protectedValues) {
    if (!body.includes(value)) throw new Error(`Protected source syntax is missing from ${locale}/${slug}: ${value.slice(0, 80)}`);
  }
  return row;
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

export function shieldInline(text) {
  const placeholders = [];
  let result = "";
  let cursor = 0;

  while (cursor < text.length) {
    const char = text[cursor];

    if (char === "\\") {
      result += text.slice(cursor, cursor + 2);
      cursor += 2;
      continue;
    }

    if (char === "`") {
      const delimiter = text.slice(cursor).match(/^`+/)?.[0] || "`";
      const end = text.indexOf(delimiter, cursor + delimiter.length);
      const stop = end === -1 ? text.length : end + delimiter.length;
      const original = text.slice(cursor, stop);
      const ph = `%%CODE_${placeholders.length}%%`;
      placeholders.push({ placeholder: ph, original });
      result += ph;
      cursor = stop;
      continue;
    }

    if (char === "$" && text[cursor - 1] !== "\\") {
      const delimiter = text.startsWith("$$", cursor) ? "$$" : "$";
      const end = text.indexOf(delimiter, cursor + delimiter.length);
      const stop = end === -1 ? text.length : end + delimiter.length;
      const original = text.slice(cursor, stop);
      const ph = `%%MATH_${placeholders.length}%%`;
      placeholders.push({ placeholder: ph, original });
      result += ph;
      cursor = stop;
      continue;
    }

    if (char === "<" && /^[a-zA-Z\/]/.test(text.slice(cursor + 1))) {
      const end = closingDelimiter(text, cursor, "<", ">");
      if (end !== -1) {
        const original = text.slice(cursor, end + 1);
        const ph = `%%TAG_${placeholders.length}%%`;
        placeholders.push({ placeholder: ph, original });
        result += ph;
        cursor = end + 1;
        continue;
      }
    }

    if (char === "{") {
      const end = closingDelimiter(text, cursor, "{", "}");
      if (end !== -1) {
        const original = text.slice(cursor, end + 1);
        const ph = `%%EXPR_${placeholders.length}%%`;
        placeholders.push({ placeholder: ph, original });
        result += ph;
        cursor = end + 1;
        continue;
      }
    }

    if (text.startsWith("http://", cursor) || text.startsWith("https://", cursor) || text.startsWith("mailto:", cursor)) {
      const match = text.slice(cursor).match(/^[^\s)>\]]+/)?.[0] || text.slice(cursor);
      const ph = `%%URL_${placeholders.length}%%`;
      placeholders.push({ placeholder: ph, original: match });
      result += ph;
      cursor += match.length;
      continue;
    }

    const isImage = char === "!" && text[cursor + 1] === "[";
    if (isImage || char === "[") {
      const bracketStart = cursor + (isImage ? 1 : 0);
      const bracketEnd = findBracketEnd(text, bracketStart);
      if (bracketEnd !== -1) {
        const after = text[bracketEnd + 1];
        if (after === "(") {
          const destEnd = closingDelimiter(text, bracketEnd + 1, "(", ")");
          if (destEnd !== -1) {
            const label = text.slice(bracketStart + 1, bracketEnd);
            const destUrl = text.slice(bracketEnd + 2, destEnd);
            const ph = `%%URL_${placeholders.length}%%`;
            placeholders.push({ placeholder: ph, original: destUrl });
            result += (isImage ? "![" : "[") + label + "](" + ph + ")";
            cursor = destEnd + 1;
            continue;
          }
        }
      }
    }

    result += char;
    cursor += 1;
  }

  return { shielded: result, placeholders };
}

export function unshieldInline(text, placeholders) {
  if (placeholders.length === 0) return text;
  const found = text.match(/(?:%%|__)(?:CODE|MATH|TAG|URL)_\d+(?:%%|__)/g) || [];
  const expected = placeholders.map((p) => p.placeholder);

  if (found.length !== expected.length) {
    const relaxedFound = text.match(/(?:%%|__|「)?[A-Z]+_\d+(?:%%|__|」)?/g) || [];
    if (relaxedFound.length === expected.length) {
      let restored = text;
      for (const { placeholder, original } of placeholders) {
        const id = placeholder.replace(/^[^\w]+|[^\w]+$/g, "");
        const pat = new RegExp(`(?:%%|__|「)?${id}(?:%%|__|」)?`, "g");
        restored = restored.replace(pat, () => original);
      }
      return restored;
    }
    throw new Error(`Placeholder count mismatch: expected ${expected.length} (${expected.join(",")}) but got ${found.length} (${found.join(",")})`);
  }

  for (let i = 0; i < expected.length; i++) {
    if (found[i] !== expected[i]) {
      throw new Error(`Placeholder order/identity mismatch at index ${i}: expected ${expected[i]} but got ${found[i]}`);
    }
  }

  let restored = text;
  for (const { placeholder, original } of placeholders) {
    restored = restored.replaceAll(placeholder, () => original);
  }
  return restored;
}

export function tokenizeBlocks(body) {
  const lines = body.split(/\r?\n/);
  const blocks = [];
  let index = 0;
  let inCode = false;
  let codeFence = "";
  let inMath = false;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    const fenceMatch = line.trimStart().match(/^(```+|~~~+)/)?.[1];
    if (inCode) {
      blocks.push({ type: "raw", content: line + "\n" });
      if (fenceMatch && fenceMatch.startsWith(codeFence[0]) && fenceMatch.length >= codeFence.length) {
        inCode = false;
      }
      index++;
      continue;
    }
    if (fenceMatch) {
      inCode = true;
      codeFence = fenceMatch;
      blocks.push({ type: "raw", content: line + "\n" });
      index++;
      continue;
    }

    if (/^\s*\$\$\s*$/.test(line)) {
      inMath = !inMath;
      blocks.push({ type: "raw", content: line + "\n" });
      index++;
      continue;
    }
    if (inMath) {
      blocks.push({ type: "raw", content: line + "\n" });
      index++;
      continue;
    }

    if (!trimmed) {
      blocks.push({ type: "raw", content: line + "\n" });
      index++;
      continue;
    }

    if (/^\s*\[[^\]]+\]:\s*\S+/.test(line) || /^\s*(?:import|export)\b/.test(line)) {
      blocks.push({ type: "raw", content: line + "\n" });
      index++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6}\s+)(.*)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        prefix: headingMatch[1],
        content: headingMatch[2],
        suffix: "\n",
      });
      index++;
      continue;
    }

    const quoteMatch = line.match(/^((?:>\s*)+)(.*)$/);
    if (quoteMatch) {
      blocks.push({
        type: "quote",
        prefix: quoteMatch[1],
        content: quoteMatch[2],
        suffix: "\n",
      });
      index++;
      continue;
    }

    const listMatch = line.match(/^(\s*(?:[-+*]|\d+[.)])\s+)(.*)$/);
    if (listMatch) {
      blocks.push({
        type: "list",
        prefix: listMatch[1],
        content: listMatch[2],
        suffix: "\n",
      });
      index++;
      continue;
    }

    if (line.trim().startsWith("|")) {
      if (/^\s*\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?\s*$/.test(line)) {
        blocks.push({ type: "raw", content: line + "\n" });
      } else {
        blocks.push({
          type: "table_row",
          prefix: "",
          content: line,
          suffix: "\n",
        });
      }
      index++;
      continue;
    }

    let paraLines = [line];
    index++;
    while (index < lines.length) {
      const nextLine = lines[index];
      const nextTrimmed = nextLine.trim();
      if (!nextTrimmed) break;
      if (nextLine.trimStart().match(/^(```+|~~~+|\$\$)/)) break;
      if (nextLine.match(/^(?:#{1,6}\s+|(?:\s*[-+*]|\d+[.)])\s+|(?:>\s*)+|\|)/)) break;
      paraLines.push(nextLine);
      index++;
    }
    blocks.push({
      type: "paragraph",
      prefix: "",
      content: paraLines.join(" "),
      suffix: "\n",
    });
  }

  return blocks;
}

async function translatedDocument(source, locale, hash) {
  const fields = TRANSLATED_FRONTMATTER.map((field) => pathValue(source.data, field.path) || "");
  const fieldPlaceholders = [];
  const shieldedFields = [];
  for (const field of fields) {
    if (!field) {
      shieldedFields.push("");
      fieldPlaceholders.push([]);
    } else {
      const { shielded, placeholders } = shieldInline(field);
      shieldedFields.push(shielded);
      fieldPlaceholders.push(placeholders);
    }
  }

  const blocks = tokenizeBlocks(source.body);
  const translatableBlocks = blocks.filter((b) => b.type !== "raw");
  const blockPlaceholders = [];
  const shieldedBlocks = [];
  for (const block of translatableBlocks) {
    const { shielded, placeholders } = shieldInline(block.content);
    shieldedBlocks.push(shielded);
    blockPlaceholders.push(placeholders);
  }

  const input = [...shieldedFields, ...shieldedBlocks];
  const translated = await translateSegments(input, { sourceLocale: "fr", targetLocale: locale });
  if (!Array.isArray(translated) || translated.length !== input.length) {
    throw new Error(`provider returned unexpected segment count: expected ${input.length}, got ${translated?.length}`);
  }

  const translatedFields = translated.slice(0, fields.length).map((val, idx) => {
    if (!val) return val;
    return unshieldInline(val, fieldPlaceholders[idx]);
  });
  const translatedBodyParts = translated.slice(fields.length);

  let cursor = 0;
  let body = "";
  for (const block of blocks) {
    if (block.type === "raw") {
      body += block.content;
      continue;
    }
    const rawTranslated = translatedBodyParts[cursor];
    const placeholders = blockPlaceholders[cursor];
    let restored = unshieldInline(rawTranslated, placeholders);

    if (block.type === "table_row") {
      const srcTrimmed = block.content.trim();
      let resTrimmed = restored.trim();
      if (srcTrimmed.startsWith("|") && !resTrimmed.startsWith("|")) {
        resTrimmed = "| " + resTrimmed;
      }
      if (srcTrimmed.endsWith("|") && !resTrimmed.endsWith("|")) {
        resTrimmed = resTrimmed + " |";
      }
      restored = resTrimmed;
    }

    body += block.prefix + restored + block.suffix;
    cursor += 1;
  }

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
  const rows = automaticRows(filters);
  const manualStale = allRows.filter((row) => row.state === "stale" && row.manual);
  for (const row of manualStale) console.log(`MANUAL  ${row.locale.padEnd(5)} ${row.slug} requires review and will not be overwritten.`);
  if (rows.length === 0) {
    console.log("Nothing can be translated automatically for this selection.");
    return 0;
  }
  const sources = new Map(sourceFiles().map((source) => [source.slug, source]));
  for (const row of rows) {
    const source = sources.get(row.slug);
    let output;
    try {
      output = await translatedDocument(source, row.locale, row.hash);
    } catch (error) {
      throw new Error(`${row.locale}/${row.slug}: ${error.message}`);
    }
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

export async function main(args = process.argv.slice(2)) {
 try {
  if (args.includes("--help") || args.includes("-h")) {
    console.log("translate: static translation status and provider-neutral generation for published French articles");
    console.log("  npm run translate -- [--slug <slug>] [--locale <locale>] [--json] [--check]");
    console.log("  npm run translate -- --translate [--force] [--slug <slug>] [--locale <locale>]");
    console.log("  npm run translate -- --assert-current --slug <slug> --locale <locale>");
    console.log("  npm run translate -- --remove-automatic --slug <slug> --locale <locale>");
    console.log("  npm run translate -- --mark-reviewed <locale> <slug>");
  } else if (args.includes("--mark-reviewed")) {
    const index = args.indexOf("--mark-reviewed");
    process.exitCode = markReviewed(args[index + 1], args[index + 2]);
  } else {
    const filters = selection(args);
    if (args.includes("--remove-automatic")) {
      if (!filters.slug || !filters.locale) throw new Error("--remove-automatic requires --slug and --locale.");
      removeAutomaticTranslation(filters.locale, filters.slug);
      process.exitCode = 0;
    } else if (filters.slug && !hasPublishedSource(filters.slug)) {
      throw new Error(`No published French source for "${filters.slug}".`);
    } else if (args.includes("--assert-current")) {
      if (!filters.slug || !filters.locale) throw new Error("--assert-current requires --slug and --locale.");
      assertCurrentTranslation(filters.locale, filters.slug);
      console.log(`Current ${filters.locale}/${filters.slug}.`);
    } else if (args.includes("--translate")) {
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
 } finally {
   await closeProvider();
 }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
