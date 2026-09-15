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

test("serves Angular case study routes in both languages", async () => {
  const [portuguese, english] = await Promise.all([
    render("/projetos/galinheiro"),
    render("/en/projects/galinheiro"),
  ]);

  assert.equal(portuguese.status, 200);
  assert.equal(english.status, 200);
  assert.match(await portuguese.text(), /data-runtime="angular"/);
  assert.match(await english.text(), /data-runtime="angular"/);
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
  assert.match(
    content,
    /Eu desenho experiências e construo produtos digitais/,
  );
  assert.match(
    content,
    /I design experiences and build digital products/,
  );
});

test("ships the mapped green motion system with reduced-motion support", async () => {
  const [styles, ambientMotion, rotatingRole] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../apps/web/src/app/components/ambient-motion.component.ts",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../apps/web/src/app/components/rotating-role.component.ts",
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
  assert.match(rotatingRole, /DESENVOLVEDOR FULL-STACK/);
  assert.match(rotatingRole, /FULL-STACK DEVELOPER/);
});

test("models the Galinheiro as a real protected IoT case", async () => {
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
  assert.match(content, /pt: "Projeto em evolução"/);
  assert.match(content, /technologies: \["ESP32", "MQTT", "Home Assistant"\]/);
  assert.match(content, /appUrl: "https:\/\/galinheiro\.bqtech\.com\.br"/);
  assert.equal(content.match(/appUrl:/g)?.length, 1);
  assert.match(content, /appAccess: "protected"/);
  assert.match(content, /openSystem: "Acessar sistema"/);
  assert.match(content, /openSystem: "Open system"/);
  assert.match(template, /project\.status\[locale\]/);
  assert.match(template, /project\.technologies/);
  assert.match(template, /@if \(project\.appUrl; as appUrl\)/);
  assert.match(template, /\[href\]="appUrl"/);
  assert.match(template, /target="_blank"/);
  assert.match(template, /rel="noopener noreferrer"/);
  assert.doesNotMatch(template, /t\.case\.model/);
});
