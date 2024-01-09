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
	constructor(options: Options)
	register(chart: Vizzu): void
	_init(): void
}
