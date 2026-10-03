import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";
import type { Locale, Project } from "../../../../../shared/content";

@Component({
  selector: "app-project-visual",
  template: `
    <div class="project-visual-v2" [class.project-visual-technical]="!project.visual">
      @if (project.visual; as visual) {
        <img
          [src]="visual.src"
          [alt]="visual.alt[locale]"
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
        />
      } @else {
        <div class="project-technical-flow" aria-hidden="true">
          <span class="project-visual-index">{{ project.index }}</span>
          <ol>
            @for (step of project.coverFlow; track step.index) {
              <li>
                <span>{{ step.index }}</span>
                <strong>{{ step.value[locale] }}</strong>
              </li>
            }
          </ol>
        </div>
      }
      <span class="project-visual-label" aria-hidden="true">
        BQTECH / {{ project.index }}
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVisualComponent {
  @Input({ required: true }) project!: Project;
  @Input({ required: true }) locale!: Locale;
}
