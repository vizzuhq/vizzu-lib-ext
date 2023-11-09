import { Options, parse } from 'csv-parse/sync'
import { headerDetect } from './headerDetect'
import { delimiterDetect } from './delimiterDetect'

import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js';
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks, PrepareAnimationContext } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'

export interface optionsTypes {
	delimiter?: string
	encoding?: BufferEncoding
	headers?: boolean
	autoheader?: boolean
	emptyColumnPrefix?: string
	hasHeader?: boolean
}
export interface csvTypes {
	url?: string
	content?: string
	options?: optionsTypes
}

export interface csvTarget {
	target: {
		data: {
			csv: csvTypes
		}
	}
}

export interface csvDataType extends Data.Filter {
	csv: csvTypes
}

export interface Target {
    data?: Data.Set | csvDataType;
    config?: Config.Chart;
    style?: Styles.Chart | null;
}
export interface Keyframe {
    target: Target | CC.Snapshot;
    options?: Options;
}
export type Keyframes = Keyframe[];
export type AnimTarget = Keyframes | CA.CAnimation;

declare module 'vizzu' {
	export interface Vizzu {
		animate(target: AnimTarget, options?: Anim.ControlOptions): AnimCompleting
	}
}
export interface dataSeries {
	name: string
	values: number[] | string[]
}
export interface dataType {
	series: dataSeries[]
}

export class DataParser implements Plugin {
	private _data: dataType | null = null
	private _headers: string[] | null = null
	private _autoheader = true
	private _isHeader = true
	private _hasHeader = false
	private _emptyColumnPrefix = 'Column'
	private _probabilityVariable = 0.5

	public parserOptions: Options = {
		encoding: 'utf-8'
	}

	meta = {
		name: 'csvParser'
	}

	get hasHeader(): boolean {
		return this._isHeader
	}

	get data(): dataType | null {
		return this._data
	}

	get delimiter(): string {
		return this.parserOptions.delimiter?.toString() || ','
	}

	get api() {
		return {
			hasHeader: this.hasHeader,
			delimiter: this.delimiter,
			data: this.data
		}
	}

	get hooks(): PluginHooks {
		this._headers = null
		this._autoheader = true
		this._isHeader = true
		this._hasHeader = false
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

						const csvOptions: csvTypes = target.data.csv
						if (!('url' in csvOptions) && !('content' in csvOptions)) continue

						if ('options' in csvOptions && csvOptions.options) {
							this._setOptions(csvOptions.options)
						}
						try {
							const data = await this.parse(csvOptions.url || csvOptions.content || '')
							if (!data || !('series' in data) || !data.series) {
								throw new Error('Invalid data')
							}

							if (!this._isHeader && !this._autoheader) {
								throw new Error('CSV file has no header')
							}
							target.data = data
						}
						catch (error: unknown) {
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

	private _setOptions(options: optionsTypes) {
		if ('delimiter' in options && options.delimiter) {
			this.parserOptions.delimiter = options.delimiter
		}

		if ('encoding' in options && options.encoding) {
			this.parserOptions.encoding = options.encoding
		}

		if ('hasHeader' in options && options.hasHeader) {
			this._hasHeader = options.hasHeader
			this._isHeader = true
		}

		if ('headers' in options && options.headers && Array.isArray(options.headers)) {
			this._headers = options.headers
		}

		if ('autoheader' in options && options.autoheader) {
			this._autoheader = options.autoheader
		}
		if ('emptyColumnPrefix' in options && options.emptyColumnPrefix) {
			this._emptyColumnPrefix = options.emptyColumnPrefix
		}
	}

	public convertNumbers(data: dataType): dataType {
		if (!data || !('series' in data) || !data.series) return data

		data.series = data.series.map(
			(item: {
				name: string
				values: number[] | string[]
			}): { name: string; values: string[] | number[] } => {
				if (
					'values' in item &&
					item.values &&
					item.values.every((value: string | number) => !isNaN(Number(value)))
				) {
					item.values = item.values.map((value: string | number) => Number(value))
				}
				return item
			}
		)
		return data
	}

	public async parse(input: string, options: Options = {}, convert = true): Promise<dataType | null> {
		if (!input) return null

		if (options) {
			this.parserOptions = { ...this.parserOptions, ...options }
		}
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

		this._isHeader = true
		if (!this._hasHeader && !Array.isArray(this._headers)) {
			const headerProbability = headerDetect(source, delimiter)
			if (headerProbability < this._probabilityVariable) {
				console.error('CSV file has no header', headerProbability)
				this._isHeader = false
			}
		}
		try {
			const parsedInput = parse(source, {
				skip_empty_lines: true,
				comment: '#',
				relax_column_count: true,
				skip_records_with_error: true,
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
		return this.parserOptions.delimiter?.toString() || delimiterDetect(data)
	}

	private _buildData(records: string[][]): dataType | null {
		if (records.length === 0) {
			return null
		}
		const header: string[] = Array.isArray(this._headers) ? this._headers : this._getHeader(records)
		const series = []
		for (let column = 0; column < records[0].length; column++) {
			const headerName =
				header[column] && header[column].length > 0 ? header[column] : this._emptyColumnPrefix + (column + 1)

			series.push({
				name: headerName.trim(),
				values: records.map((record) => record[column] || '')
			})
		}
		return { series: series }
	}

	private _getHeader(records: string[][]): string[] {
		let headerResponse: string[] = []
		if (this._isHeader && records.length > 0 && records[0].length > 0) {
			headerResponse = records.shift() ?? []
			if (headerResponse.length > 0) {
				return headerResponse.map((item, key: number) =>
					item.length === 0 ? this._emptyColumnPrefix + (key + 1) : item
				)
			}
		}

		return Object.keys(records[0]).map((key) => this._emptyColumnPrefix + (parseInt(key) + 1))
	}
}
