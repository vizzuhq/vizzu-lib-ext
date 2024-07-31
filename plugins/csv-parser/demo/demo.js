import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.12/dist/vizzu.min.js'
import { CSVParser } from '../dist/mjs/index.js'
let chart

window.addEventListener('load', async function () {
	const result = this.document.getElementById('result')
	const parserInfo = this.document.getElementById('parserInfo')
	const vizzu = this.document.getElementById('vizzu')

	const button = document.getElementById('testBTN')
	const textContent = document.getElementById('textArea')

	button.addEventListener('click', async function (event) {
		event.preventDefault()

		result.innerHTML = ''
		parserInfo.innerHTML = 'Loading...'
		//destroy chart if it exists
		if (chart) chart.detach()
		//create new chart and add csv parser
		chart = new Vizzu('vizzu')
		chart.feature(new CSVParser(), true)
		await chart.initializing

		// set chart options with csv text content
		const contentText = textContent.value
		if (contentText && contentText.length > 0) {
			vizzu.classList.remove('hide')

			await chart.animate({
				data: {
					csv: {
						content: contentText,
						options: {
							encoding: 'utf8'
						}
					}
				}
			})

			// header detection
			let content = ''
			const hasHeader = chart.feature.csvParser.hasHeader

			if (hasHeader) {
				content += `<p><b>Header is detected</b><br>`
			} else {
				content += `<p>Header is not detected</b><br>`
			}
			// delimiter detection
			const delimiter = chart.feature.csvParser.delimiter
			content += `<b>The detected delimiter is <code>${JSON.stringify(
				delimiter
			)}</code></b></p>`

			parserInfo.innerHTML = content

			content = '<p><b>Series:</b><br>'

			// series detection and animation
			const data = chart.data

			// show series information
			data.series.forEach((seriesItem) => {
				content += `Name: <b>${seriesItem.name}</b><br>`
				content += `Type: <b>${seriesItem.type}</b><br>`
				if (seriesItem.type === 'dimension') {
					content += `Categories: <b>${JSON.stringify(seriesItem.categories)}</b>`
				} else {
					content += `Data range: <b>${seriesItem.range.min} - ${seriesItem.range.max}</b>`
				}
				content += '</p>'
			})

			result.innerHTML = content

			// animate chart
			const dimensions = data.series.filter((seriesItem) => seriesItem.type === 'dimension')
			let x = dimensions.shift()

			const measures = data.series.filter((seriesItem) => seriesItem.type === 'measure')
			let y = measures.pop()

			if (!x) {
				if (measures.length > 0) {
					x = measures.shift()
				} else {
					console.error('No x axis')
					return
				}
			}

			if (!y) {
				if (dimensions.length > 0) {
					y = dimensions.pop()
				} else {
					console.error('No y axis')
					return
				}
			}

			chart.animate({
				config: {
					channels: {
						y: {
							set: [y.name]
						},
						x: {
							set: [x.name],
							range: { max: Math.min(10, x?.categories?.length || 10) }
						}
					},
					color: { set: [x.name] }
				},
				data: { filter: null }
			})
		} else {
			vizzu.classList.remove('hide')
			parserInfo.innerHTML = 'Load error.'
		}
	})
})
