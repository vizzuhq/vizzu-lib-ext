import * as esbuild from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
  format: "esm",
  outfile: "dist/mjs/index.js",
  plugins: [
    polyfillNode(
			{
        globals: {
            process: true,
            Buffer: true,
        }
      }),
  ]
});

await esbuild.build({
  entryPoints: ["src/browser.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "browser",
  target: "es6",
  format: "cjs",
  plugins: [
    polyfillNode(
			{
        globals: {
            process: true,
            Buffer: true,
        }
      }),
  ],
  outfile: "dist/cjs/index.js",
});