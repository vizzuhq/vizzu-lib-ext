import { expect, test, describe } from 'vitest'
import { emptyDatas } from './assets/emptyDatas'
import { headerDetect } from '../src/headerDetect'
import { filesCustomSeparator, filesWithHeaders, filesWithoutHeaders } from './assets/testFiles'
import fs from 'fs'

describe('header probabilites detect', () => {
	describe('with empty data', () => {
		test.each(emptyDatas)(
			`$description -> excepted: ($excepted.header)`,
			({ input, excepted, separator }) => {
				const probabilites = headerDetect(input, separator)
				expect(probabilites).toEqual(excepted.header)
			}
		)
	})

	describe('csv files header detect', () => {
		describe('with headers', () => {
			const testFiles = filesWithHeaders()
			test.each(testFiles)(
				'small source ($input) >= $excepted.header',
				async ({ input, excepted }) => {
					const data = fs.readFileSync(input, 'utf8')
					const probabilites = headerDetect(data)
					expect(probabilites).toBeGreaterThanOrEqual(excepted.header)
				}
			)
		})
		describe('without headers', () => {
			const testFiles = filesWithoutHeaders()
			test.each(testFiles)(
				'small source ($input) <=$excepted.header',
				async ({ input, excepted }) => {
					const data = fs.readFileSync(input, 'utf8')
					const probabilites = headerDetect(data)
					expect(probabilites).toBeLessThanOrEqual(excepted.header)
				}
			)
		})
		describe('custom seaparator with headers', () => {
			const testFiles = filesCustomSeparator()
			test.each(testFiles)(
				'small source ($input) >=$excepted.header',
				async ({ input, excepted }) => {
					const data = fs.readFileSync(input, 'utf8')
					const probabilites = headerDetect(data)
					expect(probabilites).toBeLessThanOrEqual(excepted.header)
				}
			)
		})
	})
})
