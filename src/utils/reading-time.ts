import { BLOG } from "../config";

const CJK = /[぀-ヿ㐀-䶿一-鿿豈-﫿]/g;
const NOISE = /```[\s\S]*?```|`[^`]*`|^import .*$|^export .*$/gm;
const CJK_PER_MINUTE = 500;

export function readingTime(body: string | undefined): number {
  if (!body) return 1;

  const text = body.replace(NOISE, " ");
  const cjkCount = text.match(CJK)?.length ?? 0;
  const words = text
    .replace(CJK, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = words / BLOG.wordsPerMinute + cjkCount / CJK_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min de lecture`;
}
