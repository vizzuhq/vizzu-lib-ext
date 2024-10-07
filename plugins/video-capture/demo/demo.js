import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.14/dist/vizzu.min.js'
import { data } from 'https://lib.vizzuhq.com/0.14/assets/data/chart_types_eu.js'
import { VideoCapture } from '../dist/mjs/index.js'

window.addEventListener('load', async function () {
	const chart = new Vizzu('vizzu')

	await chart.initializing

	chart.feature(new VideoCapture(), true)

	chart.animate({
		data
	})

	const anim = chart.animate({
		data,
		config: {
			x: 'Year',
			y: ['Value 2 (+)', 'Joy factors'],
			color: 'Joy factors',
			title: 'Video Export'
		}
	})

	anim.activated.then(() => {
		chart.feature.videoCapture.start()
	})

	anim.then(async (chart) => {
		const output = await chart.feature.videoCapture.stop()
		window.open(output.getObjectURL())
	})
})
