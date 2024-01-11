import { expect, test, describe } from 'vitest'
import { CSVParser } from '../src'

describe('init', () => {
	const csvParser = new CSVParser()
	test('csv parser initialized', () => {
		expect(typeof csvParser).toBe('object')
		const functionKeys = Object.keys(csvParser)
		const defultKeys = [
			'_headers',
			'_autoheader',
			'_hasHeader',
			'_emptyColumnPrefix',
			'_probabilityVariable',
			'_debug',
			'detected',
			'parserOptions',
			'meta'
		]

		expect(functionKeys).toEqual(expect.arrayContaining(defultKeys))
	})
})
