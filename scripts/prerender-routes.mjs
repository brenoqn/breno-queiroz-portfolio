// Writes a static index.html per public route (e.g. /en, /projetos/garage)
// with route-specific <title>, description, canonical, hreflang and social
// tags. Crawlers that do not run JavaScript (LinkedIn, WhatsApp, Slack...)
// then see the right preview; the Angular app still boots normally.
//
// Usage: node scripts/prerender-routes.mjs <browser-output-dir>
// Requires Node.js with TypeScript type stripping (>= 22.18).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import {
  SITE_ORIGIN,
  casePageSeo,
  homePageSeo,
  projects,
} from "../shared/content.ts";

const outputDir = resolve(process.argv[2] ?? "angular-dist/browser");
const template = await readFile(join(outputDir, "index.html"), "utf8");

const HTML_LANG = { pt: "pt-BR", en: "en" };
const OG_LOCALE = { pt: "pt_BR", en: "en_US" };

function escapeAttribute(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function absolute(path) {
  return `${SITE_ORIGIN}${path}`;
}

function render(page) {
  let html = template;
  const other = page.locale === "pt" ? "en" : "pt";
  const ptPath = page.locale === "pt" ? page.path : page.alternatePath;
  const enPath = page.locale === "en" ? page.path : page.alternatePath;

  const replace = (pattern, replacement, label) => {
    if (!pattern.test(html)) {
      throw new Error(`prerender: ${label} not found in index.html`);
    }
    html = html.replace(pattern, replacement);
  };

  const meta = (attribute, key, value) =>
    replace(
      new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/?>`),
      `<meta ${attribute}="${key}" content="${escapeAttribute(value)}">`,
      `${attribute}=${key}`,
    );

  const link = (attributes, href, label) =>
    replace(
      new RegExp(`<link\\s+${attributes}\\s+href="[^"]*"\\s*/?>`),
      `<link ${attributes} href="${escapeAttribute(href)}">`,
      label,
    );

  replace(/<html lang="[^"]*"/, `<html lang="${HTML_LANG[page.locale]}"`, "html lang");
  replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttribute(page.title)}</title>`,
    "title",
  );
  meta("name", "description", page.description);
  link('rel="canonical"', absolute(page.path), "canonical");
  link('rel="alternate" hreflang="pt-BR"', absolute(ptPath), "hreflang pt-BR");
  link('rel="alternate" hreflang="en"', absolute(enPath), "hreflang en");
  link('rel="alternate" hreflang="x-default"', absolute(ptPath), "hreflang x-default");
  meta("property", "og:locale", OG_LOCALE[page.locale]);
  meta("property", "og:locale:alternate", OG_LOCALE[other]);
  meta("property", "og:url", absolute(page.path));
  meta("property", "og:title", page.title);
  meta("property", "og:description", page.description);
  meta("property", "og:image", absolute(page.image));
  meta("property", "og:image:alt", page.imageAlt);
  meta("name", "twitter:title", page.title);
  meta("name", "twitter:description", page.description);
  meta("name", "twitter:image", absolute(page.image));

  return html;
}

const pages = [
  homePageSeo("en"),
  ...projects.flatMap((project) => [
    casePageSeo(project, "pt"),
    casePageSeo(project, "en"),
  ]),
];

for (const page of pages) {
  const directory = join(outputDir, ...page.path.split("/").filter(Boolean));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), render(page));
}

console.log(`Prerendered ${pages.length} routes: ${pages.map((page) => page.path).join(", ")}`);
