import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export function tagSlug(tag: string): string {
  return slugify(tag);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function postsBySection<T extends { data: { section: string } }>(posts: T[], section: string): T[] {
  return posts.filter((post) => post.data.section === section);
}

export function postsBySeries(posts: Post[], seriesId: string): Post[] {
  return posts
    .filter((post) => post.data.series?.id === seriesId)
    .sort((a, b) => (a.data.series?.order ?? 0) - (b.data.series?.order ?? 0));
}

export function getAdjacentPosts<T extends { id: string }>(
  posts: T[],
  id: string,
): { previous?: T; next?: T } {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return {};

  return {
    previous: posts[index + 1],
    next: posts[index - 1],
  };
}

export interface ScorablePost {
  id: string;
  data: {
    section: string;
    series?: { id: string; order: number; title?: string };
    tags: string[];
    pubDate: Date;
  };
}

export function getRelatedPosts<T extends ScorablePost>(current: T, allPosts: T[], limit = 4): T[] {
  const others = allPosts.filter((p) => p.id !== current.id);
  const scored = others.map((candidate) => {
    const sameSeries = Boolean(
      current.data.series &&
        candidate.data.series &&
        current.data.series.id === candidate.data.series.id,
    );
    const commonTags = candidate.data.tags.filter((t) =>
      current.data.tags.some((ct) => tagSlug(ct) === tagSlug(t)),
    ).length;
    const sameSection = candidate.data.section === current.data.section;
    const score = commonTags > 0 || sameSection || sameSeries ? 1 : 0;
    return { post: candidate, sameSeries, commonTags, sameSection, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        Number(b.sameSeries) - Number(a.sameSeries) ||
        b.commonTags - a.commonTags ||
        Number(b.sameSection) - Number(a.sameSection) ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf() ||
        a.post.id.localeCompare(b.post.id),
    )
    .map((item) => item.post)
    .slice(0, limit);
}
