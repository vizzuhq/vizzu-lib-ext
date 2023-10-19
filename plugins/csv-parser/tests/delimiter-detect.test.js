import { expect, test, describe } from 'vitest'
import { filesCustomSeparator, filesWithHeaders, filesWithoutHeaders } from './assets/testFiles'
import fs from 'fs'
import { delimiterDetect } from '../src/delimiterDetect'

describe('header probabilites detect', () => {
	describe('csv files header detect', () => {
		describe('with headers', () => {
			const testFiles = filesWithHeaders()
			test.each(testFiles)("small source ($input) separator ','", async ({ input }) => {
				const data = fs.readFileSync(input, 'utf8')
				const detectedDelimiter = delimiterDetect(data)
				expect(detectedDelimiter).toEqual(',')
			})
		})
		describe('without headers', () => {
			const testFiles = filesWithoutHeaders()
			test.each(testFiles)("small source ($input) separator ','", async ({ input }) => {
				const data = fs.readFileSync(input, 'utf8')
				const detectedDelimiter = delimiterDetect(data)
				expect(detectedDelimiter).toEqual(',')
			})
		})
		describe('custom seaparator with headers', () => {
			const testFiles = filesCustomSeparator()
			test.each(testFiles)(
				"small source ($input) separator '$separator'",
				async ({ input, separator }) => {
					const data = fs.readFileSync(input, 'utf8')
					const detectedDelimiter = delimiterDetect(data)
					expect(detectedDelimiter).toEqual(separator)
				}
			)
		})
	})
})
