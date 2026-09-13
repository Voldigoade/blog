import { BASE_PATH, withoutBase } from "../utils/url";

export const DEFAULT_LOCALE = "fr" as const;

export const LOCALES = [
  { route: "fr", lang: "fr", ogLocale: "fr_FR", native: "Français" },
  { route: "en", lang: "en", ogLocale: "en_US", native: "English" },
  { route: "es", lang: "es", ogLocale: "es_ES", native: "Español" },
  { route: "de", lang: "de", ogLocale: "de_DE", native: "Deutsch" },
  { route: "pt-br", lang: "pt-BR", ogLocale: "pt_BR", native: "Português" },
  { route: "it", lang: "it", ogLocale: "it_IT", native: "Italiano" },
  { route: "ja", lang: "ja", ogLocale: "ja_JP", native: "日本語" },
  { route: "zh-cn", lang: "zh-CN", ogLocale: "zh_CN", native: "简体中文" },
] as const;

export type LocaleRoute = (typeof LOCALES)[number]["route"];

export const NON_DEFAULT_LOCALES: LocaleRoute[] = ["en", "es", "de", "pt-br", "it", "ja", "zh-cn"];

export function isLocaleRoute(value: string): value is LocaleRoute {
  return (LOCALES as readonly { route: string }[]).some((entry) => entry.route === value);
}

export function localeEntry(route: string) {
  return LOCALES.find((entry) => entry.route === route) ?? LOCALES[0];
}

export function htmlLang(route: string): string {
  return localeEntry(route).lang;
}

export function ogLocale(route: string): string {
  return localeEntry(route).ogLocale;
}

export function prefixForLocale(route: string): string {
  return route === DEFAULT_LOCALE ? "" : `/${route}`;
}

export function localizedPath(path: string, route: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const localized = route === DEFAULT_LOCALE ? clean : `/${route}${clean === "/" ? "/" : clean}`;
  return `${BASE_PATH}${localized}` || "/";
}

export function publicationPath(slug: string, route: string): string {
  return localizedPath(`/publications/${slug}/`, route);
}

export function unlocalizedPath(path: string): string {
  const baseRelative = withoutBase(path);
  const localePattern = new RegExp(
    `^/(${NON_DEFAULT_LOCALES.map((route) => route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(/|$)`,
  );
  const clean = baseRelative.replace(localePattern, "/").replace(/\/+/g, "/");
  return clean.startsWith("/") ? clean || "/" : `/${clean}`;
}

export function alternatesFor(path: string): { route: LocaleRoute; href: string }[] {
  return (LOCALES as readonly { route: LocaleRoute }[]).map(({ route }) => ({
    route,
    href: localizedPath(path, route),
  }));
}
