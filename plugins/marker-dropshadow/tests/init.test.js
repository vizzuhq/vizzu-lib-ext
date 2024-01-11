import { expect, test, describe } from 'vitest'
import { MarkerDropshadow } from '../src'

describe('init', () => {
	const markerDropshadow = new MarkerDropshadow()
	test('marker dropshadow initialized', () => {
		expect(typeof markerDropshadow).toBe('object')
		const functionKeys = Object.keys(markerDropshadow)
		const defultKeys = ['style', 'nextStyle', 'progress', 'defaultStyle', 'meta', 'hooks'];

		expect(functionKeys).toEqual(expect.arrayContaining(defultKeys))
	})
})
