import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { AUTHOR, SITE } from "../config";
import { getPublishedPosts } from "../utils/posts";
import { DEFAULT_LOCALE, localizedPath, publicationPath } from "../i18n/locales";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(localizedPath("/", DEFAULT_LOCALE), context.site).href,
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: publicationPath(post.id, DEFAULT_LOCALE),
      categories: [post.data.section, ...post.data.tags].filter(Boolean),
      customData: `<dc:creator><![CDATA[${post.data.author || AUTHOR.name}]]></dc:creator>`,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
};
