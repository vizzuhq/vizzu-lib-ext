# Vizzu vide capture plugin

This plugin create video from the chart animation.

## Install

```sh
$ npm install @vizzu/video-capture
```

## Usage

To use the plugin, simply add it to your Vizzu instance as a feature:


```javascript
import { VideoCapture } from "@vizzu/video-capture";

await chart.initializing
chart.features(new VideoCapture(), true);

```

After registration it is possible to start and stop the recording. 
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

The plugin offers two functions, start for recording and stop for stopping.

```javascript
chart.feature.videoCapture.start()
chart.feature.videoCapture.stop()
```

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
