import { expect, test, describe } from 'vitest'
import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'
import { parse } from 'csv-parse/sync'
import { globSync } from 'glob'
import { ExcelReader } from '../src'
import { generatedCases } from './assets/generated'

const mergedWB = XLSX.utils.book_new()
globSync(__dirname + '/assets/fixtures/**/**.csv').forEach((file) => {
	const fileName = path.parse(file).name
	let destination = path.join(__dirname, `/assets/fixtures/excel/${fileName}.xlsx`)

	if (fs.existsSync(destination)) fs.unlinkSync(destination)

	var workbook = XLSX.utils.book_new()

	const jsa = parse(fs.readFileSync(file))
	var worksheet = XLSX.utils.aoa_to_sheet(jsa)
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
	XLSX.utils.book_append_sheet(mergedWB, worksheet, fileName)
	XLSX.writeFile(workbook, destination)
})
XLSX.writeFile(mergedWB, path.join(__dirname, `/assets/fixtures/excel/merged.xlsx`))

describe('generated excel read', () => {
	test.each(generatedCases())(
		'test file: $fileName',
		({ fileName, expected, detected, sheet = 0 }) => {
			const excelReader = new ExcelReader()
			const response = excelReader.readContent(
				`${__dirname}/assets/fixtures/excel/${fileName}`,
				{
					fileType: 'file',
					sheet: sheet
				}
			)

			expect(detected).toEqual(excelReader.detected)
			expect(response).toEqual(expected)
		}
	)
})
