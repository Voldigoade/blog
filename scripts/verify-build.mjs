import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(dist);
const origin = "https://voldigoade.github.io";
const base = "/blog";
const requiredRoutes = [
  "index.html",
  "publications/index.html",
  "sections/index.html",
  "about/index.html",
  "en/index.html",
  "es/index.html",
  "de/index.html",
  "pt-br/index.html",
  "it/index.html",
  "ja/index.html",
  "zh-cn/index.html",
  "rss.xml",
  "robots.txt",
  "llms.txt",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "pagefind/pagefind.js",
  "favicon.svg",
  "fonts/source-serif-4-latin.woff2",
];
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function fileForPublicPath(pathname) {
  if (!pathname.startsWith(`${base}/`) && pathname !== base) return undefined;
  const local = pathname.slice(base.length).replace(/^\/+/, "");
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
  if (rel === "index.html") return `${origin}${base}/`;
  if (rel.endsWith("/index.html")) return `${origin}${base}/${rel.slice(0, -"index.html".length)}`;
  if (rel === "404.html") return `${origin}${base}/404/`;
  return `${origin}${base}/${rel}`;
}

if (!existsSync(dist)) errors.push("dist directory is missing");

for (const route of requiredRoutes) {
  if (!existsSync(new URL(route, dist))) errors.push(`missing required output: ${route}`);
}

const files = existsSync(dist) ? walk(distPath) : [];
const textFiles = files.filter((file) => [".html", ".xml", ".txt", ".css", ".js", ".json"].includes(extname(file)));

for (const file of textFiles) {
  const rel = relative(distPath, file).split(sep).join("/");
  const text = readFileSync(file, "utf8");
  if (text.includes("voldigoade.com")) errors.push(`${rel} contains voldigoade.com`);
  if (text.includes("/blog/blog/")) errors.push(`${rel} contains a legacy article URL`);
  if ([".html", ".xml", ".txt", ".css"].includes(extname(file))) for (const match of text.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (value.startsWith("/") && value !== base && !value.startsWith(`${base}/`)) {
      errors.push(`${rel} contains root-escaping asset or link: ${value}`);
    }
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
  if (extname(file) === ".css") for (const match of text.matchAll(/url\(["']?(\/[^)'"\s]+)["']?\)/g)) {
    const value = match[1];
    if (value !== base && !value.startsWith(`${base}/`)) {
      errors.push(`${rel} contains root-escaping CSS asset: ${value}`);
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
    if (url.origin !== origin || !url.pathname.startsWith(`${base}/`)) {
      errors.push(`${relative(distPath, file)} has invalid ${alternateLang} alternate: ${href}`);
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
    if (!match[0].startsWith(`${origin}${base}/`)) errors.push(`sitemap URL escapes the base: ${match[0]}`);
  }
  if (/\/404(?:\/|<)/.test(sitemap)) errors.push("sitemap includes a 404 route");
}

if (existsSync(new URL("robots.txt", dist))) {
  const robots = readFileSync(new URL("robots.txt", dist), "utf8");
  if (!robots.includes(`Sitemap: ${origin}${base}/sitemap-index.xml`)) errors.push("robots.txt has the wrong sitemap URL");
}

if (existsSync(new URL("rss.xml", dist))) {
  const rss = readFileSync(new URL("rss.xml", dist), "utf8");
  if (!rss.includes(`<link>${origin}${base}/</link>`)) errors.push("RSS channel link does not include the project base");
}

const tracked = readFileSync(new URL("../package-lock.json", import.meta.url), "utf8");
if (!tracked.includes('"name": "voldigoade-blog"')) errors.push("package-lock.json metadata is stale");

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Verified ${files.length} generated files, ${files.filter((file) => extname(file) === ".html").length} HTML pages, base-path integrity, metadata, internal links and discovery files.`);
