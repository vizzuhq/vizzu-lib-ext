export const clearValue = (value: string | null | undefined) => {
	if (!value) return value
	return value
		.trim()
		.replace(/\s/g, '')
		.replace(/\u00A0/g, '')
		.replace(/,/g, '.')
		.replace(/^[−–—]/, '-')
		.replace(/[\u2012\u2013\u2014\u2015]/g, '-')
}
