import { PrepareAnimationContext } from 'vizzu/dist/plugins'
import { Marker, Guides, MarkerLabel } from 'vizzu/dist/types/styles'
import tinycolor from 'tinycolor2'

type Next = () => void

export interface ShadowedMarker {
	borderWidth?: number | null
	borderOpacity?: number | null
	borderOpacityMode?: 'straight' | 'premultiplied' | null
	fillOpacity?: number | null
	guides?: Guides | null
	label?: MarkerLabel | null
	color?: string
	blur?: number
	offsetX?: number
	offsetY?: number
	plot?: {
		marker?: Marker
	}
	shadowColor?: string
	shadowBlur?: number
	shadowOffsetX?: number
	shadowOffsetY?: number
}
export interface ConstructorParams {
	style?: ShadowedMarker
}

export class MarkerDropshadow {
	private style: null | ShadowedMarker = null
	private nextStyle: null | ShadowedMarker
	private progress: number

	private defaultStyle = {
		color: '#00000060',
		blur: 9,
		offsetX: 3,
		offsetY: 3
	}

	constructor(params: ConstructorParams = {}) {
		this.style = params?.style ?? null
		this.nextStyle = null
		this.progress = 0
	}

	meta = {
		name: 'markerDropshadow',
		version: '0.14.0',
		depends: []
	}

	get listeners() {
		return {
			update: (event: CustomEvent<{ progress: number }>) => {
				this.progress = event.detail.progress
			},
			'plot-marker-draw': this._setDropshadow.bind(this),
			'plot-marker-label-draw': this._setDropshadow.bind(this)
		}
	}

	hooks = {
		prepareAnimation: (ctx: PrepareAnimationContext, next: Next) => {
			if (Array.isArray(ctx.target))
				ctx.target.forEach(({ target }) => {
					if ('style' in target) {
						target.style = this._prepareStyle(target.style as ShadowedMarker)
					}
				})
			next()
		}
	}

	_prepareStyle(style: ShadowedMarker) {
		if (!style || !style?.plot?.marker) return

		const markerStyle: ShadowedMarker = style.plot.marker

		this.nextStyle = {
			...this.defaultStyle,
			...this.style,
			...this.nextStyle
		}

		if (markerStyle.shadowColor) this.nextStyle.color = markerStyle.shadowColor
		if (markerStyle.shadowBlur) this.nextStyle.blur = markerStyle.shadowBlur
		if (markerStyle.shadowOffsetX) this.nextStyle.offsetX = markerStyle.shadowOffsetX
		if (markerStyle.shadowOffsetY) this.nextStyle.offsetY = markerStyle.shadowOffsetY

		this.style = { ...this.nextStyle, ...this.style }

		delete markerStyle.shadowColor
		delete markerStyle.shadowBlur
		delete markerStyle.shadowOffsetX
		delete markerStyle.shadowOffsetY

		return style
	}

	_setDropshadow(event: { renderingContext: CanvasRenderingContext2D | ShadowedMarker }): void {
		const ctx = event.renderingContext
		const style: ShadowedMarker = this._actStyle()
		ctx.shadowColor = style.color
		ctx.shadowBlur = style.blur
		ctx.shadowOffsetX = style.offsetX
		ctx.shadowOffsetY = style.offsetY
	}

	_actStyle() {
		const result: ShadowedMarker = {}
		for (const key in this.style) {
			if (!this.nextStyle) {
				result[key] = this.style[key] as string | number
				continue
			}
			if (key === 'color') {
				result[key] = tinycolor
					.mix(
						this.style[key]?.toString() || this.defaultStyle.color,
						this.nextStyle[key]?.toString() || this.defaultStyle.color,
						(1 - this.progress) * 100
					)
					.toRgbString()
				continue
			}
			result[key] = (this.style[key] +
				(this.nextStyle[key] - this.style[key]) * this.progress) as string | number
		}
		return result
	}
}

export default MarkerDropshadow
