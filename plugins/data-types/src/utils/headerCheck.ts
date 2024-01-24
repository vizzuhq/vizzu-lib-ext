import { Data } from 'vizzu'
import { TypedSeries } from '../index'
import { orderedDateTypes } from './dateTypeVariants'
import { convertToString } from './mainTypeConverter'

export const headerCheck = (series: TypedSeries[], addType: (name: string, type: string) => void) => {
	const orderedHeaderVariant = orderedDateTypes()
	series.forEach((seriesData: TypedSeries) => {
		if (seriesData?.meta?.type) return

		const { name, values } = seriesData

		if (!values) return

		const header = name.toLowerCase()
		const matchedHeaders = orderedHeaderVariant.find(({ names }) => names.includes(header))

		if (!matchedHeaders) return
		const { type, dataType, seriesType, match } = matchedHeaders
		if (!match(values, false)) return
		seriesData.values = convertToString(values)
		seriesData.type = seriesType as Data.SeriesType
		const meta = {
			type: type,
			format: dataType,
			dependencies: matchedHeaders?.dependencies ?? []
		}
		seriesData.meta = { ...seriesData.meta, ...meta }

		if (seriesData.meta) {
			seriesData.meta.type = type
		} else {
			seriesData.meta = { type: type }
		}

		addType(name, type)
	})
}
