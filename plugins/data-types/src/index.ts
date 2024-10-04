import { convertToNumber, convertToString } from './utils/mainTypeConverter'
import { typeIsNumber } from './utils/mainTypeDetection'
import { unitCheck } from './utils/unitCheck'
import { headerCheck } from './utils/headerCheck'
import { dateFormatCheck, datesCheck, timeFormatCheck } from './utils/dateCheck'
import { linkCheck } from './utils/linkCheck'
import * as CA from 'vizzu/dist/module/canimctrl.js'
import * as CC from 'vizzu/dist/module/cchart'
import type { Data, Config, Anim, Styles, AnimCompleting } from 'vizzu'

export type Meta = {
	type?: string
	format?: string
}

export type TypedSeries = Data.Series & {
	meta?: Meta
}

export interface TypedDataBySeries extends Data.TableBySeries {
	series: TypedSeries[]
}

export interface Target {
	data?: Data.Set | TypedSeries
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

export interface target {
	data: {
		series: TypedSeries[]
	}
}

export interface HookContex {
	target: target
}

export interface TypesOptions {
	unitDiscovery?: boolean
}

export interface DataTypesParams {
	options?: TypesOptions
}

export class DataTypes {
	private dataTypesOptions: TypesOptions = {
		unitDiscovery: true
	}

	meta = {
		name: 'dataTypes',
		version: '0.14.0',
		depends: ['csvParser']
	}

	constructor(params: DataTypesParams = {}) {
		if (!params?.options) return

		if ('unitDiscovery' in params.options) {
			this.dataTypesOptions.unitDiscovery = !!params.options.unitDiscovery
		}
	}

	private _types: { name: string; type: string }[] = []

	get types() {
		return this._types
	}

	get typesList() {
		return this._types.map(({ type }) => type)
	}

	get typedSeries() {
		return this._types.map(({ name }) => name)
	}

	get api() {
		return {
			types: this.types
		}
	}

	get hooks() {
		const callCheckTypes = (target: HookContex[]) => {
			target.forEach(({ target: target }) => {
				if (target?.data?.series && Array.isArray(target.data.series)) {
					this.checkTypes(target.data.series)
				}
			})
		}

		return {
			setAnimParams: Object.assign(
				(ctx: HookContex, next: () => void): void => {
					if (Array.isArray(ctx.target)) {
						callCheckTypes(ctx.target)
					}
					next()
				},
				{ priority: 0.9 }
			)
		}
	}

	public checkTypes = (series: TypedSeries[]): series is TypedSeries[] => {
		const seriesTypes = this._mainTypes(series).filter((seriesData) => !('meta' in seriesData))

		headerCheck(seriesTypes, this._addType)

		dateFormatCheck(this._notTyped(seriesTypes), this._addType)

		timeFormatCheck(this._notTyped(seriesTypes), this._addType)

		datesCheck(this._notTyped(seriesTypes), this.typesList, this._addType)

		linkCheck(this._notTyped(seriesTypes), this._addType)

		this._addFinalTypes(seriesTypes)

		return true
	}

	private _notTyped = (series: TypedSeries[]) => {
		return series.filter((seriesData) => !this.typedSeries.includes(seriesData.name))
	}

	private _addType = (name: string, type: string) => {
		this._types.push({ name, type })
	}

	private _mainTypes = (series: TypedSeries[]): TypedSeries[] => {
		return series.map((seriesData: TypedSeries) => {
			if (!seriesData.values) return seriesData

			if (
				seriesData.values.every(
					(value) => value === '' || value === undefined || value === null
				)
			) {
				seriesData.type = 'dimension'
				seriesData.meta = { type: 'string', format: 'empty' }

				return seriesData
			}
			if (typeIsNumber(seriesData.values)) {
				seriesData.values = convertToNumber(seriesData.values)
				seriesData.type = 'measure'
				return seriesData
			}

			seriesData.values = convertToString(seriesData.values)
			seriesData.type = 'dimension'

			if (this.dataTypesOptions.unitDiscovery) {
				unitCheck(seriesData)
			}
			return seriesData
		})
	}

	private _addFinalTypes(series: TypedSeries[]) {
		series.forEach((seriesData: TypedSeries) => {
			if (seriesData?.meta?.type) return
			if (!seriesData.values) return
			const metaType = seriesData.type === 'measure' ? 'number' : 'string'

			const meta = {
				type: metaType,
				format: metaType,
				dependencies: []
			}
			seriesData.meta = { ...(seriesData.meta ?? {}), ...meta }
			this._types.push({ name: seriesData.name, type: metaType })
		})
	}
}

export default DataTypes
