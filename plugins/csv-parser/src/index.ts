import fs from 'fs'
import { DataParser } from './dataParser'
import { Options } from 'csv-parse/.'

interface dataType {
  series: {
    name: string
    values: any[]
  }[]
}

export class CSVParser extends DataParser {
  public async parse(input: string, options: Options = {}): Promise<dataType | null> {
    if (!input) return null

    if (options) {
      this._paserOptions = { ...this._paserOptions, ...options }
    } else {
      this._paserOptions = {
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
    return this.data
  }
  public readCSVFile(fileName: string): string {
    if (!fileName) {
      return ''
    }
    return fs.readFileSync(fileName, 'utf-8')
  }
}
