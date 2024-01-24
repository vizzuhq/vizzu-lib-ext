import { TypedSeries } from '../index'

export const linkCheck = (series: TypedSeries[], addType: (name: string, type: string) => void) => {
	const type = 'link'
	const linkRegexp =
		/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
	series.forEach((seriesData: TypedSeries) => {
		if (seriesData?.meta?.type) return

		const { name, values } = seriesData

		const allMath = values?.every(
			(value) => value === '' || (typeof value === 'string' && value.match(linkRegexp))
		)

		if (!allMath) return

		if (seriesData.meta) {
			seriesData.meta.type = type
		} else {
			seriesData.meta = { type: type }
		}

		seriesData.type = 'dimension'
		addType(name, type)
	})
}
