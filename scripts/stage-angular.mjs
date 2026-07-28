import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputRoot = resolve(projectRoot, "angular-dist");
const browserOutput = resolve(outputRoot, "browser");
const source = await stat(browserOutput)
  .then(() => browserOutput)
  .catch(() => outputRoot);
const destination = resolve(projectRoot, "public", "angular");

await rm(destination, { force: true, recursive: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

const files = await readdir(destination);
if (!files.includes("main.js")) {
  throw new Error("Angular build did not emit main.js");
}

console.log(`Angular bundle staged with ${files.length} top-level files.`);
