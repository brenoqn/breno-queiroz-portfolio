import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const angularOutputUrl = new URL("../public/angular/", import.meta.url);

async function readAngularMainBundle() {
  const files = await readdir(angularOutputUrl, { withFileTypes: true });
  const mainBundles = files.filter(
    (file) => file.isFile() && /^main-[A-Za-z0-9]{8,}\.js$/.test(file.name),
  );

  assert.equal(
    mainBundles.length,
    1,
    `Expected exactly one hashed Angular main bundle, found: ${mainBundles.map((file) => file.name).join(", ") || "none"}`,
  );

  return {
    name: mainBundles[0].name,
    content: await readFile(
      new URL(mainBundles[0].name, angularOutputUrl),
      "utf8",
    ),
  };
}

async function render(pathname) {
  const url = new URL(workerUrl);
  url.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(url.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("serves the Angular portfolio shell without starter markers", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Breno Queiroz/);
  assert.match(html, /<app-root[^>]*data-runtime="angular"/);
  assert.match(html, /AngularBootstrap-/);
  assert.doesNotMatch(
    html,
    /codex-preview|react-loading-skeleton|Building your site/,
  );
});

test("serves the English Angular route", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<app-root[^>]*data-runtime="angular"/);
  assert.match(html, /lang="en"/);
});

test("serves every Angular case study route in both languages", async () => {
  const slugs = ["galinheiro", "garage", "memoriar"];
  const responses = await Promise.all(
    slugs.flatMap((slug) => [
      render(`/projetos/${slug}`),
      render(`/en/projects/${slug}`),
    ]),
  );

  for (const response of responses) {
    assert.equal(response.status, 200);
    assert.match(await response.text(), /data-runtime="angular"/);
  }
});

test("builds the Angular interface with bilingual portfolio content", async () => {
  const [bundle, index, bootstrap, template, content] = await Promise.all([
    readAngularMainBundle(),
    readFile(new URL("index.html", angularOutputUrl), "utf8"),
    readFile(new URL("../app/AngularBootstrap.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../apps/web/src/app/pages/home.page.html", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
  ]);

  assert.ok(bundle.content.length > 100_000);
  assert.ok(index.includes(`/angular/${bundle.name}`));
  assert.match(index, /\/angular\/styles-[A-Za-z0-9]{8,}\.css/);
  assert.doesNotMatch(index, /\/angular\/(?:main\.js|styles\.css)/);
  assert.match(bootstrap, /fetch\("\/angular\/index\.html"/);
  assert.doesNotMatch(bootstrap, /\/angular\/main\.js/);
  assert.match(template, /app-project-visual/);
  assert.match(template, /id="projetos"/);
  assert.match(template, /id="experiencia"/);
  assert.match(template, /id="competencias"/);
  assert.match(template, /id="lab"/);
  assert.match(template, /id="contato"/);
  assert.match(
    content,
    /Design, código e produto — da ideia à produção/,
  );
  assert.match(
    content,
    /Design, code, and product — from idea to production/,
  );
});

test("ships the mapped green motion system with reduced-motion support", async () => {
  const [styles, ambientMotion] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../apps/web/src/app/components/ambient-motion.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(styles, /@keyframes ambient-drift-a/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.motion-reveal\.is-visible/);
  assert.match(ambientMotion, /pointermove/);
  assert.match(ambientMotion, /prefers-reduced-motion: reduce/);
  assert.match(styles, /\.hero-portrait/);
  assert.match(styles, /\.mobile-navigation/);
});

test("models the three BQTECH systems as real public cases", async () => {
  const [content, template] = await Promise.all([
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../apps/web/src/app/pages/case-study.page.html",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(content, /slug: "galinheiro"/);
  assert.match(content, /pt: "MVP v1 · Em evolução"/);
  assert.match(content, /technologies: \["ESP32", "MQTT", "Home Assistant"\]/);
  assert.match(content, /appUrl: "https:\/\/galinheiro\.bqtech\.com\.br"/);
  assert.match(content, /appAccess: "protected"/);
  assert.match(content, /slug: "garage"/);
  assert.match(content, /pt: "MVP · Em desenvolvimento"/);
  assert.match(content, /technologies: \[/);
  assert.match(content, /appUrl: "https:\/\/garage\.bqtech\.com\.br"/);
  assert.match(content, /slug: "memoriar"/);
  assert.match(content, /pt: "Produto · Em evolução"/);
  assert.match(content, /@memoriar\/shared/);
  assert.match(content, /appUrl: "https:\/\/memoriar\.bqtech\.com\.br"/);
  assert.equal(content.match(/appUrl:/g)?.length, 3);
  assert.equal(content.match(/appAccess: "public"/g)?.length, 2);
  assert.doesNotMatch(content, /experiencia-web-responsiva/);
  assert.doesNotMatch(content, /laboratorio-de-evolucao/);
  assert.doesNotMatch(content, /Modelo editorial privado/);
  assert.doesNotMatch(content, /Private editorial template/);
  assert.match(content, /openSystem: "Acessar sistema"/);
  assert.match(content, /openSystem: "Open system"/);
  assert.match(template, /project\.status\[locale\]/);
  assert.match(template, /project\.technologies/);
  assert.match(template, /@if \(project\.appUrl; as appUrl\)/);
  assert.match(template, /\[href\]="appUrl"/);
  assert.match(template, /target="_blank"/);
  assert.match(template, /rel="noopener noreferrer"/);
  assert.match(template, /project\.coverFlow/);
  assert.match(template, /project\.currentState\[locale\]/);
  assert.match(template, /project\.constraints/);
  assert.match(template, /project\.decisions/);
  assert.match(template, /project\.architectureSummary\[locale\]/);
  assert.match(template, /project\.evidence/);
  assert.match(template, /project\.limitations/);
  assert.match(template, /project\.nextSteps/);
  assert.match(template, /project\.vision\[locale\]/);
  assert.match(template, /case-evidence-visual/);
  assert.doesNotMatch(template, /DESIGN|BUILD|EVOLVE/);
  assert.doesNotMatch(template, /t\.case\.model/);
});

test("separates current case evidence from evolution and future vision", async () => {
  const [content, template] = await Promise.all([
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../apps/web/src/app/pages/case-study.page.html",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(content, /Wokwi/);
  assert.match(content, /galinheiro físico ainda não foi construído/i);
  assert.match(content, /dados demonstrativos/i);
  assert.match(content, /cadastro público colaborativo ainda não está implementado/i);
  assert.match(content, /statusDescription: \{/);
  assert.match(content, /currentState: \{/);
  assert.match(content, /nextSteps: \[/);
  assert.match(content, /vision: \{/);
  assert.doesNotMatch(content, /sensores físicos já estão instalados/i);
  assert.doesNotMatch(content, /ventilador|DHT22/i);
  assert.match(template, /t\.case\.current/);
  assert.match(template, /t\.case\.evolution/);
  assert.match(template, /t\.case\.vision/);
});

test("keeps navigation, language switching, and public contact locale-safe", async () => {
  const [header, home, homePage, caseTemplate, content, routes, localeService] = await Promise.all([
    readFile(
      new URL(
        "../apps/web/src/app/components/site-header.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL("../apps/web/src/app/pages/home.page.html", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../apps/web/src/app/pages/home.page.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/pages/case-study.page.html",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../apps/web/src/app/app.routes.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/services/locale.service.ts",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.match(header, /\[routerLink\]="homePath"/);
  assert.match(header, /\[fragment\]="item\.fragment"/);
  assert.doesNotMatch(header, /href="#/);
  assert.match(header, /projectHref\(this\.alternateLocale, this\.currentProjectSlug\)/);
  assert.match(header, /localeService\.setLocale\(this\.alternateLocale\)/);
  assert.match(header, /mobile-navigation/);
  assert.equal(routes.match(/canActivate: \[localePreferenceGuard\]/g)?.length, 4);
  assert.match(localeService, /new RedirectCommand/);
  assert.match(localeService, /replaceUrl: true/);
  assert.match(caseTemplate, /\[currentProjectSlug\]="project\.slug"/);
  assert.match(caseTemplate, /project\.appAccess === "protected"/);
  assert.match(homePage, /brenoqn01@gmail\.com/);
  assert.match(homePage, /linkedin\.com\/in\/brenoqn/);
  assert.match(homePage, /github\.com\/brenoqn/);
  assert.match(home, /mailto:/);
  assert.match(home, /rel="noopener noreferrer"/);
  assert.doesNotMatch(content, /Contato em preparação|Contact in progress/);
});

test("cycles through every next case with locale-safe data-driven routes", async () => {
  const { getNextProject, projectHref } = await import("../shared/content.ts");
  const sequence = [
    ["galinheiro", "garage"],
    ["garage", "memoriar"],
    ["memoriar", "galinheiro"],
  ];

  for (const [current, next] of sequence) {
    assert.equal(getNextProject(current).slug, next);
    assert.equal(projectHref("pt", next), `/projetos/${next}`);
    assert.equal(projectHref("en", next), `/en/projects/${next}`);
  }

  const casePage = await readFile(
    new URL("../apps/web/src/app/pages/case-study.page.ts", import.meta.url),
    "utf8",
  );

  assert.match(casePage, /route\.paramMap\.pipe\(takeUntilDestroyed\(\)\)/);
  assert.match(casePage, /getNextProject\(resolvedProject\.slug\)/);
});

test("normalizes and persists locale without adding redirect history entries", async () => {
  const {
    LOCALE_STORAGE_KEY,
    localizeUrl,
  } = await import("../shared/preferences.ts");
  const [localeService, header] = await Promise.all([
    readFile(
      new URL(
        "../apps/web/src/app/services/locale.service.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/components/site-header.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
  ]);

  assert.equal(LOCALE_STORAGE_KEY, "bqtech-locale");
  assert.equal(localizeUrl("/projetos/memoriar", "en"), "/en/projects/memoriar");
  assert.equal(localizeUrl("/en/projects/garage", "pt"), "/projetos/garage");
  assert.equal(localizeUrl("/#contato", "en"), "/en#contato");
  assert.equal(localizeUrl("/en?from=case#projetos", "pt"), "/?from=case#projetos");
  assert.equal(localizeUrl("/en/projects/memoriar", "en"), "/en/projects/memoriar");
  assert.match(localeService, /localStorage\.setItem/);
  assert.match(localeService, /localStorage\.getItem/);
  assert.match(localeService, /replaceUrl: true/);
  assert.match(header, /currentProjectSlug/);
});

test("ships persistent dark and light themes without a startup flash", async () => {
  const { THEME_STORAGE_KEY } = await import("../shared/preferences.ts");
  const [themeService, header, index, styles] = await Promise.all([
    readFile(
      new URL(
        "../apps/web/src/app/services/theme.service.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/components/site-header.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../apps/web/src/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.equal(THEME_STORAGE_KEY, "bqtech-theme");
  assert.match(themeService, /selectedTheme\(\) === "dark" \? "light" : "dark"/);
  assert.match(themeService, /localStorage\.setItem\(THEME_STORAGE_KEY, theme\)/);
  assert.match(header, /class="theme-toggle"/);
  assert.match(header, /aria-pressed/);
  assert.match(index, /localStorage\.getItem\(storageKey\)/);
  assert.match(index, /document\.documentElement\.dataset\.theme = theme/);
  assert.match(styles, /:root\[data-theme="light"\]/);
  assert.match(styles, /--header-background:/);
  assert.match(styles, /--accent-contrast:/);
});

test("restores the original focus roles and adds an accessible scroll cue", async () => {
  const [home, rotatingRole, styles] = await Promise.all([
    readFile(
      new URL("../apps/web/src/app/pages/home.page.html", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/components/rotating-role.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(home, /app-rotating-role/);
  assert.match(home, /class="hero-scroll-cue"/);
  assert.match(home, /aria-hidden="true" focusable="false"/);
  assert.match(rotatingRole, /DESENVOLVEDOR FULL-STACK/);
  assert.match(rotatingRole, /PRODUCT BUILDER/);
  assert.match(rotatingRole, /prefers-reduced-motion: reduce/);
  assert.match(styles, /@keyframes scroll-cue/);
  assert.match(styles, /\.hero-scroll-wheel/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
});

test("publishes factual experience and safe runtime assets only", async () => {
  const [content, home, publicFiles] = await Promise.all([
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
    readFile(
      new URL("../apps/web/src/app/pages/home.page.html", import.meta.url),
      "utf8",
    ),
    readdir(new URL("../apps/web/public/", import.meta.url)),
  ]);
  const shippedText = `${content}\n${home}`;

  assert.match(content, /company: "MAXICON SISTEMAS"/);
  assert.match(content, /company: "EVOLUUM"/);
  assert.match(content, /Modernização do ERP Maxys/);
  assert.match(content, /Seu Ingresso Aqui/);
  assert.match(home, /src="\/breno-queiroz\.webp"/);
  assert.match(home, /alt="Breno Queiroz"/);
  assert.ok(publicFiles.includes("breno-queiroz.webp"));
  assert.ok(publicFiles.includes("garage-dashboard.webp"));
  assert.ok(publicFiles.includes("memoriar-search.webp"));
  assert.equal(publicFiles.some((file) => /\.pdf$/i.test(file)), false);
  assert.doesNotMatch(shippedText, /\+?55\s*\(?34\)?|99894/);
  assert.doesNotMatch(shippedText, /breno_cv\.pdf/i);
});
