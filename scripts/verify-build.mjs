import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(dist);
const origin = "https://voldigoade.xyz";
const indexNowKey = "c7489a69ef494db8b8de316886e6da48";
const requiredRoutes = [
  "index.html",
  "publications/index.html",
  "sections/index.html",
  "about/index.html",
  "en/index.html",
  "es/index.html",
  "de/index.html",
  "rss.xml",
  "robots.txt",
  "llms.txt",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "news-sitemap.xml",
  "CNAME",
  `${indexNowKey}.txt`,
  "pagefind/pagefind.js",
  "favicon.svg",
  "fonts/source-serif-4-latin.woff2",
];
const errors = [];
const retiredLocales = ["pt-br", "it", "ja", "zh-cn"];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function fileForPublicPath(pathname) {
  const local = pathname.replace(/^\/+/, "");
  const direct = join(distPath, local);
  if (local === "404" || local === "404/") {
    const errorPage = join(distPath, "404.html");
    if (existsSync(errorPage)) return errorPage;
  }
  if (existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = join(direct, "index.html");
  if (existsSync(index)) return index;
  if (!extname(direct)) {
    const html = `${direct}.html`;
    if (existsSync(html)) return html;
  }
  return undefined;
}

function publicUrlForHtml(file) {
  const rel = relative(distPath, file).split(sep).join("/");
  if (rel === "index.html") return `${origin}/`;
  if (rel.endsWith("/index.html")) return `${origin}/${rel.slice(0, -"index.html".length)}`;
  if (rel === "404.html") return `${origin}/404/`;
  return `${origin}/${rel}`;
}

if (!existsSync(dist)) errors.push("dist directory is missing");

for (const route of requiredRoutes) {
  if (!existsSync(new URL(route, dist))) errors.push(`missing required output: ${route}`);
}

for (const locale of retiredLocales) {
  if (existsSync(new URL(`${locale}/`, dist))) errors.push(`retired locale output still exists: ${locale}`);
}

const files = existsSync(dist) ? walk(distPath) : [];
const textFiles = files.filter((file) => [".html", ".xml", ".txt", ".css", ".js", ".json"].includes(extname(file)));

for (const file of textFiles) {
  const rel = relative(distPath, file).split(sep).join("/");
  const text = readFileSync(file, "utf8");
  if (text.includes("voldigoade.com")) errors.push(`${rel} contains voldigoade.com`);
  if (text.includes("voldigoade.github.io")) errors.push(`${rel} contains legacy host voldigoade.github.io`);
  if (text.includes("/blog/blog/")) errors.push(`${rel} contains duplicate /blog/blog/`);
  if (text.includes("/blog/_astro/")) errors.push(`${rel} contains legacy asset path /blog/_astro/`);
  if (text.includes("/blog/publications/")) errors.push(`${rel} contains legacy route /blog/publications/`);
  if (text.includes("/blog/sections/")) errors.push(`${rel} contains legacy route /blog/sections/`);
  if (text.includes("/blog/images/")) errors.push(`${rel} contains legacy image path /blog/images/`);
  for (const locale of retiredLocales) {
    if (text.includes(`/${locale}/`)) errors.push(`${rel} advertises retired locale ${locale}`);
  }
  if ([".html", ".xml", ".txt", ".css"].includes(extname(file))) for (const match of text.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    let url;
    try {
      url = new URL(value, publicUrlForHtml(file));
    } catch {
      continue;
    }
    if (url.origin === origin && !fileForPublicPath(url.pathname)) {
      errors.push(`${rel} links to missing output: ${url.pathname}`);
    }
  }
}

for (const file of files.filter((item) => extname(item) === ".html")) {
  const text = readFileSync(file, "utf8");
  const expected = publicUrlForHtml(file);
  const canonical = text.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  if (canonical !== expected) errors.push(`${relative(distPath, file)} canonical mismatch: ${canonical} != ${expected}`);
  const lang = text.match(/<html lang="([^"]+)"/i)?.[1];
  if (!lang) errors.push(`${relative(distPath, file)} has no html lang`);
  const alternates = [...text.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)];
  for (const [, alternateLang, href] of alternates) {
    const url = new URL(href);
    if (url.origin !== origin) {
      errors.push(`${relative(distPath, file)} has invalid ${alternateLang} alternate origin: ${href}`);
      continue;
    }
    const target = fileForPublicPath(url.pathname);
    if (!target) errors.push(`${relative(distPath, file)} has phantom ${alternateLang} alternate: ${href}`);
    if (target && alternateLang !== "x-default") {
      const targetText = readFileSync(target, "utf8");
      const reciprocal = [...targetText.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)]
        .some(([, targetLang, targetHref]) => targetLang === lang && targetHref === expected);
      if (!reciprocal) errors.push(`${relative(distPath, file)} has no reciprocal ${alternateLang} alternate`);
    }
  }
}

if (existsSync(new URL("sitemap-0.xml", dist))) {
  const sitemap = readFileSync(new URL("sitemap-0.xml", dist), "utf8");
  for (const match of sitemap.matchAll(/https:\/\/voldigoade\.github\.io[^<"]*/g)) {
    errors.push(`sitemap retains legacy host URL: ${match[0]}`);
  }
  if (sitemap.includes("/blog/")) errors.push("sitemap retains /blog/ base path");
  if (/\/404(?:\/|<)/.test(sitemap)) errors.push("sitemap includes a 404 route");
  const sitemapLanguages = new Set([...sitemap.matchAll(/hreflang="([^"]+)"/g)].map((match) => match[1]));
  for (const language of ["fr", "en", "es", "de", "x-default"]) {
    if (!sitemapLanguages.has(language)) errors.push(`sitemap has no ${language} alternate`);
  }
  for (const language of ["pt-BR", "it", "ja", "zh-CN"]) {
    if (sitemapLanguages.has(language)) errors.push(`sitemap retains retired ${language} alternates`);
  }
}

if (existsSync(new URL("news-sitemap.xml", dist))) {
  const newsSitemap = readFileSync(new URL("news-sitemap.xml", dist), "utf8");
  if (newsSitemap.includes("voldigoade.github.io")) errors.push("news-sitemap retains legacy host");
  if (newsSitemap.includes("/blog/")) errors.push("news-sitemap retains /blog/ base path");
  if (!newsSitemap.includes("<news:publication>")) errors.push("news-sitemap missing publication tag");
}

if (existsSync(new URL("robots.txt", dist))) {
  const robots = readFileSync(new URL("robots.txt", dist), "utf8");
  if (!robots.includes(`Sitemap: ${origin}/sitemap-index.xml`)) errors.push("robots.txt has the wrong sitemap URL");
  if (!robots.includes(`Sitemap: ${origin}/news-sitemap.xml`)) errors.push("robots.txt has the wrong news sitemap URL");
}

if (existsSync(new URL("rss.xml", dist))) {
  const rss = readFileSync(new URL("rss.xml", dist), "utf8");
  if (!rss.includes(`<link>${origin}/</link>`)) errors.push("RSS channel link does not point to apex origin");
  if (rss.includes("voldigoade.github.io")) errors.push("RSS contains legacy host");
}

if (existsSync(new URL("CNAME", dist))) {
  const cname = readFileSync(new URL("CNAME", dist), "utf8").trim();
  if (cname !== "voldigoade.xyz") errors.push(`CNAME content mismatch: ${cname}`);
}

if (existsSync(new URL(`${indexNowKey}.txt`, dist))) {
  const keyContent = readFileSync(new URL(`${indexNowKey}.txt`, dist), "utf8").trim();
  if (keyContent !== indexNowKey) errors.push("IndexNow key file in dist has incorrect content");
}

const tracked = readFileSync(new URL("../package-lock.json", import.meta.url), "utf8");
if (!tracked.includes('"name": "voldigoade-blog"')) errors.push("package-lock.json metadata is stale");

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Verified ${files.length} generated files, ${files.filter((file) => extname(file) === ".html").length} HTML pages, apex origin integrity, metadata, internal links and discovery files.`);
