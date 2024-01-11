import { expect, test, describe } from 'vitest'
import fs from 'fs'

import { DataTypes } from '../src'
import { CSVParser } from './assets/csvparser'
import { testCases } from './assets/testFiles'

describe('type check', () => {
	const parser = new CSVParser()
	const dataTypes = new DataTypes()

	const files = testCases()
	test.each(files)('$description from $file', async ({ file, description, series }) => {
		const data = await parser.parse(fs.readFileSync(file, { encoding: 'utf-8' }))
		dataTypes.checkTypes(data.series)
		series.forEach(({ name, type, meta }) => {
			const item = data.series.find((item) => item.name === name)
			expect(item.type).toBe(type)
			expect(item.meta).toEqual(meta)
		})
	})
})
