import type { Locale } from "./content";

export type Theme = "dark" | "light";

export const LOCALE_STORAGE_KEY = "bqtech-locale";
export const THEME_STORAGE_KEY = "bqtech-theme";

export function isLocale(value: unknown): value is Locale {
  return value === "pt" || value === "en";
}

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export function localizeUrl(url: string, locale: Locale): string {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const path = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;

  let localizedPath: string;

  if (locale === "en") {
    if (path.startsWith("/en/projects/")) {
      localizedPath = path;
    } else if (path.startsWith("/projetos/")) {
      localizedPath = path.replace(/^\/projetos\//, "/en/projects/");
    } else {
      localizedPath = "/en";
    }
  } else if (path.startsWith("/en/projects/")) {
    localizedPath = path.replace(/^\/en\/projects\//, "/projetos/");
  } else if (path.startsWith("/projetos/")) {
    localizedPath = path;
  } else {
    localizedPath = "/";
  }

  return `${localizedPath}${query}${hash}`;
}
