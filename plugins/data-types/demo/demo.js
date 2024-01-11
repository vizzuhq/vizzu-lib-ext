import { CSVParser } from '../../csv-parser/dist/mjs/index.js'
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
		const parser = new CSVParser()
		const dataTypes = new DataTypes()

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
			content += `<b>The detected delimiter is <code>${JSON.stringify(
				delimiter
			)}</code></b></p>`

			parserInfo.innerHTML = content

			dataTypes.checkTypes(data.series)

			content = '<p><b>Series:</b><br>'

			// show series information
			data.series.forEach((seriesItem) => {
				content += `Name: <b>${seriesItem.name}</b><br>`
				content += `Type: <b>${seriesItem.type}</b><br>`
				if (seriesItem.unit) {
					content += `Unit: <b>${seriesItem.unit}</b><br>`
				}
				content += `Data Meta: <b>${JSON.stringify(seriesItem.meta)}</b><br>`
				content += '</p>'
			})

			result.innerHTML = content
		} else {
			parserInfo.innerHTML = 'Load error.'
		}
	})
})
