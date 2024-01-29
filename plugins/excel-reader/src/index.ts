import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks, PrepareAnimationContext } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'
import * as XLSX from 'xlsx'

export interface optionsTypes {
	headers?: boolean
	headerRow?: number
	sheet?: string | number
}

export interface detectedTypes {
	probability: number
	headers: string[]
	sheetNames: string[]
	selectedSheet: string
	headerRow: number
}
export interface excelTypes {
	content?: File
	options?: optionsTypes
}

export interface excelTarget {
	target: {
		data: {
			excel: excelTypes
		}
	}
}

export interface excelDataType extends Data.Filter {
	excel: excelTypes
}

export interface Target {
	data?: Data.Set | excelDataType
	config?: Config.Chart
	style?: Styles.Chart | null
}
export interface Keyframe {
	target: Target | CC.Snapshot
}
export type Keyframes = Keyframe[]
export type AnimTarget = Keyframes | CA.CAnimation

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

export interface ConstructorParams {
	options?: optionsTypes
}

const LOG_PREFIX = [
	'%cVIZZU%EXCLE-READER%c',
	'background: #e2ae30; color: #3a60bf; font-weight: bold',
	'background: #3a60bf; color: #e2ae30;'
]

export class ExcelReader implements Plugin {
	private _data: dataType | null = null
	private _headers: string[] | null = null
	private _headerRow = 1
	private _sheetNames: string[] = []
	private _selectedSheet = 0
	private _debug = false

	public detected: detectedTypes = {
		probability: 1,
		headers: [],
		sheetNames: [],
		selectedSheet: '',
		headerRow: 1
	}
	meta = {
		name: 'excelReader',
		version: '0.9.3',
		depends: []
	}

	constructor(params: ConstructorParams = {}) {
		if (params.options) {
			this._setOptions(params.options)
		}
	}

	get headerRow(): number {
		return this._headerRow === null ? this.detected.headerRow : this._headerRow
	}

	get data(): dataType | null {
		return this._data
	}

	get sheetNames(): string[] {
		return this._sheetNames
	}

	get selectedSheet(): string {
		return this.detected.selectedSheet
	}

	get api() {
		return {
			headerRow: this.detected.headerRow,
			sheetNames: this.detected.sheetNames,
			selectedSheet: this.detected.selectedSheet,
			data: this.data
		}
	}

	get hooks(): PluginHooks {
		this._headers = null
		this._headerRow = 1
		this._selectedSheet = 0
		this._sheetNames = []

		return {
			prepareAnimation: Object.assign(
				async (ctx: PrepareAnimationContext, next: () => void) => {
					if (!ctx.target || !Array.isArray(ctx.target)) {
						next()
						return
					}

					for (const { target } of ctx.target) {
						if (!target || !('data' in target) || !target.data) continue

						if (!('excel' in target.data) || !target.data.excel) continue

						const excelOptions: excelTypes = target.data.excel
						if (!('content' in excelOptions)) continue

						if ('options' in excelOptions && excelOptions.options) {
							this._setOptions(excelOptions.options)
						}
						try {
							if (!excelOptions.content) {
								throw new Error('Invalid content')
							}
							const data = this.readContent(excelOptions.content)
							if (!data || !('series' in data) || !data.series) {
								throw new Error('Invalid data')
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

	private _setOptions(options: optionsTypes) {
		if (
			'headerRow' in options &&
			typeof options.headerRow === 'number' &&
			options.headerRow > 0
		) {
			this._log(['headerRow', options.headerRow])
			this._headerRow = options.headerRow
		} else {
			this._headerRow = 1
		}

		if ('headers' in options && options.headers && Array.isArray(options.headers)) {
			this._headers = options.headers
		}
		if (
			'selectedSheet' in options &&
			options.selectedSheet &&
			typeof options.selectedSheet === 'number' &&
			Number(options.selectedSheet) >= 0
		) {
			this._selectedSheet = Number(options.selectedSheet)
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
				} else {
					item.values = item.values.map((value: string | number) => String(value))
				}
				return item
			}
		)
		return data
	}

	public readContent(input: File, options: optionsTypes = {}, convert = true): dataType | null {
		if (!input) return null

		if (options) {
			this._setOptions(options)
		}
		this.setSource(input)

		if (!this.data) return null

		if (!convert) return this.data

		return this.convertNumbers(this.data)
	}

	public setSource(source: File) {
		try {
			const workbook = XLSX.read(source, {
				type: 'binary'
			})

			this._sheetNames = workbook.SheetNames ?? []

			if (this._sheetNames.length === 0) {
				this._data = null
				console.error('No sheets found')
				return
			}

			this.detected.selectedSheet = this._sheetNames[this._selectedSheet]
			this.detected.sheetNames = this._sheetNames

			const parsedInput = XLSX.utils.sheet_to_json(workbook.Sheets[this._selectedSheet])
			this._data = this._buildData(parsedInput)
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message)
			}
			this._data = null
			return
		}
	}

	private _isObjectArray(value: unknown): value is object[] {
		return (
			Array.isArray(value) &&
			value.length > 0 &&
			value.every((item) => typeof item === 'object' && item !== null)
		)
	}

	private _buildData(records: unknown[]): dataType | null {
		if (!this._isObjectArray(records)) {
			return null
		}
		//this.detected.headers = this._getHeader(records)
		const header: string[] = Array.isArray(this._headers)
			? this._headers
			: Object.keys(records[0])
		this._log(['header', header])

		const series = header.map(
			(headerName): dataSeries => ({
				name: headerName.trim(),
				values: []
			})
		)

		for (let row = 0; row < records.length; row++) {
			const values = Object.values(records[row])
			for (const key in values) {
				const value: string | number = values[key]
				series[key].values.push(value)
			}
		}
		return { series: series }
	}

	private _log(...message: unknown[]) {
		if (this._debug) {
			console.log(...LOG_PREFIX, ...message)
		}
	}
}
