const configuredBase = import.meta.env.BASE_URL || "/";

export const BASE_PATH = configuredBase === "/" ? "" : `/${configuredBase.replace(/^\/+|\/+$/g, "")}`;
export const BASE_URL = BASE_PATH ? `${BASE_PATH}/` : "/";

export function withBase(path: string): string {
  if (!path || path.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith("//")) {
    return path;
  }

  const match = path.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";
  const normalized = `/${pathname.replace(/^\/+/g, "")}`.replace(/\/+/g, "/");

  if (!BASE_PATH || normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) {
    return `${normalized}${suffix}`;
  }

  return `${BASE_PATH}${normalized}${suffix}`;
}

export function withoutBase(path: string): string {
  if (!BASE_PATH) return path || "/";
  if (path === BASE_PATH) return "/";
  if (path.startsWith(`${BASE_PATH}/`)) return path.slice(BASE_PATH.length) || "/";
  return path || "/";
}
