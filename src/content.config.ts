import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { NON_DEFAULT_LOCALES } from "./i18n/locales";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/[^_]*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
      featured: z.boolean().default(false),
      section: z.enum(["science", "computing", "anime-manga"]).default("computing"),
      tags: z.array(z.string()).default([]),
      contentType: z
        .enum(["article", "research", "essay", "project", "review", "note"])
        .default("article"),
      series: z
        .object({
          id: z.string(),
          order: z.number(),
          title: z.string().optional(),
        })
        .optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      coverImage: z.string().optional(),
      coverAlt: z.string().optional(),
      author: z.string().default("Voldigoade"),
      canonicalUrl: z.string().optional(),
    }),
});

const translations = defineCollection({
  loader: glob({ base: "./src/content/translations", pattern: "*/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      locale: z.enum(NON_DEFAULT_LOCALES as [string, ...string[]]),
      sourceSlug: z.string(),
      sourceHash: z.string(),
      manual: z.boolean().default(true),
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
      featured: z.boolean().default(false),
      section: z.enum(["science", "computing", "anime-manga"]).default("computing"),
      tags: z.array(z.string()).default([]),
      contentType: z
        .enum(["article", "research", "essay", "project", "review", "note"])
        .default("article"),
      series: z
        .object({
          id: z.string(),
          order: z.number(),
          title: z.string().optional(),
        })
        .optional(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      coverImage: z.string().optional(),
      coverAlt: z.string().optional(),
      author: z.string().default("Voldigoade"),
      canonicalUrl: z.string().optional(),
    }),
});


export const collections = { blog, translations };
