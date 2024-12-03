import { expect, test, describe } from 'vitest'
import { VideoCapture } from '../src'

describe('init', () => {
	const videoCapture = new VideoCapture()
	test('video capture initialized', () => {
		expect(typeof videoCapture).toBe('object')
		const functionKeys = Object.keys(videoCapture)
		const defultKeys = ['meta', 'options']

		expect(functionKeys).toEqual(expect.arrayContaining(defultKeys))
	})
})
