import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

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
    render("/projetos/produto-ponta-a-ponta"),
    render("/en/projects/produto-ponta-a-ponta"),
  ]);

  assert.equal(portuguese.status, 200);
  assert.equal(english.status, 200);
  assert.match(await portuguese.text(), /data-runtime="angular"/);
  assert.match(await english.text(), /data-runtime="angular"/);
});

test("builds the Angular interface with bilingual portfolio content", async () => {
  const [bundle, template, content] = await Promise.all([
    readFile(new URL("../public/angular/main.js", import.meta.url), "utf8"),
    readFile(
      new URL("../apps/web/src/app/pages/home.page.html", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../shared/content.ts", import.meta.url), "utf8"),
  ]);

  assert.ok(bundle.length > 100_000);
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
