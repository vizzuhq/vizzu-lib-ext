const match = (
	values: string[] | number[] | undefined,
	length: { max: number; min: number },
	range: { max: number; min: number },
	corrector: { max: number; min: number },
	fixed: boolean = false
) => {
	if (!values) return false

	if (!lengthMatch(values, length.max, length.min)) return false

	if (!sizeMatch(values, range.max, range.min)) return false

	if (fixed && !sizeCorrector(values, corrector.max, corrector.min)) return false

	return true
}

const lengthMatch = (
	values: string[] | number[] | undefined,
	maxLength: number,
	minLength: number = 1
) => {
	if (!values) return false

	return values.every((value) => {
		if (!value) return true

		const valueLengths = value.toString().length
		if (valueLengths === 0 || value === 'undefined' || value === 0) return true

		return minLength <= valueLengths && valueLengths <= maxLength
	})
}

const sizeMatch = (
	values: string[] | number[] | undefined,
	maxSize: number,
	minSize: number = 0
) => {
	if (!values) return false

	const minValue = Math.min(
		...values
			.filter((v) => v !== 0)
			.map((value) => (typeof value === 'string' ? parseInt(value) : value))
	)
	const maxValue = Math.max(
		...values.map((value) => (typeof value === 'string' ? parseInt(value) : value))
	)

	return minSize <= minValue && maxValue <= maxSize
}

// rename to sizeCorrector ???
const sizeCorrector = (
	values: string[] | number[] | undefined,
	maxSize: number,
	minSize: number = 0
) => {
	if (!values) return false

	const minValue = Math.min(
		...values.map((value) => (typeof value === 'string' ? parseInt(value) : value))
	)
	const maxValue = Math.max(
		...values.map((value) => (typeof value === 'string' ? parseInt(value) : value))
	)

	return minSize <= minValue && maxValue <= maxSize
}

export const orderedDateTypes = () => {
	return dateTypes.sort((a, b) => b.priority - a.priority)
}

export const dateTypes = [
	{
		type: 'year',
		match: (values: string[] | number[] | undefined, fixed: boolean = true) =>
			match(values, { min: 4, max: 4 }, { min: 1000, max: 3000 }, { min: 1000, max: 3000 }, fixed),
		priority: 0.9,
		names: [
			'year',
			'years', // English
			'év',
			'évek', // Hungarian
			'anno',
			'anni', // Italian
			'jahr',
			'jahre', // German
			'année',
			'ans', // French
			'año',
			'años', // Spanish
			'ano',
			'anos', // Portuguese
			'år',
			'årene', // Swedish
			'год',
			'лет', // Russian
			'年',
			'年間', // Japanese
			'साल', // Hindi
			'வருடம்', // Tamil
			'tahun', // Indonesian
			'година',
			'години', // Ukrainian
			'વર્ષ', // Gujarati
			'рік', // Belarusian
			'lat', // Polish
			'година', // Bulgarian
			'роки', // Serbian
			'godina', // Bosnian
			'године', // Macedonian
			'év', // Turkish
			'ປີ', // Lao
			'წელი', // Georgian
			'අවුරුද්ද', // Sinhalese
			'vuosi', // Finnish
			'лето', // Macedonian
			'rok', // Czech
			'літ', // Belarusian
			'ปี', // Thai
			'שנה', // Hebrew
			'aasta', // Estonian
			'ವರ್ಷ', // Kannada
			'տարի', // Armenian
			'سال', // Persian
			'año', // Catalan
			'年', // Japanese (Traditional)
			'år', // Norwegian
			'üzbég', // Uzbek
			'année', // Breton
			'астан', // Kazakh
			'ár', // Irish
			'ஆண்டு', // Tamil
			'rok', // Croatian
			'वर्ष' // Nepali
		]
	},
	{
		type: 'month',
		match: (values: string[] | number[] | undefined, fixed: boolean = true) =>
			match(values, { min: 1, max: 13 }, { min: 0, max: 12 }, { min: 0, max: 12 }, fixed),
		priority: 0.4,
		dependencies: ['year'],
		names: [
			'month',
			'months', // English
			'hónap',
			'hónapok', // Hungarian
			'meseac',
			'mesecev', // Bosnian
			'měsíc',
			'měsíce', // Czech
			'месяц',
			'месяца', // Russian
			'kuukausi',
			'kuukautta', // Finnish
			'月',
			'ヶ月', // Japanese
			'měnesis', // Latvian
			'месец', // Macedonian
			'mwezi', // Swahili
			'bulan', // Indonesian
			'місяць', // Ukrainian
			'búðar', // Icelandic
			'manche', // German
			'maand', // Dutch
			'mjesec', // Croatian
			'mesiac', // Slovak
			'mesec', // Slovenian
			'μήνας', // Greek
			'maan', // Danish
			'miesiąc', // Polish
			'ماه', // Arabic
			'თვე', // Georgian
			'เดือน', // Thai
			'місяць', // Ukrainian
			'महिना', // Marathi
			'شهر', // Urdu
			'bulan', // Malay
			'ماه', // Persian
			'महिना', // Hindi
			'mesec' // Croatian
		]
	},
	{
		type: 'day',
		match: (values: string[] | number[] | undefined, fixed: boolean = true) =>
			match(values, { min: 1, max: 2 }, { min: 0, max: 31 }, { min: 24, max: 31 }, fixed),
		priority: 0.6,
		dependencies: ['month'],
		names: [
			'day',
			'days', // English
			'nap',
			'napok', // Hungarian
			'dan',
			'dana', // Croatian
			'dzień',
			'dni', // Polish
			'день',
			'днів', // Ukrainian
			'يوم', // Arabic
			'日', // Japanese
			'giorno',
			'giorni', // Italian
			'tag',
			'tage', // German
			'dia',
			'dias', // Portuguese, Spanish
			'ден', // Bulgarian, Macedonian
			'dag', // Danish, Norwegian, Swedish
			'den', // Dutch, Danish, Norwegian, Swedish
			'روز', // Persian
			'día' // Spanish
		]
	},
	{
		type: 'hour',
		match: (values: string[] | number[] | undefined, fixed: boolean = true) =>
			match(values, { min: 1, max: 2 }, { min: 0, max: 24 }, { min: 12, max: 24 }, fixed),
		priority: 0.5,
		dependencies: ['day'],
		names: [
			'hour',
			'hours',
			'óra',
			'órák', // English, Hungarian
			'ساعة', // Arabic
			'stund',
			'stunden', // German
			'heure', // French
			'uur', // Dutch
			'гадзіна', // Belarusian
			'時間', // Japanese
			'час',
			'часа', // Russian
			'ora',
			'ore', // Italian
			'hora', // Spanish, Portuguese
			'घंटा', // Hindi
			'საათი', // Georgian
			'година',
			'години', // Ukrainian
			'ساعت', // Persian
			'саат', // Bulgarian
			'시간', // Korean
			'小时', // Chinese Simplified, Chinese Traditional
			'કલાક', // Gujarati
			'ώρα', // Greek
			'saat', // Indonesian, Turkish
			'שעה', // Hebrew
			'समय', // Nepali
			'tunti', // Finnish
			'ঘণ্টা', // Bengali
			'மணி', // Tamil
			'గంట', // Telugu
			'മണിക്കൂർ', // Malayalam
			'orë', // Albanian
			'час', // Ukrainian
			'ঘণ্টা', // Bengali
			'วัน' // Thai
		]
	},
	{
		type: 'minute',
		match: (values: string[] | number[] | undefined, fixed: boolean = true) =>
			match(values, { min: 1, max: 2 }, { min: 0, max: 60 }, { min: 31, max: 60 }, fixed),
		priority: 0.8,
		dependencies: ['hour'],
		names: [
			'minute',
			'minutes', // English
			'perc',
			'percek', // Hungarian
			'minuta',
			'minut', // Croatian
			'minuta',
			'minut', // Polish
			'хвилина',
			'хвилин', // Ukrainian
			'دقيقة', // Arabic
			'分', // Japanese
			'minuto',
			'minuti', // Italian
			'minute',
			'minuten', // German
			'minuto',
			'minutos', // Portuguese, Spanish
			'минута', // Bulgarian, Macedonian
			'minut', // Danish, Norwegian, Swedish
			'minuut', // Dutch
			'دقیقه' // Persian
		]
	}
]
