import { EslintTypeScriptConfig } from '@vizzu/eslint-config'

export default [
	...EslintTypeScriptConfig,
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2022,
				project: './tsconfig.eslint.json',
				projectService: false
			}
		}
	},
	{
		ignores: [
			'**/node_modules/**',
			'**/build/**',
			'**/dist/**',
			'**/.vscode/**',
			'**/.yarn/**',
			'**/tmp/**',
			'**/demo/**',
			'**/tests/**',
			'**/.pnp*',
			'**/*.d.ts'
		]
	}
]
