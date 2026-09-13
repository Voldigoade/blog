import { SITE } from "../config";

export function formatDate(date: Date, lang: string = SITE.lang): string {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateStamp(date: Date): string {
  const iso = date.toISOString().slice(0, 10);
  return iso.replaceAll("-", ".");
}

export function isoDate(date: Date): string {
  return date.toISOString();
}
