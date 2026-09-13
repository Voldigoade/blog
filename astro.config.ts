import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { SITE } from "./src/config";

const sitemapLocales: Record<string, string> = {
  fr: "fr",
  en: "en",
  es: "es",
  de: "de",
  "pt-br": "pt-BR",
  it: "it",
  ja: "ja",
  "zh-cn": "zh-CN",
};

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: "fr", locales: sitemapLocales },
      namespaces: { xhtml: true },
      serialize(item) {
        const french = item.links?.find((link) => link.lang === "fr");
        if (item.links && item.links.length > 1 && french) {
          item.links = [...item.links, { lang: "x-default", url: french.url }];
        }
        return item;
      },
    }),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      defaultColor: false,
      wrap: false,
    },
  },
});
