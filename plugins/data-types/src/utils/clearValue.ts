export const clearValue = (value: string) => {
	return value
		.trim()
		.replace(/\s/g, '')
		.replace(/\u00A0/g, '')
		.replace(/,/g, '.')
		.replace(/^[−–—]/, '-')
		.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
}
