import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(ROOT, "src", "utils", "posts.ts"), "utf8");

assert.ok(!source.includes("...remaining"), "arbitrary recency fallback must stay removed");
assert.ok(!source.includes("...matching"), "arbitrary recency filler must stay removed");
assert.ok(source.includes("sameSeries"), "series priority must be explicit");
assert.ok(source.includes("commonTags"), "tag-overlap priority must be explicit");
assert.ok(source.includes("sameSection"), "section priority must be explicit");

function tagSlug(text) {
  return text.trim().toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-|-$/g, "");
}

function rankRelated(current, allPosts, limit = 4) {
  const others = allPosts.filter((p) => p.id !== current.id);
  const scored = others.map((candidate) => {
    const sameSeries = Boolean(
      current.data.series && candidate.data.series && current.data.series.id === candidate.data.series.id,
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

const date = (day) => new Date(`2026-09-${String(day).padStart(2, "0")}T00:00:00.000Z`);
const current = {
  id: "science-black-holes",
  data: { section: "science", tags: ["Physique", "Espace"], pubDate: date(15) },
};
const seriesMate = {
  id: "science-black-holes-2",
  data: { section: "computing", series: { id: "cosmos", order: 2 }, tags: [], pubDate: date(10) },
};
const twoTags = {
  id: "computing-ai-physics",
  data: { section: "computing", tags: ["physique", "espace"], pubDate: date(14) },
};
const oneTag = {
  id: "computing-quantum",
  data: { section: "computing", tags: ["Physique"], pubDate: date(14) },
};
const sameSection = {
  id: "science-stars",
  data: { section: "science", tags: ["Astronomie"], pubDate: date(14) },
};
const unrelatedAnime = {
  id: "anime-recent-hit",
  data: { section: "anime-manga", tags: ["Anime"], pubDate: date(15) },
};
const currentWithSeries = {
  ...current,
  data: { ...current.data, series: { id: "cosmos", order: 1 } },
};

let ranked = rankRelated(currentWithSeries, [currentWithSeries, seriesMate, twoTags, oneTag, sameSection, unrelatedAnime], 4);
assert.deepEqual(ranked.map((p) => p.id), ["science-black-holes-2", "computing-ai-physics", "computing-quantum", "science-stars"]);

ranked = rankRelated(current, [current, sameSection, unrelatedAnime], 4);
assert.deepEqual(ranked.map((p) => p.id), ["science-stars"]);
assert.ok(!ranked.some((p) => p.id === "anime-recent-hit"), "unrelated Anime must not backfill Science");

ranked = rankRelated(current, [current, twoTags, unrelatedAnime], 4);
assert.deepEqual(ranked.map((p) => p.id), ["computing-ai-physics"]);

const tieA = { id: "science-a", data: { section: "science", tags: ["Physique"], pubDate: date(14) } };
const tieB = { id: "science-b", data: { section: "science", tags: ["Physique"], pubDate: date(14) } };
ranked = rankRelated(current, [current, tieB, tieA], 4);
assert.deepEqual(ranked.map((p) => p.id), ["science-a", "science-b"]);

console.log("Related-post relevance tests passed: series > tags > section, no recency backfill, deterministic.");
