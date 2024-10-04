import { clearValue } from './clearValue'

export const convertToNumber = (values: string[] | number[] | undefined): number[] => {
	if (!values) return []
	return values.map((value: string | number) => {
		if (typeof value === 'number') return value

		const celaredValue = clearValue(value)
		if (typeof celaredValue === 'string') return parseFloat(celaredValue)
		return NaN
	})
}

export const convertToString = (values: string[] | number[] | undefined): string[] => {
	if (!values) return []
	return values.map((value: string | number) => {
		if (typeof value === 'string') return value

		return value.toString()
	})
}
