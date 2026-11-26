import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
} from "@angular/core";

const MAX_TILT_DEG = 3;

/**
 * Subtle pointer-driven tilt and glow. Writes CSS custom properties
 * (--tilt-x, --tilt-y, --glow-x, --glow-y) consumed by the stylesheet.
 * Only active for fine pointers with hover and without reduced motion.
 */
@Directive({
  selector: "[appTilt]",
  host: { class: "tilt-surface" },
})
export class TiltDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly cleanup: Array<() => void> = [];
  private frameId: number | null = null;

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const view = host.ownerDocument.defaultView;

    if (
      !view ||
      !view.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      view.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let pointerX = 0.5;
    let pointerY = 0.5;

    const render = () => {
      this.frameId = null;
      host.style.setProperty(
        "--tilt-x",
        `${((0.5 - pointerY) * MAX_TILT_DEG * 2).toFixed(2)}deg`,
      );
      host.style.setProperty(
        "--tilt-y",
        `${((pointerX - 0.5) * MAX_TILT_DEG * 2).toFixed(2)}deg`,
      );
      host.style.setProperty("--glow-x", `${(pointerX * 100).toFixed(1)}%`);
      host.style.setProperty("--glow-y", `${(pointerY * 100).toFixed(1)}%`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = (event.clientY - rect.top) / rect.height;
      host.classList.add("is-tilting");

      if (this.frameId === null) {
        this.frameId = view.requestAnimationFrame(render);
      }
    };

    const onLeave = () => {
      if (this.frameId !== null) {
        view.cancelAnimationFrame(this.frameId);
        this.frameId = null;
      }

      host.classList.remove("is-tilting");
      for (const name of ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"]) {
        host.style.removeProperty(name);
      }
    };

    this.zone.runOutsideAngular(() => {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave, { passive: true });
    });

    this.cleanup.push(
      () => host.removeEventListener("pointermove", onMove),
      () => host.removeEventListener("pointerleave", onLeave),
      onLeave,
    );
  }

  ngOnDestroy(): void {
    this.cleanup.forEach((dispose) => dispose());
  }
}
