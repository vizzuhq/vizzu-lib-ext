# Vizzu video capture plugin

This plugin allows you to create videos from chart animations in Vizzu.

## Install

```sh
$ npm install @vizzu/video-capture
```

## Usage

To use the plugin, simply add it to your Vizzu instance as a feature:

```javascript
import { VideoCapture } from '@vizzu/video-capture'

await chart.initializing
chart.feature(new VideoCapture(), true)
```

Once registered, you can start and stop the recording as needed:

```javascript
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
```

## Extracting information

The plugin provides two functions, <code>start()</code> to begin the recording and <code>stop()</code> to end it.

```javascript
chart.feature.videoCapture.start()
chart.feature.videoCapture.stop()
```

## Contributing

### Release

If you need to change the `Vizzu` version number in the plugins, use the following command:

`yarn node tools/updateVizzuMinorVersion.cjs <version>`

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
