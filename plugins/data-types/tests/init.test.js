import fs from 'fs'
import { expect, test, describe } from 'vitest'

import { CSVParser } from './assets/csvparser'
import { DataTypes } from '../src'

describe('init', () => {
	const parser = new CSVParser()
	test('praser initialized', () => {
		expect(typeof parser).toBe('object')
	})
	const dataTypes = new DataTypes()
	test('dataTypes initialized', () => {
		expect(typeof dataTypes).toBe('object')

		const functionKeys = Object.keys(dataTypes)
		const defultKeys = ['meta', '_types', 'checkTypes', '_notTyped', '_addType', '_mainTypes']

		expect(functionKeys).toEqual(expect.arrayContaining(defultKeys))
	})

	test('check parser is correct', async () => {
		const source = './tests/fixtures/music.csv'
		const data = await parser.parse(fs.readFileSync(source, { encoding: 'utf-8' }))
		expect(typeof parser.error).toBe('undefined')
		expect('series' in data).toBe(true)
		expect(data.series.length).toBeGreaterThanOrEqual(1)
	})
})
