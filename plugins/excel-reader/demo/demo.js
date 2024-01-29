import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.9/dist/vizzu.min.js'
import { ExcelReader } from '../dist/mjs/index.js'
let chart

window.addEventListener('load', async function () {
	const result = this.document.getElementById('result')
	const parserInfo = this.document.getElementById('parserInfo')
	const vizzu = this.document.getElementById('vizzu')

	const input = document.getElementById('inputFile')

	input.addEventListener('change', async function (event) {
		event.preventDefault()

		result.innerHTML = ''
		parserInfo.innerHTML = 'Loading...'

		if (chart) chart.detach()
		chart = new Vizzu('vizzu')
		chart.feature(new ExcelReader(), true)
		await chart.initializing

		const file = event.target.files[0]
		if (file) {
			var reader = new FileReader()

			reader.onload = async function (e) {
				var data = e.target.result
				await chart.animate({
					data: {
						excel: {
							content: data
						}
					}
				})

				showVizzu()
			}

			reader.onerror = function (ex) {
				console.log(ex)
			}

			reader.readAsBinaryString(file)
		} else {
			parserInfo.innerHTML = 'Load error.'
		}
	})

	const showVizzu = () => {
		vizzu.classList.remove('hide')
		let content = ''
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
		parserInfo.innerHTML = 'Chart from Excel file.'

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
	}
})
