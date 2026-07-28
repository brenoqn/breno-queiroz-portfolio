import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
  copy,
  getProject,
  homeHref,
  projectHref,
  projects,
  type Locale,
  type Project,
} from "../../../../../shared/content";
import { WordmarkComponent } from "../components/wordmark.component";

@Component({
  selector: "app-case-study-page",
  imports: [RouterLink, WordmarkComponent],
  templateUrl: "./case-study.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyPage {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  readonly locale: Locale =
    this.route.snapshot.data["locale"] === "en" ? "en" : "pt";
  readonly project: Project;
  readonly nextProject: Project;
  readonly t = copy[this.locale];

  constructor() {
    const slug = this.route.snapshot.paramMap.get("slug") ?? "";
    const resolvedProject = getProject(slug);

    if (!resolvedProject) {
      this.project = projects[0];
      this.nextProject = projects[1];
      void this.router.navigateByUrl(homeHref(this.locale));
      return;
    }

    this.project = resolvedProject;
    const currentIndex = projects.findIndex(
      (project) => project.slug === this.project.slug,
    );
    this.nextProject = projects[(currentIndex + 1) % projects.length];

    this.document.documentElement.lang = this.t.htmlLang;
    this.title.setTitle(
      `${this.project.title[this.locale]} — Breno Queiroz`,
    );
    this.meta.updateTag({
      name: "description",
      content: this.project.summary[this.locale],
    });
  }

  get backPath(): string {
    return homeHref(this.locale);
  }

  get nextProjectPath(): string {
    return projectHref(this.locale, this.nextProject.slug);
  }
}
