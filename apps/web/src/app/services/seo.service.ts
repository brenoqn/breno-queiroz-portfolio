import { DOCUMENT } from "@angular/common";
import { inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {
  SITE_ORIGIN,
  type Locale,
  type PageSeo,
} from "../../../../../shared/content";

const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };
const HREFLANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };

/**
 * Keeps title, description, canonical, hreflang and Open Graph/Twitter tags
 * in sync with the active route. index.html carries the static defaults used
 * by crawlers that do not execute JavaScript.
 */
@Injectable({ providedIn: "root" })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  update(page: PageSeo): void {
    const url = this.absolute(page.path);
    const alternateLocale: Locale = page.locale === "pt" ? "en" : "pt";
    const ptPath = page.locale === "pt" ? page.path : page.alternatePath;

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: "description", content: page.description });

    this.meta.updateTag({ property: "og:url", content: url });
    this.meta.updateTag({ property: "og:title", content: page.title });
    this.meta.updateTag({
      property: "og:description",
      content: page.description,
    });
    this.meta.updateTag({
      property: "og:locale",
      content: OG_LOCALE[page.locale],
    });
    this.meta.updateTag({
      property: "og:locale:alternate",
      content: OG_LOCALE[alternateLocale],
    });
    this.meta.updateTag({
      property: "og:image",
      content: this.absolute(page.image),
    });
    this.meta.updateTag({ property: "og:image:alt", content: page.imageAlt });
    this.meta.updateTag({
      name: "twitter:image",
      content: this.absolute(page.image),
    });
    this.meta.updateTag({ name: "twitter:title", content: page.title });
    this.meta.updateTag({
      name: "twitter:description",
      content: page.description,
    });

    this.setLink('link[rel="canonical"]', { rel: "canonical", href: url });
    this.setLink(`link[rel="alternate"][hreflang="${HREFLANG[page.locale]}"]`, {
      rel: "alternate",
      hreflang: HREFLANG[page.locale],
      href: url,
    });
    this.setLink(
      `link[rel="alternate"][hreflang="${HREFLANG[alternateLocale]}"]`,
      {
        rel: "alternate",
        hreflang: HREFLANG[alternateLocale],
        href: this.absolute(page.alternatePath),
      },
    );
    this.setLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: this.absolute(ptPath),
    });
  }

  private absolute(path: string): string {
    return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
  }

  private setLink(selector: string, attributes: Record<string, string>): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>(selector);

    if (!link) {
      link = this.document.createElement("link");
      head.appendChild(link);
    }

    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
  }
}
