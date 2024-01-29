import { expect, test, describe } from 'vitest'
import { ExcelReader } from '../src'

describe('init', () => {
	const excelReader = new ExcelReader()
	test('Excel reader initialized', () => {
		expect(typeof excelReader).toBe('object')
		const functionKeys = Object.keys(excelReader)
		const defultKeys = [
			'_data',
			'_headers',
			'_debug',
			'_headerRow',
			'_sheetNames',
			'_selectedSheet',
			'detected',
			'meta'
		]

		expect(functionKeys).toEqual(expect.arrayContaining(defultKeys))
	})
})
