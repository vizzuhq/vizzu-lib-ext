import { convertToNumber, convertToString } from './utils/mainTypeConverter'
import { typeIsNumber } from './utils/mainTypeDetection'
import { unitCheck } from './utils/unitCheck'
import { headerCheck } from './utils/headerCheck'
import { dateFormatCheck, datesCheck, timeFormatCheck } from './utils/dateCheck'
import { linkCheck } from './utils/linkCheck'

export interface series {
	name: string
	values?: number[] | string[]
	categories?: string[]
	type?: string
	unit?: string
	meta?: {
		type?: string
	}
}

export interface target {
	data: {
		series: series[]
	}
}

export interface hookContex {
	target: target
}

export class DataTypes {
	meta = {
		name: 'dataTypes'
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
		const callCheckTypes = (target: hookContex[]) => {
			target.forEach(({ target: target }) => {
				if (target?.data?.series && Array.isArray(target.data.series)) {
					this.checkTypes(target.data.series)
				}
			})
		}

		return {
			setAnimParams: Object.assign(
				(ctx: hookContex, next: () => void): void => {
					if (Array.isArray(ctx.target)) {
						callCheckTypes(ctx.target)
					}
					next()
				},
				{ priority: 0.9 }
			)
		}
	}

	public checkTypes = (series: series[]) => {
		const seriesTypes = this._mainTypes(series)

		headerCheck(seriesTypes, this._addType)

		dateFormatCheck(this._notTyped(seriesTypes), this._addType)

		timeFormatCheck(this._notTyped(seriesTypes), this._addType)

		datesCheck(this._notTyped(seriesTypes), this.typesList, this._addType)

		linkCheck(this._notTyped(seriesTypes), this._addType)

		this._addFinalTypes(seriesTypes)
	}

	private _notTyped = (series: series[]) => {
		return series.filter((seriesData) => !this.typedSeries.includes(seriesData.name))
	}

	private _addType = (name: string, type: string) => {
		this._types.push({ name: name, type: type })
	}

	private _mainTypes = (series: series[]): series[] => {
		return series.map((seriesData: series) => {
			if (!seriesData.values) return seriesData
			if (typeIsNumber(seriesData.values)) {
				seriesData.values = convertToNumber(seriesData.values)
				seriesData.type = 'measure'
				return seriesData
			}

			seriesData.values = convertToString(seriesData.values)
			seriesData.type = 'dimension'

			unitCheck(seriesData)
			return seriesData
		})
	}

	private _addFinalTypes(series: series[]) {
		series.forEach((seriesData: series) => {
			if (seriesData?.meta?.type) return
			if (!seriesData.values) return
			const metaType = seriesData.type === 'measure' ? 'number' : 'string'

			const meta = {
				type: metaType,
				dataTypes: metaType,
				dependencies: []
			}
			seriesData.meta = { ...(seriesData.meta ?? {}), ...meta }
			this._types.push({ name: seriesData.name, type: metaType })
		})
	}
}
