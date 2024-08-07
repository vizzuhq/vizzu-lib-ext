import * as esbuild from 'esbuild'
import { polyfillNode } from 'esbuild-plugin-polyfill-node'
import { copy } from 'esbuild-plugin-copy'

await esbuild.build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	minify: true,
	sourcemap: true,
	platform: 'node',
	format: 'esm',
	plugins: [
		polyfillNode({
			globals: {
				stream: true,
				navigator: false,
				process: false
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
	sourcemap: true,
	platform: 'browser',
	target: 'es6',
	format: 'cjs',
	plugins: [
		polyfillNode({
			globals: {
				stream: true,
				navigator: false,
				process: false
			}
		})
	],
	outfile: 'dist/cjs/index.js'
})
