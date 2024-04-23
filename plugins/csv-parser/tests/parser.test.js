import { expect, test, describe } from 'vitest'
import { CSVParser } from '../src/node'

import { CSVParser as BrowserParser } from '../src/index'
import { filesCustomCharset, filesCustomSeparator, filesWithHeaders } from './assets/testFiles'

const parser = new CSVParser()
describe('csv read', () => {
	test('reads empty file', () => {
		const source = ''
		const sourceContent = parser.readCSVFile(source)
		expect(sourceContent).toEqual('')
	})
	test('reads file', () => {
		const source = './tests/fixtures/headers/music.csv'
		const sourceContent = parser.readCSVFile(source)
		expect(sourceContent).not.toEqual('')
		const lines = sourceContent.split('\n')
		expect(lines[0]).toEqual('Genres,Kinds,Popularity')
		expect(lines.at(-1)).toEqual('Metal,Experimental,58')
	})
})

describe('parser', () => {
	const parserNames = ['CSVParser', 'BrowserParser']
	;[CSVParser, BrowserParser].forEach((parserInstance, key) => {
		describe(parserNames[key], () => {
			const parser = new parserInstance()
			test('does not add data on empty input', async () => {
				const data = await parser.parse('')
				expect(data).toBeNull()
			})

			describe('manual data', () => {
				const exceptedData = [
					{ name: 'a', values: [1] },
					{ name: 'b', values: [2] },
					{ name: 'c', values: [3] },
					{ name: 'd', values: [4] }
				]

				test('loads data to records', async () => {
					const data = await parser.parse('"a","b","c","d"\n"1","2","3","4"')
					expect(typeof parser.error).toBe('undefined')
					expect('series' in data).toBe(true)
					expect(data.series.length).toEqual(4)
					expect(data.series).toEqual(exceptedData)
				})
				test('load data with custom (;) separator', async () => {
					const data = await parser.parse('"a";"b";"c";"d"\n"1";"2";"3";"4"', {
						delimiter: ';'
					})
					expect(typeof parser.error).toBe('undefined')
					expect('series' in data).toBe(true)
					expect(data.series.length).toEqual(4)
					expect(data.series).toEqual(exceptedData)
				})
			})
		})
	})
})
describe('parser load data from files', () => {
	describe('csv files', () => {
		const testFiles = filesWithHeaders()
		test.each(testFiles)('small source ($input)', async ({ input }) => {
			const data = await parser.parse(input)
			expect(typeof parser.error).toBe('undefined')
			expect('series' in data).toBe(true)
			expect(data.series.length).toBeGreaterThanOrEqual(1)
		})
	})
	describe('csv files with custom separator', () => {
		const testFiles = filesCustomSeparator()
		test.each(testFiles)('small source ($input)', async ({ input, separator, excepted }) => {
			const data = await parser.parse(input, { delimiter: separator })
			expect(typeof parser.error).toBe('undefined')
			expect('series' in data).toBe(true)
			expect(data.series.length).toBeGreaterThanOrEqual(1)

			const parsedColumns = data.series.map((s) => s.name)
			expect(parsedColumns).toEqual(excepted.columns)

			data.series.map((s, i) => {
				expect(s.values).toEqual(excepted.values[i])
			})
		})
	})
	describe('csv files with custom charset', () => {
		const testFiles = filesCustomCharset()
		test.each(testFiles)('small source ($input)', async ({ input, charset, excepted }) => {
			const data = await parser.parse(input, { encoding: charset, delimiter: ',' })
			expect(typeof parser.error).toBe('undefined')
			expect('series' in data).toBe(true)
			expect(data.series.length).toEqual(excepted.length)
		})
	})

	test('reads file with empty data rows', async () => {
		const source = './tests/fixtures/headers/music-with-empty-lines.csv'
		const sourceContent = parser.readCSVFile(source)
		const data = await parser.parse(sourceContent)
		expect(data.series.length).toEqual(3)
	})

	test('load data from url', async () => {
		const url =
			'https://raw.githubusercontent.com/vizzuhq/vizzu-lib-doc/gh-pages/0.3.0/content/howtos/csv-input/population_total_long.csv'
		const data = await parser.parse(url, { delimiter: ',' })
		expect(data.series.length).toEqual(3)
		expect(data.series[0].name).toEqual('Country Name')
		expect(data.series[0].values.length).toEqual(12595)
	})
})
