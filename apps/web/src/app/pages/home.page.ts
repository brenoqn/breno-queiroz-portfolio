import { DOCUMENT } from "@angular/common";
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  capabilityContexts,
  capabilityGroups,
  experience,
  homeHref,
  homePageSeo,
  projectHref,
  projects,
  v2Copy,
  type Locale,
} from "../../../../../shared/content";
import { ProjectVisualComponent } from "../components/project-visual.component";
import { RotatingRoleComponent } from "../components/rotating-role.component";
import { SiteHeaderComponent } from "../components/site-header.component";
import { DecodeTextDirective } from "../directives/decode-text.directive";
import { RevealOnScrollDirective } from "../directives/reveal-on-scroll.directive";
import { TiltDirective } from "../directives/tilt.directive";
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-home-page",
  imports: [
    DecodeTextDirective,
    ProjectVisualComponent,
    RevealOnScrollDirective,
    RotatingRoleComponent,
    RouterLink,
    SiteHeaderComponent,
    TiltDirective,
  ],
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly document = inject(DOCUMENT);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly locale: Locale =
    this.route.snapshot.data["locale"] === "en" ? "en" : "pt";
  readonly projects = projects;
  readonly experience = experience.filter((item) => item.published);
  readonly capabilityGroups = capabilityGroups;
  readonly capabilityContexts = capabilityContexts;
  /** Experience entries whose details are expanded; the most recent starts open. */
  readonly openExperience = signal<ReadonlySet<string>>(new Set(["01"]));
  readonly t = v2Copy[this.locale];
  readonly heroWords = this.t.hero.title.split(" ");
  readonly email = "brenoqn01@gmail.com";
  readonly linkedinUrl = "https://www.linkedin.com/in/brenoqn/";
  readonly githubUrl = "https://github.com/brenoqn";
  readonly resumeUrl: string | null = null;
  readonly canCopy = signal(false);
  readonly copied = signal(false);
  readonly copyText = this.locale === "pt" ? "Copiar" : "Copy";
  readonly copiedText = this.locale === "pt" ? "Copiado ✓" : "Copied ✓";
  readonly copyLabel =
    this.locale === "pt" ? "Copiar endereço de e-mail" : "Copy email address";
  private copyTimer: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.canCopy.set(
        typeof this.document.defaultView?.navigator.clipboard?.writeText ===
          "function",
      );
    });
    inject(DestroyRef).onDestroy(() => {
      if (this.copyTimer !== null) {
        this.document.defaultView?.clearTimeout(this.copyTimer);
      }
    });

    this.document.documentElement.lang = this.t.htmlLang;
    this.seo.update(homePageSeo(this.locale));
  }

  isExperienceOpen(index: string): boolean {
    return this.openExperience().has(index);
  }

  toggleExperience(index: string): void {
    this.openExperience.update((open) => {
      const next = new Set(open);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  async copyEmail(): Promise<void> {
    const view = this.document.defaultView;

    try {
      await view?.navigator.clipboard.writeText(this.email);
    } catch {
      return;
    }

    this.copied.set(true);

    if (view) {
      if (this.copyTimer !== null) {
        view.clearTimeout(this.copyTimer);
      }

      this.copyTimer = view.setTimeout(() => this.copied.set(false), 2200);
    }
  }

  get homePath(): string {
    return homeHref(this.locale);
  }

  projectPath(slug: string): string {
    return projectHref(this.locale, slug);
  }
}
