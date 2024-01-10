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
		const allMath = values.every(
			(value) => value === '' || (typeof value === 'string' && Date.parse(value.toString()))
		)
		if (!allMath) return

		const includesTimes = values.every((value) => /\d{1,2}:\d{1,2}/.test(value.toString()))

		const meta: { type: string; dataTypes: string; dependencies: string[] } = {
			type: type,
			dataTypes: includesTimes ? 'datetime' : 'date',
			dependencies: []
		}

		seriesData.values = convertToString(values)

		if (seriesData.meta) {
			seriesData.meta = { ...seriesData.meta, ...meta }
		} else {
			seriesData.meta = meta
		}

		seriesData.type = 'dimension'
		addType(seriesData.name, type)
	})
}

export const timeFormatCheck = (
	series: series[],
	addType: (name: string, type: string) => void
) => {
	const type = 'date'
	series.forEach((seriesData: series) => {
		const values = seriesData.values

		if (!values) return false
		const allMath = values.every(
			(value) =>
				value === '' ||
				(typeof value === 'string' &&
					/^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9](?::[0-5]?[0-9](?:[.:]\d{1,6})?)?$/.test(
						value.toString()
					))
		)

		if (!allMath) return

		const meta = {
			type: type,
			dataTypes: 'time',
			dependencies: []
		}

		seriesData.values = convertToString(values)

		seriesData.meta = { ...(seriesData.meta ?? {}), ...meta }

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

		const orederedHeaderVaraint = orderedDateTypes().filter(
			({ type }) => !typeList.includes(type)
		)

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

			if (match(seriesData.values, fixed)) {
				const meta = {
					type: type,
					dependencies: dependencies && Array.isArray(dependencies) ? dependencies : []
				}
				seriesData.meta = {
					...(seriesData?.meta ?? {}),
					...meta
				}

				seriesData.values = convertToString(seriesData.values)
				seriesData.type = 'dimension'
				addType(seriesData.name, type)
			}
		}
	})
}
