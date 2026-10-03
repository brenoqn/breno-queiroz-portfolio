import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  homeHref,
  projectHref,
  v2Copy,
  type Locale,
} from "../../../../../shared/content";
import { LocaleService } from "../services/locale.service";
import { ThemeService } from "../services/theme.service";
import { WordmarkComponent } from "./wordmark.component";

@Component({
  selector: "app-site-header",
  imports: [RouterLink, WordmarkComponent],
  template: `
    <header class="site-header-v2">
      <app-wordmark [locale]="locale" />

      <nav class="desktop-navigation" [attr.aria-label]="navigationLabel">
        @for (item of navigation; track item.fragment) {
          <a [routerLink]="homePath" [fragment]="item.fragment">{{ item.label }}</a>
        }
      </nav>

      <div class="header-controls">
        <a
          class="language-switch"
          [routerLink]="languagePath"
          [attr.aria-label]="t.nav.languageLabel"
          (click)="selectLocale()"
        >
          {{ t.nav.language }}
          <span aria-hidden="true">↗</span>
        </a>

        <button
          class="theme-toggle"
          type="button"
          [attr.aria-label]="themeLabel"
          [attr.aria-pressed]="themeService.theme() === 'light'"
          (click)="themeService.toggle()"
        >
          @if (themeService.theme() === "dark") {
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="3.5"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"></path>
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M20.3 15.2A8.5 8.5 0 0 1 8.8 3.7 8.5 8.5 0 1 0 20.3 15.2Z"></path>
            </svg>
          }
        </button>
      </div>

      <button
        class="menu-toggle"
        type="button"
        aria-controls="mobile-navigation"
        [attr.aria-expanded]="menuOpen()"
        [attr.aria-label]="menuOpen() ? t.nav.closeMenuLabel : t.nav.menuLabel"
        (click)="toggleMenu()"
      >
        <span>{{ t.nav.menu }}</span>
        <i aria-hidden="true"></i>
      </button>

      @if (menuOpen()) {
        <nav
          class="mobile-navigation"
          id="mobile-navigation"
          [attr.aria-label]="navigationLabel"
        >
          @for (item of navigation; track item.fragment) {
            <a
              [routerLink]="homePath"
              [fragment]="item.fragment"
              (click)="closeMenu()"
            >
              <span>{{ item.index }}</span>
              {{ item.label }}
            </a>
          }
        </nav>
      }
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  @Input({ required: true }) locale!: Locale;
  @Input() currentProjectSlug?: string;

  readonly menuOpen = signal(false);
  readonly themeService = inject(ThemeService);

  private readonly localeService = inject(LocaleService);

  get t() {
    return v2Copy[this.locale];
  }

  get homePath(): string {
    return homeHref(this.locale);
  }

  get languagePath(): string {
    return this.currentProjectSlug
      ? projectHref(this.alternateLocale, this.currentProjectSlug)
      : homeHref(this.alternateLocale);
  }

  get alternateLocale(): Locale {
    return this.locale === "pt" ? "en" : "pt";
  }

  get themeLabel(): string {
    return this.themeService.theme() === "dark"
      ? this.t.nav.lightThemeLabel
      : this.t.nav.darkThemeLabel;
  }

  get navigationLabel(): string {
    return this.locale === "pt" ? "Navegação principal" : "Primary navigation";
  }

  get navigation() {
    return [
      { index: "01", label: this.t.nav.work, fragment: "projetos" },
      { index: "02", label: this.t.nav.experience, fragment: "experiencia" },
      { index: "03", label: this.t.nav.capabilities, fragment: "competencias" },
      { index: "04", label: this.t.nav.lab, fragment: "lab" },
      { index: "05", label: this.t.nav.about, fragment: "sobre" },
      { index: "06", label: this.t.nav.contact, fragment: "contato" },
    ];
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  selectLocale(): void {
    this.localeService.setLocale(this.alternateLocale);
    this.closeMenu();
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
