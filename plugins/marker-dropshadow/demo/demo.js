import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.11/dist/vizzu.min.js'
import { data } from 'https://lib.vizzuhq.com/0.11/assets/data/chart_types_eu.js'
import { MarkerDropshadow } from '../dist/mjs/index.js'

window.addEventListener('load', async function () {
	const chart = new Vizzu('vizzu')

	chart.feature(new MarkerDropshadow(), true)

	await chart.initializing

	chart.animate({
		data
	})

	chart.animate({
		config: Vizzu.presets.column({
			x: 'Joy factors',
			y: 'Value 2 (+)',
			title: 'Column Chart'
		}),
		style: {
			plot: {
				marker: {
					shadowColor: '#60000060',
					shadowBlur: 9,
					shadowOffsetX: 3,
					shadowOffsetY: 3
				}
			}
		}
	})
})
