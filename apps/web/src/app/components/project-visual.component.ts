import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from "@angular/core";

@Component({
  selector: "app-project-visual",
  template: `
    <div
      class="project-visual"
      [class.project-visual-01]="index === '01'"
      [class.project-visual-02]="index === '02'"
      [class.project-visual-03]="index === '03'"
      aria-hidden="true"
    >
      <div class="visual-window">
        <div class="visual-window-bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="visual-grid">
          <div class="visual-line visual-line-accent"></div>
          <div class="visual-line"></div>
          <div class="visual-line visual-line-short"></div>
          <div class="visual-block"></div>
        </div>
      </div>
      <span class="visual-index">{{ index }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectVisualComponent {
  @Input({ required: true }) index!: string;
}
