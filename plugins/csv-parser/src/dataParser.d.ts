/// <reference types="node" />
import { Options } from 'csv-parse/sync'
import { Anim, Data, Config, Styles } from 'vizzu'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js'
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
export declare class DataParser implements Plugin {
	private _data
	private _headers
	private _autoheader
	private _hasHeader
	private _emptyColumnPrefix
	private _probabilityVariable
	private _debug
	detected: DetectedTypes
	parserOptions: Options
	meta: {
		name: string
		version: string
		depends: string[]
	}
	constructor(params?: ConstructorParams)
	get hasHeader(): boolean | null
	get data(): DataType | null
	get delimiter(): string
	get detectedDelimiter(): string
	get api(): {
		hasHeader: boolean
		detectedDelimiter: string
		delimiter: string
		data: DataType
	}
	get hooks(): PluginHooks
	private _setOptions
	convertNumbers(data: DataType): DataType
	parse(input: string, options?: OptionsTypes, convert?: boolean): Promise<DataType | null>
	setSource(source: string): Promise<void>
	fetchData(url: string): Promise<string>
	getDelimiter(data: string): string
	private _buildData
	private _getHeader
	private _log
}
