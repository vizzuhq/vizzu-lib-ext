import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'
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
	interface Vizzu {
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
export declare class ExcelReader implements Plugin {
	private _data
	private _headers
	private _headerRow
	private _sheetNames
	private _selectedSheet
	private _debug
	private _fileType
	detected: DetectedTypes
	meta: {
		name: string
		version: string
		depends: string[]
	}
	constructor(params?: ConstructorParams)
	get headerRow(): number
	get data(): DataType | null
	get sheetNames(): string[]
	get selectedSheet(): string
	get api(): {
		headerRow: number
		sheetNames: string[]
		selectedSheet: string
		data: DataType
	}
	get hooks(): PluginHooks
	private _setOptions
	convertNumbers(data: DataType): DataType
	readContent(input: File, options?: OptionsTypes, convert?: boolean): DataType | null
	setSource(source: File): void
	private _isObjectArray
	private _buildData
	private _log
}
