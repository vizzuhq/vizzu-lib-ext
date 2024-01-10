import { series } from '../index'
import { orderedDateTypes } from './dateTypeVariants'
import { convertToString } from './mainTypeConverter'

export const headerCheck = (series: series[], addType: (name: string, type: string) => void) => {
	const orederedHeaderVaraint = orderedDateTypes()
	series.forEach((seriesData: series) => {
		if (seriesData?.meta?.type) return

		const { name, values } = seriesData

		if (!values) return

		const header = name.toLowerCase()
		const matchedHeaders = orederedHeaderVaraint.find(({ names }) => names.includes(header))

		if (!matchedHeaders) return
		const { type, dataType, seriesType, match } = matchedHeaders
		if (!match(values, false)) return
		seriesData.values = convertToString(values)
		seriesData.type = seriesType
		const meta = {
			type: type,
			dataTypes: dataType,
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
