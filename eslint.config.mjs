import { EslintTypeScriptConfig } from '@vizzu/eslint-config'

export default [
	...EslintTypeScriptConfig,
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
			'**/.pnp*'
		]
	}
]
