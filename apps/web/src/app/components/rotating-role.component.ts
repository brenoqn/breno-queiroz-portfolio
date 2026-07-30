import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal
} from "@angular/core";

import type { Locale } from "../../../../../shared/content";

const roles: Record<Locale, readonly string[]> = {
  pt: [
    "WEB DESIGNER",
    "DESENVOLVEDOR FULL-STACK",
    "CONSTRUTOR DE PRODUTOS"
  ],
  en: ["WEB DESIGNER", "FULL-STACK DEVELOPER", "PRODUCT BUILDER"]
};

@Component({
  selector: "app-rotating-role",
  template: `
    <p class="hero-role">
      <span class="sr-only">{{ accessibleLabel }}</span>
      <span class="hero-role-animation" aria-hidden="true">
        <span class="hero-role-prefix">{{ prefix }}</span>
        <strong>{{ displayedRole() }}</strong>
        <span class="type-caret"></span>
      </span>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotatingRoleComponent implements OnInit, OnDestroy {
  @Input({ required: true }) locale!: Locale;

  readonly displayedRole = signal("");

  private readonly document = inject(DOCUMENT);
  private activeRoles: readonly string[] = [];
  private roleIndex = 0;
  private characterIndex = 0;
  private deleting = false;
  private timerId: number | null = null;

  get prefix(): string {
    return this.locale === "pt" ? "EM FOCO" : "IN FOCUS";
  }

  get accessibleLabel(): string {
    const label = this.locale === "pt" ? "Atuação" : "Roles";
    return `${label}: ${this.activeRoles.join(", ")}`;
  }

  ngOnInit(): void {
    this.activeRoles = roles[this.locale];
    const view = this.document.defaultView;

    if (!view || view.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.displayedRole.set(this.activeRoles[0]);
      return;
    }

    this.tick();
  }

  ngOnDestroy(): void {
    const view = this.document.defaultView;

    if (view && this.timerId !== null) {
      view.clearTimeout(this.timerId);
    }
  }

  private tick(): void {
    const role = this.activeRoles[this.roleIndex];

    if (!this.deleting) {
      this.characterIndex += 1;
      this.displayedRole.set(role.slice(0, this.characterIndex));

      if (this.characterIndex === role.length) {
        this.deleting = true;
        this.schedule(1500);
        return;
      }

      this.schedule(72);
      return;
    }

    this.characterIndex -= 1;
    this.displayedRole.set(role.slice(0, this.characterIndex));

    if (this.characterIndex === 0) {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.activeRoles.length;
      this.schedule(360);
      return;
    }

    this.schedule(36);
  }

  private schedule(delay: number): void {
    const view = this.document.defaultView;

    if (view) {
      this.timerId = view.setTimeout(() => this.tick(), delay);
    }
  }
}
