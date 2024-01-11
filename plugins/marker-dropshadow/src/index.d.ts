import { PrepareAnimationContext } from 'vizzu/dist/plugins'
import { Marker, Guides, MarkerLabel } from 'vizzu/dist/types/styles'
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
export declare class MarkerDropshadow {
	private style
	private nextStyle
	private progress
	private defaultStyle
	constructor()
	meta: {
		name: string
		version: string
		depends: string[]
	}
	constructor(params: ConstructorParams)
	get listeners(): {
		update: (
			event: CustomEvent<{
				progress: number
			}>
		) => void
		'plot-marker-draw': () => void
		'plot-marker-label-draw': () => void
	}
	hooks: {
		prepareAnimation: (ctx: PrepareAnimationContext, next: Next) => void
	}
	_prepareStyle(style: ShadowedMarker): ShadowedMarker
	_setDropshadow(event: { renderingContext: CanvasRenderingContext2D | ShadowedMarker }): void
	_actStyle(): unknown
}

export default MarkerDropshadow
