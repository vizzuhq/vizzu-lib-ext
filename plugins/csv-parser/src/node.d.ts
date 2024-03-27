import { DataParser } from './dataParser'
import { Options } from 'csv-parse/.'
interface DataType {
	series: {
		name: string
		values: string[] | number[]
	}[]
}
export declare class CSVParser extends DataParser {
	parse(input: string, options?: Options): Promise<DataType | null>
	readCSVFile(fileName: string): string
}
export default CSVParser
