const naVariants = ['N/A', 'NA', 'n/a', 'n.a.', 'N.A.', 'n.d.', 's/n']

export const clearValue = (value: string | null | undefined): string | null | undefined => {
	if (!value) return value

	let cleanedValue = value
		.trim()
		.replace(/(\d)\s(\d)/g, '$1$2')
		.replace(/\u00A0/g, '')
		.replace(/^[−–—]/, '-')
		.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
	naVariants.forEach((na) => {
		if (cleanedValue === na) {
			cleanedValue = ''
		}
	})
	if (cleanedValue.includes('.')) {
		return cleanedValue.replace(/[,](?=\d{3})/g, '')
	} else {
		return cleanedValue.replace(/,/g, '')
	}
}

const excelErrors = [
	'#DIV/0!',
	'#N/A',
	'#NAME?',
	'#NULL!',
	'#NUM!',
	'#REF!',
	'#VALUE!',
	'#CALC!',
	'#SPILL!',
	'#GETTING_DATA',
	'#FIELD!',
	'#CONNECTED!',
	'#BLOCKED!'
]

export const fixErrorValues = (value: string): string => {
	excelErrors.forEach((error) => {
		if (value === error) {
			value = ''
		}
	})
	return value
}
