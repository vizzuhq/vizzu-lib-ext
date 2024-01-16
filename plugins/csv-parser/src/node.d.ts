import { DataParser } from './dataParser'
import { Options } from 'csv-parse/.'
interface dataType {
	series: {
		name: string
		values: string[] | number[]
	}[]
}
export declare class CSVParser extends DataParser {
	parse(input: string, options?: Options): Promise<dataType | null>
	readCSVFile(fileName: string): string
}
export default CSVParser
