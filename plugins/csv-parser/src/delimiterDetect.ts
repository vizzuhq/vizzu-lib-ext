export const delimiterDetect = (data: string): string => {
	let content = data
	// Remove all escaped characters
	content = content.replace(/\\./g, '')
	// Remove all quoted characters
	content = content.replace(/".*?"/gs, '0')
	// Remove all empty lines
	content = content.replace(/^\s*[\r\n]/gm, '')
	const lines = content.split(/[\r\n]/)
	if (lines.at(-1) === '') {
		lines.pop()
	}

	const standardDelimiters = ['\t', ';', ',', '|', '^', '~', ':', ' ', '`']
	const defaultResponseDelimiter = ','

	const filteredLines = lines.filter((line) => line.trim().length > 0)
	if (filteredLines.length < 2) {
		return defaultResponseDelimiter
	}

	const countChars = (line: string) => {
		const charCount: { [key: string]: number } = {}
		for (const char of line) {
			if (standardDelimiters.includes(char)) {
				charCount[char] = (charCount[char] || 0) + 1
			}
		}
		return charCount
	}

	const lineCharCounts = filteredLines.map(countChars)

	const commonChars = Object.keys(lineCharCounts[0]).filter((char) =>
		lineCharCounts.every((count) => count[char])
	)

	const charsWithEqualFrequency = commonChars.filter((char) =>
		lineCharCounts.every((count) => count[char] === lineCharCounts[0][char])
	)

	const charFrequency = {}
	charsWithEqualFrequency.forEach((char) => {
		charFrequency[char] = filteredLines.reduce(
			(count, line) => count + (line.includes(char) ? 1 : 0),
			0
		)
	})
	const sortedChars = Object.entries(charFrequency)
		.sort((a, b) => b[1] - a[1])
		.map((entry) => entry[0])

	return sortedChars?.pop() ?? defaultResponseDelimiter
}
