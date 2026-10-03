import { DOCUMENT } from "@angular/common";
import { inject, Injectable, signal } from "@angular/core";
import {
  isTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "../../../../../shared/preferences";

const themeColors: Record<Theme, string> = {
  dark: "#050806",
  light: "#f4f7f2",
};

@Injectable({ providedIn: "root" })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly selectedTheme = signal<Theme>("dark");

  readonly theme = this.selectedTheme.asReadonly();

  constructor() {
    const documentTheme = this.document.documentElement.dataset["theme"];
    const storedTheme = this.readStoredTheme();
    const initialTheme = isTheme(documentTheme)
      ? documentTheme
      : storedTheme ?? "dark";

    this.applyTheme(initialTheme, false);
  }

  toggle(): void {
    this.setTheme(this.selectedTheme() === "dark" ? "light" : "dark");
  }

  setTheme(theme: Theme): void {
    this.applyTheme(theme, true);
  }

  private applyTheme(theme: Theme, persist: boolean): void {
    this.selectedTheme.set(theme);
    this.document.documentElement.dataset["theme"] = theme;
    this.document.documentElement.style.colorScheme = theme;
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColors[theme]);

    if (!persist) {
      return;
    }

    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // The in-memory preference still works when storage is unavailable.
    }
  }

  private readStoredTheme(): Theme | null {
    try {
      const storedTheme = this.document.defaultView?.localStorage.getItem(
        THEME_STORAGE_KEY,
      );

      return isTheme(storedTheme) ? storedTheme : null;
    } catch {
      return null;
    }
  }
}
