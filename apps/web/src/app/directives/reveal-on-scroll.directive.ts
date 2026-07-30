import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  NgZone,
  OnDestroy
} from "@angular/core";

@Directive({
  selector: "[appReveal]",
  host: {
    class: "motion-reveal"
  }
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    const view = this.element.nativeElement.ownerDocument.defaultView;

    if (
      !view ||
      !("IntersectionObserver" in view) ||
      view.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      this.show();
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new view.IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.show();
            this.observer?.disconnect();
            this.observer = null;
          }
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -8%"
        }
      );

      this.observer.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private show(): void {
    this.element.nativeElement.classList.add("is-visible");
  }
}
