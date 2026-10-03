import { DOCUMENT } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  NavigationCancel,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
  Scroll as RouterScroll,
} from "@angular/router";

import { AmbientMotionComponent } from "./components/ambient-motion.component";

@Component({
  selector: "app-root",
  imports: [AmbientMotionComponent, RouterOutlet],
  template: `
    <app-ambient-motion />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private previousScrollBehavior = "";

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.previousScrollBehavior =
          this.document.documentElement.style.scrollBehavior;
        this.document.documentElement.style.scrollBehavior = "auto";
        return;
      }

      if (
        event instanceof RouterScroll ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.document.documentElement.style.scrollBehavior =
          this.previousScrollBehavior;
      }
    });
  }
}
