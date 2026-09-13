import { getCollection, type CollectionEntry } from "astro:content";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { DEFAULT_LOCALE, LOCALES, type LocaleRoute } from "./locales";

export type TranslatedPost = CollectionEntry<"translations">;

export type LocalizedPost =
  | { locale: typeof DEFAULT_LOCALE; post: CollectionEntry<"blog"> }
  | { locale: Exclude<LocaleRoute, typeof DEFAULT_LOCALE>; post: TranslatedPost };

function hasTranslationFiles(): boolean {
  try {
    const root = join(process.cwd(), "src", "content", "translations");
    if (!existsSync(root)) return false;
    for (const locale of readdirSync(root, { withFileTypes: true })) {
      if (!locale.isDirectory() || locale.name.startsWith(".") || locale.name.startsWith("_")) continue;
      for (const file of readdirSync(join(root, locale.name))) {
        if (/^[^_].*\.(md|mdx)$/.test(file)) return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

export async function getTranslatedPosts(locale: string): Promise<TranslatedPost[]> {
  if (locale === DEFAULT_LOCALE || !hasTranslationFiles()) return [];
  const posts = await getCollection("translations", ({ data }) =>
    (import.meta.env.PROD ? !data.draft : true) && data.locale === locale,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTranslation(locale: string, slug: string): Promise<TranslatedPost | undefined> {
  const posts = await getTranslatedPosts(locale);
  return posts.find((post) => post.data.sourceSlug === slug);
}

export async function translatedLocalesFor(slug: string): Promise<LocaleRoute[]> {
  const found: LocaleRoute[] = [];
  const frPosts = await getCollection("blog", ({ data }) =>
    (import.meta.env.PROD ? !data.draft : true),
  );
  if (frPosts.some((post) => post.id === slug)) found.push(DEFAULT_LOCALE);
  if (!hasTranslationFiles()) return orderRoutes(found);
  const posts = await getCollection("translations", ({ data }) =>
    (import.meta.env.PROD ? !data.draft : true) && data.sourceSlug === slug,
  );
  for (const post of posts) {
    const route = post.data.locale as LocaleRoute;
    if (!found.includes(route)) found.push(route);
  }
  return orderRoutes(found);
}

function orderRoutes(found: LocaleRoute[]): LocaleRoute[] {
  return (LOCALES as readonly { route: LocaleRoute }[])
    .map(({ route }) => route)
    .filter((route) => found.includes(route));
}

export async function localesWithPublications(): Promise<LocaleRoute[]> {
  const routes: LocaleRoute[] = [DEFAULT_LOCALE];
  if (!hasTranslationFiles()) return routes;
  const posts = await getCollection("translations", ({ data }) =>
    (import.meta.env.PROD ? !data.draft : true),
  );
  for (const post of posts) {
    const route = post.data.locale as LocaleRoute;
    if (!routes.includes(route)) routes.push(route);
  }
  return (LOCALES as readonly { route: LocaleRoute }[])
    .map(({ route }) => route)
    .filter((route) => routes.includes(route));
}

export function translationSlug(post: TranslatedPost): string {
  return post.data.sourceSlug;
}
