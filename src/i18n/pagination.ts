export const LOCALES = ["fr", "en", "es", "de"] as const;
export type LocaleRoute = (typeof LOCALES)[number];

export function paginatedAlternateRoutes(
  pageNumber: number,
  countsByLocale: Record<string, number> | Map<string, number>,
  pageSize: number = 8,
): LocaleRoute[] {
  const isAvailable = (count: number) => pageNumber === 1 || count > (pageNumber - 1) * pageSize;
  const getCount = (route: string): number => {
    if (countsByLocale instanceof Map) {
      return countsByLocale.get(route) ?? 0;
    }
    return (countsByLocale as Record<string, number>)[route] ?? 0;
  };
  return LOCALES.filter((route) => isAvailable(getCount(route)));
}
