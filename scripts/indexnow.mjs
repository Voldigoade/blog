import { existsSync, readFileSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { execFileSync } from "node:child_process";
import yaml from "js-yaml";

const HOST = "voldigoade.xyz";
const ORIGIN = `https://${HOST}`;
const KEY = "c7489a69ef494db8b8de316886e6da48";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
];
export const SUPPORTED_TRANSLATION_LOCALES = ["en", "es", "de"];
export const MAX_URLS_PER_REQUEST = 100;

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export function verifyKeyFile(rootDir = process.cwd()) {
  const localKeyPath = join(rootDir, "public", `${KEY}.txt`);
  if (!existsSync(localKeyPath)) {
    throw new Error(`IndexNow key file missing: ${localKeyPath}`);
  }
  const content = readFileSync(localKeyPath, "utf8").trim();
  if (content !== KEY) {
    throw new Error(`IndexNow key mismatch: expected ${KEY}, got ${content}`);
  }
  return true;
}

export function buildPayload(urls) {
  const validUrls = Array.isArray(urls) ? urls.filter(Boolean) : [];
  if (validUrls.length === 0) {
    throw new Error("IndexNow requires at least one URL");
  }
  return {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: validUrls,
  };
}

export async function submitIndexNow(urls, options = {}) {
  const { dryRun = false, maxRetries = 3 } = options;
  const payload = buildPayload(urls);

  if (dryRun) {
    return { success: true, dryRun: true, payload };
  }

  let lastError;
  for (const endpoint of ENDPOINTS) {
    for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok || response.status === 200 || response.status === 202) {
          return { success: true, endpoint, status: response.status };
        }
        if (response.status === 422 || response.status === 403) {
          const text = await response.text();
          throw new Error(`IndexNow rejected (${response.status}): ${text}`);
        }
      } catch (err) {
        lastError = err;
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        }
      }
    }
  }

  throw lastError || new Error("Failed to submit to all IndexNow endpoints");
}

export function slugFromFilename(filePath) {
  return basename(filePath).replace(/\.(md|mdx)$/i, "");
}

export function parseContentChange(repoRelativePath) {
  const normalized = String(repoRelativePath || "").replace(/\\/g, "/").replace(/^\.\//, "");
  const blogMatch = normalized.match(/^src\/content\/blog\/([^/]+)\.(md|mdx)$/i);
  if (blogMatch) {
    const filename = blogMatch[1];
    if (!filename || filename.startsWith("_") || filename.startsWith(".")) return null;
    return { kind: "fr", locale: "fr", filenameSlug: filename };
  }
  const transMatch = normalized.match(/^src\/content\/translations\/([^/]+)\/([^/]+)\.(md|mdx)$/i);
  if (transMatch) {
    const locale = transMatch[1];
    const filename = transMatch[2];
    if (!SUPPORTED_TRANSLATION_LOCALES.includes(locale)) return null;
    if (!filename || filename.startsWith("_") || filename.startsWith(".")) return null;
    return { kind: "translation", locale, filenameSlug: filename };
  }
  return null;
}

export function canonicalUrlForChange({ locale, slug }) {
  if (!slug || !SLUG_PATTERN.test(slug)) return null;
  if (locale === "fr") return `${ORIGIN}/publications/${slug}/`;
  if (SUPPORTED_TRANSLATION_LOCALES.includes(locale)) return `${ORIGIN}/${locale}/publications/${slug}/`;
  return null;
}

export function dedupeAndSortUrls(urls) {
  return [...new Set((Array.isArray(urls) ? urls : []).filter(Boolean))].sort();
}

export function chunkUrls(urls, size = MAX_URLS_PER_REQUEST) {
  const list = dedupeAndSortUrls(urls);
  const chunks = [];
  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size));
  }
  return chunks;
}

function readFrontmatterData(absolutePath) {
  try {
    const text = readFileSync(absolutePath, "utf8");
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function frenchSourcePublished(cwd, slug) {
  for (const ext of ["md", "mdx"]) {
    const candidate = join(cwd, "src", "content", "blog", `${slug}.${ext}`);
    if (existsSync(candidate)) {
      const data = readFrontmatterData(candidate);
      return data.draft !== true;
    }
  }
  return false;
}

export function urlForChangedPath(cwd, repoRelativePath, status) {
  const parsed = parseContentChange(repoRelativePath);
  if (!parsed) return null;
  const normalized = String(repoRelativePath).replace(/\\/g, "/");
  if (status === "D") {
    return canonicalUrlForChange({ locale: parsed.locale, slug: parsed.filenameSlug });
  }
  const absolute = resolve(cwd, normalized);
  if (!existsSync(absolute)) return null;
  const data = readFrontmatterData(absolute);
  if (data.draft === true) return null;
  if (parsed.kind === "fr") {
    return canonicalUrlForChange({ locale: "fr", slug: parsed.filenameSlug });
  }
  const sourceSlug = typeof data.sourceSlug === "string" && SLUG_PATTERN.test(data.sourceSlug)
    ? data.sourceSlug
    : parsed.filenameSlug;
  if (!frenchSourcePublished(cwd, sourceSlug)) return null;
  return canonicalUrlForChange({ locale: parsed.locale, slug: sourceSlug });
}

export function changedPaths({ before, after, cwd = process.cwd() }) {
  if (!before || !after) throw new Error("Changed-URL discovery requires both before and after revisions.");
  let base = before;
  if (/^0+$/.test(base)) {
    try {
      execFileSync("git", ["rev-parse", "--verify", `${after}^`], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
      base = `${after}^`;
    } catch {
      return [];
    }
  }
  const output = execFileSync(
    "git",
    ["diff", "--name-status", "--no-renames", "--diff-filter=ACMRD", base, after, "--", "src/content/blog", "src/content/translations"],
    { cwd, encoding: "utf8" },
  );
  return output.split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [status, ...rest] = line.split(/\s+/);
      return { status: (status || "").trim(), path: (rest.join(" ") || "").trim() };
    })
    .filter((entry) => entry.status && entry.path);
}

export function collectChangedUrls({ before, after, cwd = process.cwd() }) {
  const entries = changedPaths({ before, after, cwd });
  const urls = [];
  for (const entry of entries) {
    const url = urlForChangedPath(cwd, entry.path, entry.status);
    if (url && url.startsWith(`${ORIGIN}/`)) urls.push(url);
  }
  return dedupeAndSortUrls(urls);
}

export function resolveRange(args = process.argv.slice(2)) {
  const selected = (flag) => {
    const index = args.indexOf(flag);
    return index === -1 ? undefined : args[index + 1];
  };
  const before = selected("--before") || process.env.BEFORE || process.env.GITHUB_EVENT_BEFORE || "";
  const after = selected("--after") || process.env.AFTER || process.env.GITHUB_SHA || "";
  const event = selected("--event") || process.env.EVENT || process.env.GITHUB_EVENT_NAME || "";
  const urlsIndex = args.indexOf("--urls");
  const explicit = urlsIndex !== -1 && args[urlsIndex + 1] ? args[urlsIndex + 1].split(",").map((s) => s.trim()).filter(Boolean) : [];
  return { before, after, event, explicit };
}

export async function submitChangedUrls({ before, after, cwd = process.cwd(), dryRun = false, maxRetries = 3 }) {
  const urls = collectChangedUrls({ before, after, cwd });
  if (urls.length === 0) {
    return { success: true, skipped: true, urls: [] };
  }
  const chunks = chunkUrls(urls);
  const results = [];
  for (const chunk of chunks) {
    results.push(await submitIndexNow(chunk, { dryRun, maxRetries }));
  }
  return { success: true, skipped: false, urls, chunks: chunks.length, results };
}

async function main() {
  const args = process.argv.slice(2);
  const assertKey = args.includes("--assert-key");
  const dryRun = args.includes("--dry-run");
  const { before, after, event, explicit } = resolveRange(args);

  verifyKeyFile();

  if (assertKey && !dryRun && explicit.length === 0 && !before) {
    console.log("IndexNow key verification passed.");
    return;
  }

  if (explicit.length > 0) {
    for (const url of explicit) {
      if (!url.startsWith(`${ORIGIN}/`)) {
        throw new Error(`Refusing non-canonical IndexNow URL: ${url}`);
      }
    }
    const urls = dedupeAndSortUrls(explicit);
    const result = await submitIndexNow(urls, { dryRun });
    if (result.dryRun) {
      console.log("IndexNow dry-run validated payload:", JSON.stringify(result.payload, null, 2));
    } else {
      console.log(`IndexNow submitted ${urls.length} explicit URL(s) to ${result.endpoint} (status ${result.status}).`);
    }
    return;
  }

  if (!before || !after) {
    console.log(`No commit range for IndexNow (event=${event || "unknown"}); skipping submission without resubmitting the catalogue.`);
    return;
  }

  const outcome = await submitChangedUrls({ before, after, cwd: process.cwd(), dryRun });
  if (outcome.skipped) {
    console.log(`No changed canonical publication URLs between ${before}..${after} (event=${event || "unknown"}); skipping IndexNow submission.`);
    return;
  }
  if (dryRun) {
    console.log(`IndexNow dry-run would submit ${outcome.urls.length} changed URL(s) in ${outcome.chunks} batch(es):`, JSON.stringify(outcome.urls, null, 2));
    return;
  }
  console.log(`IndexNow submitted ${outcome.urls.length} changed URL(s) in ${outcome.chunks} batch(es).`);
}

if (basename(process.argv[1] || "") === "indexnow.mjs") {
  main().catch((err) => {
    console.error("IndexNow error:", err.message);
    process.exit(1);
  });
}
