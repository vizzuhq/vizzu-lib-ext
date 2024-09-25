import { type Data } from 'vizzu'
import { type TypedSeries } from '../index'
import { clearValue } from './clearValue'

export const unitCheck = (series: TypedSeries): void => {
	const ignored = [
		'Q',
		'SKU',
		'ID',
		'EAN',
		'UPC',
		'ISBN',
		'GTIN',
		'MPN',
		'ASIN',
		'UUID',
		'GUID',
		'Ref',
		'SN',
		'PID',
		'SID',
		'VID',
		'CID',
		'BID',
		'RID',
		'OID',
		'GID',
		'MAC',
		'IP',
		'ISBN-13',
		'ISBN-10',
		'PartNo',
		'SerialNo',
		'LOT',
		'Batch',
		'IMEI',
		'ICCID',
		'SSCC',
		'BIN',
		'DUNS',
		'VAT',
		'TIN',
		'CIF',
		'IBAN',
		'SWIFT',
		'BIC'
	]
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
	const notContained = ['-', '_']
	if (
		!unit ||
		ignored.includes(unit.toUpperCase()) ||
		ignored.includes(series.name.toUpperCase()) ||
		notContained.some((e) => unit.includes(e))
	)
		return

	const hasUnit = (series: TypedSeries): series is Data.Measure =>
		series.values.every(
			(e) =>
				e === '' ||
				(typeof e === 'string' &&
					(e.endsWith(unit) || e.startsWith(unit)) &&
					!isNaN(Number(clearValue(e.replace(unit, '')))))
		)

	if (series?.values && hasUnit(series)) {
		series.values = values.map((e) =>
			typeof e === 'number' ? e : Number(clearValue(e.replace(unit, '')))
		)
		series.unit = unit
		series.type = 'measure'
	}
}
