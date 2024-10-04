import { clearValue } from './clearValue'

export enum Type {
	NUMBER = 'number',
	STRING = 'string',
	UNDEFINED = 'undefined'
}

const getType = (value: string | number): Type => {
	if (!value || value === '') return Type.UNDEFINED
	if (typeof value === 'number') return Type.NUMBER
	if (typeof value !== 'string') return Type.STRING

	try {
		// remove special langue number formatters (e.g. 1 000 000,01)
		const formattedValue = clearValue(value)

		return !isNaN(Number(formattedValue)) ? Type.NUMBER : Type.STRING
	} catch {
		return Type.STRING
	}
}

export const convertToType = (values: string[] | number[]): Type[] => {
	return values.map((value: string | number) => getType(value))
}

export const typeIsNumber = (values: string[] | number[]): boolean => {
	const types = convertToType(values)
	return types.filter((type) => type !== Type.UNDEFINED).every((type) => type === Type.NUMBER)
}

export const typeIsString = (values: string[] | number[]): boolean => {
	const types = convertToType(values)
	return types.filter((type) => type !== Type.UNDEFINED).every((type) => type === Type.STRING)
}
export const countUndefinded = (values: Type[]): number => {
	return values.filter((value) => value === Type.UNDEFINED).length
}
