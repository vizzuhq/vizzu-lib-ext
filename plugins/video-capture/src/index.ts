import { Vizzu } from 'vizzu'
import { Plugin } from 'vizzu/dist/plugins'

export interface Options {
	stream: { frameRate: number }
	recorder: { mimeType: string }
	output: { mimeType: string }
}
export class VideoCapture implements Plugin {
	private mediaRecorder: MediaRecorder
	private _rendered: (result: { blob: Blob; getObjectURL: () => string }) => void
	private chart: Vizzu
	private options: Options

	meta = {
		name: 'videoCapture',
		version: '0.9.0',
		depends: ['htmlCanvas']
	}

	get api() {
		return {
			start: () => {
				this.mediaRecorder.start()
			},
			stop: () => {
				const completed = new Promise((resolve) => {
					this._rendered = resolve
				})
				this.mediaRecorder.stop()
				return completed
			}
		}
	}

	constructor(options: Options) {
		this.options = {
			stream: { frameRate: options?.stream.frameRate || 30 },
			recorder: { mimeType: options?.recorder.mimeType || 'video/webm' },
			output: options?.output || {
				mimeType: options?.output?.mimeType || options?.recorder?.mimeType || 'video/webm'
			}
		}
	}

	register(chart: Vizzu) {
		this.chart = chart
		this._init()
	}

	_init() {
		const recordedChunks: Blob[] = []
		const stream = this.chart.feature.htmlCanvas.element.captureStream(
			this.options.stream.frameRate
		)
		this.mediaRecorder = new MediaRecorder(stream, this.options.recorder)

		this.mediaRecorder.ondataavailable = (e) => {
			recordedChunks.push(e.data)
		}

		this.mediaRecorder.onstop = () => {
			const blob = new Blob(recordedChunks, {
				type: this.options.output.mimeType
			})
			this._init()
			this._rendered({ blob, getObjectURL: () => URL.createObjectURL(blob) })
		}
	}
}

export default VideoCapture
