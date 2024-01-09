import { series } from 'dataTypes'
import { orderedDateTypes } from './dateTypeVariants'
import { convertToString } from './mainTypeConverter'

export const dateFormatCheck = (
	series: series[],
	addType: (name: string, type: string) => void
) => {
	const type = 'date'

	series.forEach((seriesData: series) => {
		const values = seriesData.values

		if (!values) return false
		values.forEach((value) => {
			console.log(value.toString(), Date.parse(value.toString()))
		})
		const allMath = values.every(
			(value) => value === '' || (typeof value === 'string' && Date.parse(value.toString()))
		)

		if (!allMath) return

		seriesData.values = convertToString(values)

		if (seriesData.meta) {
			seriesData.meta.type = type
		} else {
			seriesData.meta = { type: type }
		}

		seriesData.type = 'dimension'
		addType(seriesData.name, type)
	})
}

export const datesCheck = (
	series: series[],
	typeList: string[],
	addType: (name: string, type: string) => void,
	fixed: boolean = true
) => {
	series.forEach((seriesData: series, seriesKey: number) => {
		if (seriesData?.meta?.type) return

		const orederedHeaderVaraint = orderedDateTypes().filter(({ type }) => !typeList.includes(type))

		for (const { type, match, dependencies } of orederedHeaderVaraint) {
			if (seriesData?.meta?.type) return

			if (dependencies && Array.isArray(dependencies)) {
				if (!dependencies.every((dependency) => typeList.includes(dependency))) continue

				let isContinues = false
				if (seriesKey > 0) {
					const prevSeries = series[seriesKey - 1]
					if (prevSeries.meta?.type && dependencies.includes(prevSeries.meta.type)) {
						isContinues = true
					}
				}
				if (seriesKey < series.length - 1) {
					const nextSeries = series[seriesKey + 1]

					if (nextSeries.meta?.type && dependencies.includes(nextSeries.meta.type)) {
						isContinues = true
					}
				}

				if (!isContinues) continue
			}

			if (match(values, fixed)) {
				if (seriesData.meta) {
					seriesData.meta.type = type
				} else {
					seriesData.meta = { type: type }
				}

				seriesData.values = convertToString(values)
				seriesData.type = 'dimension'
				addType(name, type)
			}
		}
	})

	/* 		if (fixed) {
		this._checkDates(series, false)
	} */
}
