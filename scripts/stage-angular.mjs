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

const files = await readdir(destination, { withFileTypes: true });
const mainBundles = files.filter(
  (file) => file.isFile() && /^main-[A-Za-z0-9]{8,}\.js$/.test(file.name),
);

if (mainBundles.length === 0) {
  throw new Error("Angular build did not emit a hashed main-*.js bundle");
}

if (mainBundles.length > 1) {
  throw new Error(
    `Angular build emitted ambiguous main bundles: ${mainBundles.map((file) => file.name).join(", ")}`,
  );
}

console.log(`Angular bundle staged with ${files.length} top-level files.`);
