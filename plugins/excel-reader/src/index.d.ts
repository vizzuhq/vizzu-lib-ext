/// <reference types="node" />
import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js'
import { AnimCompleting } from 'vizzu/dist/animcompleting'
export declare enum FileTypes {
	BINARY = 'binary',
	BASE64 = 'base64',
	ARRAY = 'array',
	STRING = 'string',
	BUFFER = 'buffer',
	FILE = 'file'
}
export type EnabledFiles = ArrayBuffer | string | Uint8Array | Buffer | Blob | File | null
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
	content?: EnabledFiles
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
export interface DataType {
	series: Data.Series[]
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
		depends: unknown[]
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
	readContent(input: EnabledFiles, options?: OptionsTypes, convert?: boolean): DataType | null
	setSource(source: EnabledFiles): void
	private _isObjectArray
	private _buildData
	private _log
}
