export const clearValue = (value: string | null | undefined): string | null | undefined => {
	if (!value) return value

	const cleanedValue = value
		.trim()
		.replace(/\s/g, '')
		.replace(/\u00A0/g, '')
		.replace(/^[−–—]/, '-')
		.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
	if (cleanedValue.includes('.')) {
		return cleanedValue.replace(/[,](?=\d{3})/g, '')
	} else {
		return cleanedValue.replace(/,(?=\d{3}(,|$))/g, '').replace(',', '.')
	}
}
