import type { APIRoute } from "astro";

import { AUTHOR, SECTIONS, SITE } from "../config";
import { formatDate } from "../utils/date";
import { getPublishedPosts } from "../utils/posts";
import { withBase } from "../utils/url";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const absolute = (path: string) => new URL(withBase(path), site).href;

  const sectionLines = (Object.keys(SECTIONS) as Array<keyof typeof SECTIONS>).map(
    (key) => `- [${SECTIONS[key].name}](${absolute(`/sections/${key}/`)}): ${SECTIONS[key].description}`,
  );

  const postLines = posts.map(
    (post) =>
      `- [${post.data.title}](${absolute(`/publications/${post.id}/`)}): ${
        post.data.description
      } (${formatDate(post.data.pubDate)})`,
  );

  const lines = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.description}`,
    "",
    `Directeur de publication : ${AUTHOR.name} (${AUTHOR.url}).`,
    "",
    "## Sections",
    "",
    ...sectionLines,
    "",
    "## Publications",
    "",
    ...(postLines.length > 0 ? postLines : ["*Aucune publication pour le moment.*"]),
    "",
    "## Navigation",
    "",
    `- [Publications](${absolute("/publications/")}): catalogue complet des publications.`,
    `- [Sections](${absolute("/sections/")}): vue d'ensemble des univers éditoriaux.`,
    `- [À propos](${absolute("/about/")}): présentation de la publication et principes éditoriaux.`,
    "",
    "## Flux & Découverte",
    "",
    `- [Flux RSS](${absolute("/rss.xml")})`,
    `- [Plan du site](${absolute("/sitemap-index.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
