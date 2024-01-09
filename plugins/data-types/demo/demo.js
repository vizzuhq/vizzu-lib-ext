import Vizzu from 'https://vizzu-lib-main.storage.googleapis.com/lib/vizzu.min.js'
import { CSVParser } from './csvparser.js'
import { DataTypes } from '../dist/mjs/index.js'
let chart

window.addEventListener('load', async function () {
	const result = this.document.getElementById('result')
	const parserInfo = this.document.getElementById('parserInfo')

	const button = document.getElementById('testBTN')
	const textContent = document.getElementById('textArea')

	button.addEventListener('click', async function (event) {
		event.preventDefault()

		result.innerHTML = ''
		parserInfo.innerHTML = 'Loading...'
		//destroy chart if it exists
		//create new chart and add csv parser
		const parser = new CSVParser()
		const dataTypes = new DataTypes()

		// set chart options with csv text content
		const contentText = textContent.value
		if (contentText && contentText.length > 0) {

			const data = await parser.parse(contentText)


			// header detection
			let content = ''
			const hasHeader = parser.hasHeader

			if (hasHeader) {
				content += `<p><b>Header is detected</b><br>`
			} else {
				content += `<p>Header is not detected</b><br>`
			}
			// delimiter detection
			const delimiter = parser.delimiter
			content += `<b>The detected delimiter is <code>${JSON.stringify(delimiter)}</code></b></p>`

			parserInfo.innerHTML = content

			const types = dataTypes.checkTypes(data.series)

			console.log(types)
			content = '<p><b>Series:</b><br>'

			// series detection and animation
			// show series information
			data.series.forEach((seriesItem) => {
				//console.log(seriesItem)
				content += `Name: <b>${seriesItem.name}</b><br>`
				content += `Type: <b>${seriesItem.type}</b><br>`
				if (seriesItem.unit) {
					content += `Unit: <b>${seriesItem.unit}</b><br>`
				}
				/* content += `Data type: <b>${
					types.find((type) => type.name === seriesItem.name)?.type
				}</b><br>` */
/* 				if (seriesItem.type === 'dimension') {
					content += `Categories: <b>${JSON.stringify(seriesItem.categories)}</b>`
				} else {
					content += `Data range: <b>${seriesItem.range.min} - ${seriesItem.range.max}</b>`
				} */
				content += '</p>'
			})

			result.innerHTML = content
		} else {
			parserInfo.innerHTML = 'Load error.'
		}
	})
})
