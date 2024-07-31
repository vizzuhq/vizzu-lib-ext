import { Options, parse } from 'csv-parse/sync'
import { headerDetect } from './headerDetect'
import { delimiterDetect } from './delimiterDetect'

import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks, PrepareAnimationContext } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'

export interface OptionsTypes {
	delimiter?: string
	encoding?: BufferEncoding
	headers?: boolean
	autoheader?: boolean
	emptyColumnPrefix?: string
	hasHeader?: boolean | null
}

export interface DetectedTypes {
	delimiter: string
	probability: number
	headers: string[]
	hasHeader: boolean
}
export interface CSVTypes {
	url?: string
	content?: string
	options?: OptionsTypes
}

export interface CSVTarget {
	target: {
		data: {
			csv: CSVTypes
		}
	}
}

export interface CSVDataType extends Data.Filter {
	csv: CSVTypes
}

export interface Target {
	data?: Data.Set | CSVDataType
	config?: Config.Chart
	style?: Styles.Chart | null
}
export interface Keyframe {
	target: Target | CC.Snapshot
	options?: Options
}
export type Keyframes = Keyframe[]
export type AnimTarget = Keyframes | CA.CAnimation

declare module 'vizzu' {
	export interface Vizzu {
		animate(target: AnimTarget, options?: Anim.ControlOptions): AnimCompleting
	}
}
export interface DataSeries {
	name: string
	values: (number | null | string)[]
}
export interface DataType {
	series: DataSeries[]
}

export interface ConstructorParams {
	options?: OptionsTypes
}

const LOG_PREFIX = [
	'%cVIZZU%CSV-PARSER%c',
	'background: #e2ae30; color: #3a60bf; font-weight: bold',
	'background: #3a60bf; color: #e2ae30;'
]

export class DataParser implements Plugin {
	private _data: DataType | null = null
	private _headers: string[] | null = null
	private _autoheader = true
	private _hasHeader: boolean | null = null
	private _emptyColumnPrefix = 'Column'
	private _probabilityVariable = 0.5
	private _debug = false

	public detected: DetectedTypes = {
		delimiter: ',',
		probability: 1,
		headers: [],
		hasHeader: true
	}

	public parserOptions: Options = {
		encoding: 'utf-8'
	}

	meta = {
		name: 'csvParser',
		version: '0.12.0',
		depends: []
	}

	constructor(params: ConstructorParams = {}) {
		if (params?.options) {
			this.parserOptions = { ...this.parserOptions, ...params.options }
		}
	}

	get hasHeader(): boolean | null {
		return this._hasHeader === null ? this.detected.hasHeader : this._hasHeader
	}

	get data(): DataType | null {
		return this._data
	}

	get delimiter(): string {
		return this.parserOptions.delimiter?.toString() || this.detected.delimiter
	}

	get detectedDelimiter(): string {
		return this.detected.delimiter
	}

	get api() {
		return {
			hasHeader: this.detected.hasHeader,
			detectedDelimiter: this.detected.delimiter,
			delimiter: this.delimiter,
			data: this.data
		}
	}

	get hooks(): PluginHooks {
		this._headers = null
		this._autoheader = true
		this._hasHeader = null
		this._emptyColumnPrefix = 'Column'
		this.parserOptions = {
			encoding: 'utf-8'
		}

		return {
			prepareAnimation: Object.assign(
				async (ctx: PrepareAnimationContext, next: () => void) => {
					if (!Array.isArray(ctx.target)) {
						next()
						return
					}

					for (const { target } of ctx.target) {
						if (!target || !('data' in target) || !target.data) continue

						if (!('csv' in target.data) || !target.data.csv) continue

						const csvOptions: CSVTypes = target.data.csv
						if (!('url' in csvOptions) && !('content' in csvOptions)) continue

						if ('options' in csvOptions && csvOptions.options) {
							this._setOptions(csvOptions.options)
						}
						try {
							const data = await this.parse(
								csvOptions.url || csvOptions.content || ''
							)
							if (!data || !('series' in data) || !data.series) {
								throw new Error('Invalid data')
							}

							if (this._hasHeader === true && !this._autoheader) {
								throw new Error('CSV file has no header')
							}
							target.data = data
						} catch (error: unknown) {
							if (error instanceof Error) {
								console.error(error.message)
							}
							continue
						}
					}
					next()
				},
				{ priority: 0.999 }
			)
		}
	}

	private _setOptions(options: OptionsTypes) {
		if ('delimiter' in options && options.delimiter) {
			this.parserOptions.delimiter = options.delimiter
		}

		if ('encoding' in options && options.encoding) {
			this.parserOptions.encoding = options.encoding
		}

		if ('hasHeader' in options && typeof options.hasHeader === 'boolean') {
			this._log(['hasHeader', options.hasHeader])
			this._hasHeader = options.hasHeader
		} else {
			this._hasHeader = null
		}

		if ('headers' in options && options.headers && Array.isArray(options.headers)) {
			this._headers = options.headers
		}

		if ('autoheader' in options && typeof options.autoheader === 'boolean') {
			this._autoheader = options.autoheader
		}
		if ('emptyColumnPrefix' in options && options.emptyColumnPrefix) {
			this._log(['emptyColumnPrefix', options.emptyColumnPrefix])
			this._emptyColumnPrefix = options.emptyColumnPrefix
		}
	}

	public convertNumbers(data: DataType): DataType {
		if (!data || !('series' in data) || !data.series) return data

		data.series = data.series.map(
			(item: {
				name: string
				values: (number | null | string)[]
			}): { name: string; values: (number | null | string)[] } => {
				if (
					'values' in item &&
					item.values &&
					item.values.every((value: string | number | null) => !isNaN(Number(value))) &&
					item.values.find((value: string | number | null) => value !== '')
				) {
					item.values = item.values.map((value: string | number | null) =>
						typeof value === 'string' && value === '' ? null : Number(value)
					)
				}
				return item
			}
		)
		return data
	}

	public async parse(
		input: string,
		options: OptionsTypes = {},
		convert = true
	): Promise<DataType | null> {
		if (!input) return null

		if (options) {
			this.parserOptions = { ...this.parserOptions, ...options }
			this._setOptions(options)
		}
		this._log(['parserOptions', this.parserOptions])
		await this.setSource(input)

		if (!this.data) return null

		if (!convert) return this.data

		return this.convertNumbers(this.data)
	}

	public async setSource(source: string) {
		if (source.startsWith('http')) {
			source = await this.fetchData(source)
		}

		const delimiter = this.getDelimiter(source)
		this.parserOptions.delimiter = delimiter

		const headerProbability = headerDetect(source, delimiter)
		this._log(['headerProbability', headerProbability])
		if (headerProbability < this._probabilityVariable) {
			this.detected.hasHeader = false
		} else {
			this.detected.hasHeader = true
		}
		try {
			this._log(['parser options', this.parserOptions])
			const parsedInput = parse(source, {
				skip_empty_lines: true,
				relax_column_count: true,
				skip_records_with_error: true,
				skip_records_with_empty_values: true,
				...this.parserOptions
			})
			this._data = this._buildData(parsedInput)
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message)
			}
			this._data = null
			return
		}
	}

	public async fetchData(url: string): Promise<string> {
		const response = await fetch(url)
		if (!response.ok) {
			console.error(`Error fetching data from ${url}`)
			return ''
		}
		return await response.text()
	}

	public getDelimiter(data: string): string {
		this.detected.delimiter = delimiterDetect(data)
		this._log(['detected delimiter:', this.detected.delimiter])
		return this.parserOptions.delimiter?.toString() || this.detected.delimiter
	}

	private _buildData(records: string[][]): DataType | null {
		if (records.length === 0) {
			return null
		}
		this.detected.headers = this._getHeader(records)
		const header: string[] = Array.isArray(this._headers)
			? this._headers
			: this.detected.headers
		this._log(['header', header])
		const series = []
		for (let column = 0; column < records[0].length; column++) {
			const headerName =
				header[column] && header[column].length > 0
					? header[column]
					: this._emptyColumnPrefix + (column + 1)

			series.push({
				name: headerName.trim(),
				values: records.map((record) => record[column].trim() || '')
			})
		}
		return { series: series }
	}

	private _getHeader(records: string[][]): string[] {
		let headerResponse: string[] = []
		if (this.hasHeader || (this.hasHeader === null && this.detected.hasHeader === true)) {
			if (records.length > 0 && records[0].length > 0) {
				headerResponse = records.shift() ?? []
				if (headerResponse.length > 0) {
					return headerResponse.map((item, key: number) =>
						item.length === 0 ? this._emptyColumnPrefix + (key + 1) : item
					)
				}
			}
		}

		return Object.keys(records[0]).map((key) => this._emptyColumnPrefix + (parseInt(key) + 1))
	}

	private _log(...message: unknown[]) {
		if (this._debug) {
			console.log(...LOG_PREFIX, ...message)
		}
	}
}
