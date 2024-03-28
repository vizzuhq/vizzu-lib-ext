import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks, PrepareAnimationContext } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'
import * as XLSX from 'xlsx'

export type FileTypes = 'binary' | 'base64' | 'array' | 'string' | 'buffer' | 'file'
export interface OptionsTypes {
	headers?: boolean
	headerRow?: number
	sheet?: string | number
	fileType?: FileTypes
}

export interface DetectedTypes {
	headers: string[]
	sheetNames: string[]
	selectedSheet: string
	headerRow: number
}
export interface ExcelTypes {
	content?: File
	options?: OptionsTypes
}

export interface ExcelTarget {
	target: {
		data: {
			excel: ExcelTypes
		}
	}
}

export interface ExcelDataType extends Data.Filter {
	excel: ExcelTypes
}

export interface Target {
	data?: Data.Set | ExcelDataType
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
export interface DataSeries {
	name: string
	values: number[] | string[]
}
export interface DataType {
	series: DataSeries[]
}

export interface ConstructorParams {
	options?: OptionsTypes
}

const LOG_PREFIX = [
	'%cVIZZU%EXCEL-READER%c',
	'background: #e2ae30; color: #3a60bf; font-weight: bold',
	'background: #3a60bf; color: #e2ae30;'
]

export class ExcelReader implements Plugin {
	private _data: DataType | null = null
	private _headers: string[] | null = null
	private _headerRow = 1
	private _sheetNames: string[] = []
	private _selectedSheet = 0
	private _debug = false
	private _fileType: FileTypes = 'binary'

	public detected: DetectedTypes = {
		headers: [],
		sheetNames: [],
		selectedSheet: '',
		headerRow: 1
	}
	meta = {
		name: 'excelReader',
		version: '0.10.1',
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

	get data(): DataType | null {
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

						const excelOptions: ExcelTypes = target.data.excel
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

	private _setOptions(options: OptionsTypes) {
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
		if ('sheet' in options && !isNaN(Number(options.sheet))) {
			this._selectedSheet = Number(options.sheet) || 0
		}
		if ('fileType' in options && options.fileType) {
			this._fileType = options.fileType
		}
	}

	public convertNumbers(data: DataType): DataType {
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

	public readContent(input: File, options: OptionsTypes = {}, convert = true): DataType | null {
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
				type: this._fileType
			})

			this._sheetNames = workbook.SheetNames ?? []

			if (this._sheetNames.length === 0) {
				this._data = null
				console.error('No sheets found')
				return
			}
			this.detected.selectedSheet = this._sheetNames[this._selectedSheet]
			this.detected.sheetNames = this._sheetNames

			const parsedInput = XLSX.utils.sheet_to_json(
				workbook.Sheets[this.detected.selectedSheet]
			)
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

	private _buildData(records: unknown[]): DataType | null {
		if (!this._isObjectArray(records)) {
			return null
		}
		const header: string[] = Array.isArray(this._headers)
			? this._headers
			: Object.keys(records[0])
		this._log(['header', header])

		const series = header.map(
			(headerName): DataSeries => ({
				name: headerName.trim(),
				values: []
			})
		)

		for (let row = 0; row < records.length; row++) {
			const values = Object.values(records[row])
			for (let key = 0; key < values.length; key++) {
				const value = values[key]
				if (typeof value === 'number' && typeof value === 'number') {
					;(series[key].values as number[]).push(value)
				} else {
					;(series[key].values as string[]).push(value)
				}
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
