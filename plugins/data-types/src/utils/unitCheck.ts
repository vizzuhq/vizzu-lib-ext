import { series } from 'dataTypes'
import { clearValue } from './clearValue'

export const unitCheck = (series: series): void => {
	const suffixRegexp = /^\d+([\D]+)$/
	const prefixRegexp = /^([\D]+)\d+$/

	const values = series.values

	if (!values) return

	const firstData = values.filter((e) => e && e !== '').shift()

	if (!firstData || typeof firstData !== 'string') return

	let test = prefixRegexp.exec(firstData)
	if (!test) {
		test = suffixRegexp.exec(firstData)
		if (!test) return
	}

	const unit = test[1]
	if (!unit) return

	const allMath = values.every(
		(e) =>
			e === '' ||
			(typeof e === 'string' &&
				(e.endsWith(unit) || e.startsWith(unit)) &&
				!isNaN(Number(clearValue(e.replace(unit, '')))))
	)

	if (!allMath) return

	series.values = values.map((e) =>
		typeof e === 'number' ? e : Number(clearValue(e.replace(unit, '')))
	)
	series.unit = unit
	series.type = 'measure'
}
