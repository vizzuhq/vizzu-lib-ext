import * as fs from 'fs'
import { DataParser } from './dataParser'
import { Options } from 'csv-parse/.'

interface DataType {
	series: {
		name: string
		values: string[] | number[]
	}[]
}

export class CSVParser extends DataParser {
	public async parse(input: string, options: Options = {}): Promise<DataType | null> {
		if (!input) return null

		if (options) {
			this.parserOptions = { ...this.parserOptions, ...options }
		} else {
			this.parserOptions = {
				delimiter: ',',
				encoding: 'utf-8'
			}
		}

		if (!input.startsWith('http') && input.endsWith('.csv')) {
			const fileContent = this.readCSVFile(input)
			await this.setSource(fileContent)
			return this.data
		}
		await this.setSource(input)
		return this.convertNumbers(this.data)
	}
	public readCSVFile(fileName: string): string {
		if (!fileName) {
			return ''
		}
		return fs.readFileSync(fileName, 'utf-8')
	}
}

export default CSVParser
