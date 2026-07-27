import assert from "node:assert/strict";
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

test("renders the Portuguese portfolio without starter markers", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Breno Queiroz/);
  assert.match(html, /Eu desenho experiências e construo produtos digitais/);
  assert.match(html, /Projetos selecionados/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Building your site/);
});

test("renders the English portfolio", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /I design experiences and build digital products/);
  assert.match(html, /Selected work/);
  assert.match(html, /Contact in progress/);
});

test("renders case study routes in both languages", async () => {
  const [portuguese, english] = await Promise.all([
    render("/projetos/produto-ponta-a-ponta"),
    render("/en/projects/produto-ponta-a-ponta"),
  ]);

  assert.equal(portuguese.status, 200);
  assert.equal(english.status, 200);

  assert.match(await portuguese.text(), /Produto digital ponta a ponta/);
  assert.match(await english.text(), /End-to-end digital product/);
});

