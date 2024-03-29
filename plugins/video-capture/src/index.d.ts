import { Vizzu } from 'vizzu'
import { Plugin } from 'vizzu/dist/plugins'
export interface Options {
	stream: {
		frameRate: number
	}
	recorder: {
		mimeType: string
	}
	output: {
		mimeType: string
	}
}
export interface ConstructorParams {
	options?: Options
}
export declare class VideoCapture implements Plugin {
	private mediaRecorder
	private _rendered
	private chart
	private options
	meta: {
		name: string
		version: string
		depends: string[]
	}
	get api(): {
		start: () => void
		stop: () => Promise<unknown>
	}
	constructor(params: ConstructorParams)
	register(chart: Vizzu): void
	_init(): void
}

export default VideoCapture
