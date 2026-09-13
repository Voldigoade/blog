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

export function getRelatedPosts<T extends ScorablePost>(current: T, allPosts: T[], limit = 3): T[] {
  const others = allPosts.filter((p) => p.id !== current.id);
  const scored = others.map((candidate) => {
    let score = 0;
    if (candidate.data.section === current.data.section) score += 3;
    if (
      current.data.series &&
      candidate.data.series &&
      current.data.series.id === candidate.data.series.id
    ) {
      score += 6;
    }
    const commonTags = candidate.data.tags.filter((t) =>
      current.data.tags.some((ct) => tagSlug(ct) === tagSlug(t)),
    );
    score += commonTags.length * 2;
    return { post: candidate, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
    .slice(0, limit)
    .map((item) => item.post);
}
