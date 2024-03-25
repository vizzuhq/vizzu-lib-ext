import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'
export type FileTypes = 'binary' | 'base64' | 'array' | 'string' | 'buffer' | 'file'
export interface optionsTypes {
	headers?: boolean
	headerRow?: number
	sheet?: string | number
	fileType?: FileTypes
}
export interface detectedTypes {
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
	interface Vizzu {
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
export declare class ExcelReader implements Plugin {
	private _data
	private _headers
	private _headerRow
	private _sheetNames
	private _selectedSheet
	private _debug
	private _fileType
	detected: detectedTypes
	meta: {
		name: string
		version: string
		depends: string[]
	}
	constructor(params?: ConstructorParams)
	get headerRow(): number
	get data(): dataType | null
	get sheetNames(): string[]
	get selectedSheet(): string
	get api(): {
		headerRow: number
		sheetNames: string[]
		selectedSheet: string
		data: dataType
	}
	get hooks(): PluginHooks
	private _setOptions
	convertNumbers(data: dataType): dataType
	readContent(input: File, options?: optionsTypes, convert?: boolean): dataType | null
	setSource(source: File): void
	private _isObjectArray
	private _buildData
	private _log
}
