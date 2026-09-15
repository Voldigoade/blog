import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST_NEWS = join(ROOT, "dist", "news-sitemap.xml");
const BLOG_DIR = join(ROOT, "src", "content", "blog");
const ORIGIN = "https://voldigoade.xyz";

assert.ok(existsSync(DIST_NEWS), "dist/news-sitemap.xml is missing (run npm run build first)");
const xml = readFileSync(DIST_NEWS, "utf8");
assert.ok(xml.includes("http://www.google.com/schemas/sitemap-news/0.9"), "missing Google News namespace");
assert.ok(xml.includes("<news:publication>"), "missing news:publication tag");
assert.ok(!xml.includes("voldigoade.github.io"), "news sitemap retains legacy host");
assert.ok(!xml.includes("/blog/"), "news sitemap retains /blog/ base path");

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  assert.ok(loc.startsWith(`${ORIGIN}/publications/`), `non-canonical news loc: ${loc}`);
}
assert.deepEqual(locs, [...locs].sort(), "news sitemap locs should be deterministic");

const sources = new Map();
for (const file of readdirSync(BLOG_DIR)) {
  if (!/^[^_].*\.(md|mdx)$/.test(file)) continue;
  const text = readFileSync(join(BLOG_DIR, file), "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) continue;
  const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
  if (!data || typeof data !== "object") continue;
  const slug = file.replace(/\.(md|mdx)$/i, "");
  sources.set(slug, data);
}

assert.ok(locs.length > 0, "news sitemap is unexpectedly empty for a site with news=true posts");
for (const loc of locs) {
  const slug = loc.replace(`${ORIGIN}/publications/`, "").replace(/\/$/, "");
  const data = sources.get(slug);
  assert.ok(data, `news sitemap references unknown slug: ${slug}`);
  assert.equal(data.news, true, `news sitemap includes non-news post: ${slug}`);
  const expectedDate = new Date(data.pubDate).toISOString();
  assert.ok(xml.includes(`<news:publication_date>${expectedDate}</news:publication_date>`), `publication_date for ${slug} does not match frontmatter pubDate (no fake freshness allowed)`);
  assert.ok(new Date(data.pubDate).getTime() <= Date.now(), `news sitemap includes future-dated post: ${slug}`);
}

for (const [slug, data] of sources) {
  if (data.news === true && data.draft !== true) {
    const ageMs = Date.now() - new Date(data.pubDate).getTime();
    if (ageMs >= 0 && ageMs <= 48 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000) {
      assert.ok(locs.includes(`${ORIGIN}/publications/${slug}/`), `fresh news post missing from sitemap: ${slug}`);
    }
  } else {
    assert.ok(!locs.includes(`${ORIGIN}/publications/${slug}/`), `non-news post leaked into news sitemap: ${slug}`);
  }
}

const mtime = statSync(DIST_NEWS).mtimeMs;
assert.ok(Date.now() - mtime < 24 * 60 * 60 * 1000, "dist news sitemap is older than 24h; rebuild before submitting to Search Console");

console.log(`News sitemap tests passed: ${locs.length} canonical FR URL(s), dates match frontmatter, no fake freshness.`);
