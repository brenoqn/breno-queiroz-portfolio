import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
} from "@angular/core";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#_";
const DURATION_MS = 420;

/**
 * Terminal-style "decode": when the element first enters the viewport, its
 * characters scramble and resolve left to right. Only text node values are
 * swapped (Angular keeps ownership of the nodes) and the original text is
 * restored at the end. Skipped entirely with prefers-reduced-motion.
 */
@Directive({ selector: "[appDecode]" })
export class DecodeTextDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer: IntersectionObserver | null = null;
  private frameId: number | null = null;
  private nodes: Text[] = [];
  private originals: string[] = [];

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    const view = host.ownerDocument.defaultView;

    if (
      !view ||
      !("IntersectionObserver" in view) ||
      view.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new view.IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.observer?.disconnect();
            this.observer = null;
            this.start(view);
          }
        },
        { threshold: 0.6 },
      );
      this.observer.observe(host);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.stop();
  }

  private start(view: Window): void {
    const host = this.element.nativeElement;
    const walker = host.ownerDocument.createTreeWalker(
      host,
      NodeFilter.SHOW_TEXT,
    );

    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.nodeValue?.trim()) {
        this.nodes.push(node as Text);
        this.originals.push(node.nodeValue);
      }
    }

    const total = this.originals.reduce((sum, text) => sum + text.length, 0);

    if (total === 0) {
      return;
    }

    const startedAt = view.performance.now();

    const render = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / DURATION_MS);
      let revealed = Math.floor(progress * total);

      this.nodes.forEach((node, index) => {
        const original = this.originals[index];
        let next = "";

        for (const character of original) {
          if (revealed > 0 || !/[\p{L}\p{N}]/u.test(character)) {
            next += character;
          } else {
            next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          revealed -= 1;
        }

        node.nodeValue = next;
      });

      if (progress < 1) {
        this.frameId = view.requestAnimationFrame(render);
        return;
      }

      this.stop();
    };

    this.frameId = view.requestAnimationFrame(render);
  }

  private stop(): void {
    const view = this.element.nativeElement.ownerDocument.defaultView;

    if (this.frameId !== null) {
      view?.cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }

    this.nodes.forEach((node, index) => {
      node.nodeValue = this.originals[index];
    });
    this.nodes = [];
    this.originals = [];
  }
}
