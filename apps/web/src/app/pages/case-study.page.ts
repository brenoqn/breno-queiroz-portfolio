import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
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
import { SeoService } from "../services/seo.service";

@Component({
  selector: "app-case-study-page",
  imports: [RevealOnScrollDirective, RouterLink, SiteHeaderComponent],
  templateUrl: "./case-study.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudyPage {
  private readonly document = inject(DOCUMENT);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

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
      this.seo.update({
        locale: this.locale,
        title: `${this.project.title[this.locale]} — Breno Queiroz`,
        description: this.project.summary[this.locale],
        path: projectHref(this.locale, resolvedProject.slug),
        alternatePath: projectHref(
          this.locale === "pt" ? "en" : "pt",
          resolvedProject.slug,
        ),
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
