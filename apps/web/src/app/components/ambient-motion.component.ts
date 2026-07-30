import { DOCUMENT } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  NgZone,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-ambient-motion",
  template: `
    <div class="ambient-motion" aria-hidden="true">
      <span class="ambient-blob ambient-blob-a"></span>
      <span class="ambient-blob ambient-blob-b"></span>
      <span class="ambient-blob ambient-blob-c"></span>
      <span class="ambient-pointer"></span>
      <span class="ambient-vignette"></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmbientMotionComponent implements AfterViewInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly zone = inject(NgZone);
  private readonly cleanup: Array<() => void> = [];
  private frameId: number | null = null;
  private pointerX = 0;
  private pointerY = 0;

  ngAfterViewInit(): void {
    const view = this.document.defaultView;

    if (
      !view ||
      view.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = this.document.documentElement;
    const supportsPointerGlow = view.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const render = () => {
      this.frameId = null;
      root.style.setProperty("--ambient-scroll", `${view.scrollY * 0.055}px`);

      if (supportsPointerGlow && this.pointerX && this.pointerY) {
        root.style.setProperty("--pointer-x", `${this.pointerX}px`);
        root.style.setProperty("--pointer-y", `${this.pointerY}px`);
      }
    };

    const scheduleRender = () => {
      if (this.frameId === null) {
        this.frameId = view.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      this.pointerX = event.clientX;
      this.pointerY = event.clientY;
      scheduleRender();
    };

    const handleScroll = () => scheduleRender();

    this.zone.runOutsideAngular(() => {
      if (supportsPointerGlow) {
        view.addEventListener("pointermove", handlePointerMove, {
          passive: true
        });
        this.cleanup.push(() =>
          view.removeEventListener("pointermove", handlePointerMove)
        );
      }

      view.addEventListener("scroll", handleScroll, { passive: true });
      this.cleanup.push(() =>
        view.removeEventListener("scroll", handleScroll)
      );
      scheduleRender();
    });
  }

  ngOnDestroy(): void {
    const view = this.document.defaultView;
    this.cleanup.forEach((removeListener) => removeListener());

    if (view && this.frameId !== null) {
      view.cancelAnimationFrame(this.frameId);
    }
  }
}
