import { DOCUMENT } from "@angular/common";
import { inject, Injectable, signal } from "@angular/core";
import {
  CanActivateFn,
  RedirectCommand,
  Router,
} from "@angular/router";
import type { Locale } from "../../../../../shared/content";
import {
  isLocale,
  LOCALE_STORAGE_KEY,
  localizeUrl,
} from "../../../../../shared/preferences";

@Injectable({ providedIn: "root" })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly selectedLocale = signal<Locale>("pt");

  readonly locale = this.selectedLocale.asReadonly();

  resolveRouteLocale(routeLocale: Locale): Locale {
    const storedLocale = this.readStoredLocale();

    if (storedLocale) {
      this.selectedLocale.set(storedLocale);
      return storedLocale;
    }

    this.setLocale(routeLocale);
    return routeLocale;
  }

  setLocale(locale: Locale): void {
    this.selectedLocale.set(locale);

    try {
      this.document.defaultView?.localStorage.setItem(
        LOCALE_STORAGE_KEY,
        locale,
      );
    } catch {
      // The in-memory preference still works when storage is unavailable.
    }
  }

  private readStoredLocale(): Locale | null {
    try {
      const storedLocale = this.document.defaultView?.localStorage.getItem(
        LOCALE_STORAGE_KEY,
      );

      return isLocale(storedLocale) ? storedLocale : null;
    } catch {
      return null;
    }
  }
}

export const localePreferenceGuard: CanActivateFn = (route, state) => {
  const localeService = inject(LocaleService);
  const router = inject(Router);
  const routeLocale: Locale = route.data["locale"] === "en" ? "en" : "pt";
  const preferredLocale = localeService.resolveRouteLocale(routeLocale);

  if (preferredLocale === routeLocale) {
    return true;
  }

  return new RedirectCommand(
    router.parseUrl(localizeUrl(state.url, preferredLocale)),
    { replaceUrl: true },
  );
};
