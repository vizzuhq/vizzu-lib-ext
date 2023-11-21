import { PrepareAnimationContext } from 'vizzu/dist/plugins';
import { Marker, Guides, MarkerLabel } from 'vizzu/dist/types/styles';
type Next = () => void;
export interface ShadowedMarker {
    borderWidth?: number | null;
    /** Opacity of the marker border. */
    borderOpacity?: number | null;
    borderOpacityMode?: 'straight' | 'premultiplied' | null;
    /** Opacity of the marker fill color. */
    fillOpacity?: number | null;
    /** Style settings for guide lines drawn for the markers. */
    guides?: Guides | null;
    /** Style settings for the marker labels. */
    label?: MarkerLabel | null;
    /** Marker shape. */
    color?: string;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
    plot?: {
        marker?: Marker;
    };
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
}
export declare class MarkerDropshadow {
    private style;
    private nextStyle;
    private progress;
    private defaultStyle;
    constructor();
    meta: {
        name: string;
        version: string;
        depends: any[];
    };
    get listeners(): {
        update: (event: CustomEvent<{
            progress: number;
        }>) => void;
        'plot-marker-draw': any;
        'plot-marker-label-draw': any;
    };
    hooks: {
        prepareAnimation: (ctx: PrepareAnimationContext, next: Next) => void;
    };
    _prepareStyle(style: ShadowedMarker): ShadowedMarker;
    _setDropshadow(event: {
        renderingContext: CanvasRenderingContext2D | ShadowedMarker;
    }): void;
    _actStyle(): {};
}
