export const emptyInput = {
	description: 'empty input',
	input: '',
	separator: ',',
	excepted: {
		csv: '',
		header: 0
	}
}

export const onlyHeader = {
	description: 'only header',
	input: 'a,b,c',
	separator: ',',
	excepted: {
		csv: [
			{ name: 'a', values: [] },
			{ name: 'b', values: [] },
			{ name: 'c', values: [] }
		],
		header: 0
	}
}

export const emptyDatas = [emptyInput, onlyHeader]
