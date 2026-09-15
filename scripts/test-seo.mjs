import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(dist);
const origin = "https://voldigoade.xyz";
const indexNowKey = "c7489a69ef494db8b8de316886e6da48";
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

if (!existsSync(dist)) {
  console.error("Dist folder does not exist. Run build first.");
  process.exit(1);
}

const allFiles = walk(distPath);
const htmlFiles = allFiles.filter((f) => extname(f) === ".html");

for (const file of htmlFiles) {
  const rel = relative(distPath, file).split(sep).join("/");
  const text = readFileSync(file, "utf8");

  if (rel === "404.html") continue;

  const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`${rel}: missing or empty <title>`);
  }

  const descMatch = text.match(/<meta name="description" content="([^"]*)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push(`${rel}: missing or empty meta description`);
  }

  const robotsMatch = text.match(/<meta name="robots" content="([^"]*)"/i);
  if (!robotsMatch) {
    errors.push(`${rel}: missing meta robots tag`);
  } else {
    const robots = robotsMatch[1];
    if (robots.includes("noindex")) {
      errors.push(`${rel}: accidental noindex in meta robots: ${robots}`);
    }
    if (!robots.includes("max-image-preview:large")) {
      errors.push(`${rel}: meta robots missing max-image-preview:large`);
    }
  }

  const canonicalMatch = text.match(/<link rel="canonical" href="([^"]+)"/i);
  if (!canonicalMatch) {
    errors.push(`${rel}: missing canonical link`);
  } else {
    const canonical = canonicalMatch[1];
    if (!canonical.startsWith(origin)) {
      errors.push(`${rel}: canonical URL does not start with ${origin}: ${canonical}`);
    }
    if (canonical.includes("voldigoade.github.io")) {
      errors.push(`${rel}: canonical URL references legacy host: ${canonical}`);
    }
    if (canonical.includes("/blog/")) {
      errors.push(`${rel}: canonical URL retains /blog/ base path: ${canonical}`);
    }
  }

  const alternates = [...text.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
  for (const [, lang, href] of alternates) {
    if (!href.startsWith(origin)) {
      errors.push(`${rel}: alternate (${lang}) does not start with ${origin}: ${href}`);
    }
    if (href.includes("/blog/")) {
      errors.push(`${rel}: alternate (${lang}) retains /blog/ base path: ${href}`);
    }
  }

  const xDefault = text.match(/<link rel="alternate" hreflang="x-default" href="([^"]+)"/i);
  if (alternates.length > 1 && !xDefault) {
    errors.push(`${rel}: has alternates but missing x-default`);
  }

  const ogUrl = text.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];
  if (canonicalMatch && ogUrl && ogUrl !== canonicalMatch[1]) {
    errors.push(`${rel}: og:url (${ogUrl}) does not match canonical (${canonicalMatch[1]})`);
  }

  const ldJsonScripts = [...text.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (ldJsonScripts.length === 0) {
    errors.push(`${rel}: missing JSON-LD structured data`);
  } else {
    for (const [, jsonContent] of ldJsonScripts) {
      try {
        const parsed = JSON.parse(jsonContent);
        const schemas = Array.isArray(parsed) ? parsed : [parsed];
        for (const schema of schemas) {
          if (!schema["@context"] && !schema["@type"]) {
            errors.push(`${rel}: malformed schema: missing @type or @context`);
          }
          if (schema["@type"] === "WebSite") {
            if (!schema.name || schema.name !== "Voldigoade") {
              errors.push(`${rel}: WebSite schema missing or wrong name: ${schema.name}`);
            }
          }
          if (["Article", "NewsArticle", "BlogPosting"].includes(schema["@type"])) {
            if (!schema.headline) errors.push(`${rel}: ${schema["@type"]} missing headline`);
            if (!schema.datePublished) errors.push(`${rel}: ${schema["@type"]} missing datePublished`);
            if (!schema.author) errors.push(`${rel}: ${schema["@type"]} missing author`);
            if (!schema.publisher) errors.push(`${rel}: ${schema["@type"]} missing publisher`);
            if (schema.url && !schema.url.startsWith(origin)) {
              errors.push(`${rel}: ${schema["@type"]} url does not use ${origin}: ${schema.url}`);
            }
          }
          if (schema["@type"] === "BreadcrumbList") {
            if (!Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
              errors.push(`${rel}: BreadcrumbList missing itemListElement items`);
            }
          }
        }
      } catch (err) {
        errors.push(`${rel}: invalid JSON-LD: ${err.message}`);
      }
    }
  }
}

const sitemapIndexPath = join(distPath, "sitemap-index.xml");
if (!existsSync(sitemapIndexPath)) {
  errors.push("Missing sitemap-index.xml");
} else {
  const sitemapIndex = readFileSync(sitemapIndexPath, "utf8");
  if (!sitemapIndex.includes(origin)) {
    errors.push("sitemap-index.xml does not contain apex origin");
  }
}

const newsSitemapPath = join(distPath, "news-sitemap.xml");
if (!existsSync(newsSitemapPath)) {
  errors.push("Missing news-sitemap.xml");
} else {
  const newsSitemap = readFileSync(newsSitemapPath, "utf8");
  if (!newsSitemap.includes("http://www.google.com/schemas/sitemap-news/0.9")) {
    errors.push("news-sitemap.xml missing Google News XML namespace");
  }
}

const keyPath = join(distPath, `${indexNowKey}.txt`);
if (!existsSync(keyPath)) {
  errors.push(`Missing IndexNow key file: ${indexNowKey}.txt`);
} else {
  const keyVal = readFileSync(keyPath, "utf8").trim();
  if (keyVal !== indexNowKey) {
    errors.push(`IndexNow key file has invalid value: ${keyVal}`);
  }
}

if (errors.length > 0) {
  console.error("SEO Validation Errors:");
  for (const err of errors) console.error(`- ${err}`);
  process.exit(1);
}

console.log(`SEO test passed for ${htmlFiles.length} HTML pages and discovery assets.`);
