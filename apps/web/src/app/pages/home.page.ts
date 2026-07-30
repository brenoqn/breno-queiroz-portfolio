import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  copy,
  projectHref,
  projects,
  timeline,
  type Locale,
} from "../../../../../shared/content";
import { ProjectVisualComponent } from "../components/project-visual.component";
import { RotatingRoleComponent } from "../components/rotating-role.component";
import { WordmarkComponent } from "../components/wordmark.component";
import { RevealOnScrollDirective } from "../directives/reveal-on-scroll.directive";

@Component({
  selector: "app-home-page",
  imports: [
    ProjectVisualComponent,
    RevealOnScrollDirective,
    RotatingRoleComponent,
    RouterLink,
    WordmarkComponent,
  ],
  templateUrl: "./home.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);

  readonly locale: Locale =
    this.route.snapshot.data["locale"] === "en" ? "en" : "pt";
  readonly projects = projects;
  readonly t = copy[this.locale];
  readonly timeline = timeline;

  constructor() {
    this.document.documentElement.lang = this.t.htmlLang;
    this.title.setTitle(
      this.locale === "pt"
        ? "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack"
        : "Breno Queiroz — Web Designer & Full-Stack Developer",
    );
    this.meta.updateTag({
      name: "description",
      content:
        this.locale === "pt"
          ? "Portfólio de Breno Queiroz: web design, desenvolvimento full-stack e evolução contínua."
          : "Breno Queiroz's portfolio: web design, full-stack development, and continuous growth.",
    });
  }

  get languagePath(): string {
    return this.locale === "pt" ? "/en" : "/";
  }

  projectPath(slug: string): string {
    return projectHref(this.locale, slug);
  }
}
