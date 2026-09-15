import type { APIRoute } from "astro";
import { getPublishedPosts } from "../utils/posts";
import { DEFAULT_LOCALE, publicationPath } from "../i18n/locales";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const now = Date.now();
  const twoDaysMs = 48 * 60 * 60 * 1000;

  const newsPosts = posts.filter((post) => {
    if (post.data.news !== true) return false;
    const age = now - post.data.pubDate.getTime();
    return age >= 0 && age <= twoDaysMs;
  });

  const urls = newsPosts.map((post) => {
    const loc = new URL(publicationPath(post.id, DEFAULT_LOCALE), site).href;
    const pubDateIso = post.data.pubDate.toISOString();
    const title = post.data.title.replace(/[<>&"']/g, (c) => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case '"': return "&quot;";
        case "'": return "&apos;";
        default: return c;
      }
    });

    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      "    <news:news>",
      "      <news:publication>",
      "        <news:name>Voldigoade</news:name>",
      `        <news:language>${DEFAULT_LOCALE}</news:language>`,
      "      </news:publication>",
      `      <news:publication_date>${pubDateIso}</news:publication_date>`,
      `      <news:title>${title}</news:title>`,
      "    </news:news>",
      "  </url>",
    ].join("\n");
  });

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
