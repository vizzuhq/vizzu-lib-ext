import { series } from 'dataTypes'
import { orderedDateTypes } from './dateTypeVariants'
import { convertToString } from './mainTypeConverter'

export const headerCheck = (series: series[], addType: (name: string, type: string) => void) => {
	const orederedHeaderVaraint = orderedDateTypes()
	series.forEach((seriesData: series) => {
		if (seriesData?.meta?.type) return

		const { name, values } = seriesData

		const header = name.toLowerCase()
		const matchedHeaders = orederedHeaderVaraint.find(({ names }) => names.includes(header))

		if (!matchedHeaders) return

		const { type, match } = matchedHeaders

		if (!match(values, false)) return

		seriesData.values = convertToString(values)
		seriesData.type = 'dimension'

		if (seriesData.meta) {
			seriesData.meta.type = type
		} else {
			seriesData.meta = { type: type }
		}

		addType(name, type)
	})
}
