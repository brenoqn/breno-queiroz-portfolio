import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

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
export class App {}
