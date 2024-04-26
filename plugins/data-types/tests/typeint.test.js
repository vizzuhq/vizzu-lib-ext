import { expect, test, describe } from 'vitest'
import fs from 'fs'

import { DataTypes } from '../src'
import { CSVParser } from './assets/csvparser'
import { testCases } from './assets/testFiles'

describe('type check', () => {
	const parser = new CSVParser()
	const files = testCases()
	const dataTypes = new DataTypes()
	const dataTypesNoUnit = new DataTypes({ options: { unitDiscovery: false } })

	test.each(files)('$description from $file', async ({ file, description, series }) => {
		const data = await parser.parse(fs.readFileSync(file, { encoding: 'utf-8' }))

		const dataSeries = JSON.parse(JSON.stringify(data.series))
		const dataSeriesNoUnit = JSON.parse(JSON.stringify(data.series))

		dataTypes.checkTypes(dataSeries)
		dataTypesNoUnit.checkTypes(dataSeriesNoUnit)

		series.forEach(({ name, type, meta, unit }) => {
			const item = dataSeries.find((item) => item.name === name)
			expect(item.unit).toBe(unit)
			expect(item.meta).toEqual(meta)
			expect(item.type).toBe(type)

			const itemNoUnit = dataSeriesNoUnit.find((item) => item.name === name)
			expect(itemNoUnit.unit).toBe(undefined)
			expect(itemNoUnit.type).toBe(unit ? 'dimension' : type)
		})
	})
})
