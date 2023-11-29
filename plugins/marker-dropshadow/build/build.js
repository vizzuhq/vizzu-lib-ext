import * as esbuild from 'esbuild'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'
import { copy } from 'esbuild-plugin-copy'

await esbuild.build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	sourcemap: false,
	platform: 'node',
	format: 'esm',
	plugins: [
		polyfillNode({
			globals: {
				process: true,
				Buffer: true
			}
		}),
		copy({
			resolveFrom: 'cwd',
			assets: {
				from: ['./src/*.d.ts'],
				to: ['./dist/types']
			},
			watch: true
		})
	],
	outfile: 'dist/mjs/index.js'
})

await esbuild.build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	sourcemap: false,
	platform: 'browser',
	target: 'es6',
	format: 'cjs',
	plugins: [
		polyfillNode({
			globals: {
				process: true,
				Buffer: true
			}
		})
	],
	outfile: 'dist/cjs/index.js'
})
