import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  target: "node10",
  outfile: "dist/esm/index.js",
});

await esbuild.build({
  entryPoints: ["src/browser.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "browser",
  target: "es6",
  outfile: "dist/cjs/index.js",
});
