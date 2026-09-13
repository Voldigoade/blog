import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";

import { AUTHOR, SITE } from "../../config";
import { getDict } from "../../i18n/dict";
import { htmlLang, localizedPath, NON_DEFAULT_LOCALES, publicationPath } from "../../i18n/locales";
import { getTranslatedPosts } from "../../i18n/posts";

export const getStaticPaths = (async () => {
  const paths = [];
  for (const locale of NON_DEFAULT_LOCALES) {
    const posts = await getTranslatedPosts(locale);
    if (posts.length > 0) paths.push({ params: { locale } });
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const locale = context.params.locale as string;
  const dict = getDict(locale);
  const posts = await getTranslatedPosts(locale);

  return rss({
    title: `${SITE.title} — ${dict.siteTagline}`,
    description: dict.siteDescription,
    site: new URL(localizedPath("/", locale), context.site).href,
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: publicationPath(post.data.sourceSlug, locale),
      categories: [post.data.section, ...post.data.tags].filter(Boolean),
      customData: `<dc:creator><![CDATA[${post.data.author || AUTHOR.name}]]></dc:creator>`,
    })),
    customData: `<language>${htmlLang(locale)}</language>`,
  });
};
