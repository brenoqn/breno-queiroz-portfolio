import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
  copy,
  getNextProject,
  getProject,
  homeHref,
  projectHref,
  projects,
  type Locale,
  type Project,
} from "../../../../../shared/content";
import { SiteHeaderComponent } from "../components/site-header.component";
import { RevealOnScrollDirective } from "../directives/reveal-on-scroll.directive";

@Component({
  selector: "app-case-study-page",
  imports: [RevealOnScrollDirective, RouterLink, SiteHeaderComponent],
  templateUrl: "./case-study.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyPage {
  private readonly document = inject(DOCUMENT);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  readonly locale: Locale =
    this.route.snapshot.data["locale"] === "en" ? "en" : "pt";
  project: Project = projects[0];
  nextProject: Project = getNextProject(this.project.slug);
  readonly t = copy[this.locale];

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const resolvedProject = getProject(params.get("slug") ?? "");

      if (!resolvedProject) {
        void this.router.navigateByUrl(homeHref(this.locale), {
          replaceUrl: true,
        });
        return;
      }

      this.project = resolvedProject;
      this.nextProject = getNextProject(resolvedProject.slug);
      this.document.documentElement.lang = this.t.htmlLang;
      this.title.setTitle(
        `${this.project.title[this.locale]} — Breno Queiroz`,
      );
      this.meta.updateTag({
        name: "description",
        content: this.project.summary[this.locale],
      });
      this.changeDetector.markForCheck();
    });
  }

  get backPath(): string {
    return homeHref(this.locale);
  }

  get nextProjectPath(): string {
    return projectHref(this.locale, this.nextProject.slug);
  }
}
