import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import {
  capabilityGroups,
  experience,
  homeHref,
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
  readonly t = v2Copy[this.locale];
  readonly heroWords = this.t.hero.title.split(" ");
  readonly email = "brenoqn01@gmail.com";
  readonly linkedinUrl = "https://www.linkedin.com/in/brenoqn/";
  readonly githubUrl = "https://github.com/brenoqn";
  readonly resumeUrl: string | null = null;

  constructor() {
    this.document.documentElement.lang = this.t.htmlLang;
    this.seo.update({
      locale: this.locale,
      title: "Breno Queiroz — Software Engineer",
      description:
        this.locale === "pt"
          ? "Software Engineer em Uberlândia. Produtos digitais, UX e engenharia da ideia à produção."
          : "Software Engineer based in Uberlândia. Digital products, UX, and engineering from idea to production.",
      path: homeHref(this.locale),
      alternatePath: homeHref(this.locale === "pt" ? "en" : "pt"),
    });
  }

  get homePath(): string {
    return homeHref(this.locale);
  }

  projectPath(slug: string): string {
    return projectHref(this.locale, slug);
  }
}
