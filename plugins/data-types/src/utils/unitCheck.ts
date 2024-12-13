import { type Data } from 'vizzu'
import { UnitPosition, type TypedSeries } from '../index'
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
		'REF',
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
		'PARTNO',
		'SERIALNO',
		'LOT',
		'BATCH',
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
	const suffixRegexp = /^-?[\d.]+([\D]+)$/
	const prefixRegexp = /^([\D]+?)\s*(-?[\d.]+)$/

	const values = series.values

	if (!values) return

	const firstDataRaw = values.filter((e) => e && e !== '').shift()

	if (!firstDataRaw || typeof firstDataRaw !== 'string') return
	const firstData = clearValue(firstDataRaw)

	if (!firstData || typeof firstData !== 'string') return

	let test = prefixRegexp.exec(firstData)
	let unitType = UnitPosition.PREFIX
	if (!test) {
		test = suffixRegexp.exec(firstData)
		unitType = UnitPosition.SUFFIX
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
			(value) =>
				value === '' ||
				(typeof value === 'string' &&
					(clearValue(value) === '' ||
						((value.endsWith(unit) || value.startsWith(unit)) &&
							!isNaN(Number(clearValue(value.replace(unit, '')))))))
		)

	if (series?.values && hasUnit(series)) {
		series.values = values.map((value) =>
			typeof value === 'number'
				? value
				: Number(clearValue((value as string)?.replace(unit, '')))
		)
		series.unit = unit
		series.meta = { ...(series.meta ?? {}), unitType }
		series.type = 'measure'
	}
}
