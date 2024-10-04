import { clearValue } from './clearValue'

const getType = (value: string | number): string => {
	if (!value || value === '') return 'undefined'
	if (typeof value === 'number') return 'number'
	if (typeof value !== 'string') return 'string'

	try {
		// remove special langue number formatters (e.g. 1 000 000,01)
		const formattedValue = clearValue(value)

		return !isNaN(Number(formattedValue)) ? 'number' : 'string'
	} catch {
		return 'string'
	}
}

export const convertToType = (values: string[] | number[]): string[] => {
	return values.map((value) => getType(value))
}

export const typeIsNumber = (values: string[] | number[]): boolean => {
	const types = convertToType(values)
	return types.filter((type) => type !== 'undefined').every((type) => type === 'number')
}

export const typeIsString = (values: string[] | number[]): boolean => {
	const types = convertToType(values)
	return types.filter((type) => type !== 'undefined').every((type) => type === 'string')
}
export const countUndefinded = (values: string[]): number => {
	return values.filter((value) => value === 'undefined').length
}
