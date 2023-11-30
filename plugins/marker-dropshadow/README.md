# Vizzu marker drop shadow plugin

This plugin enables the addition of drop shadows to markers in Vizzu charts.

## Install

```sh
$ npm install @vizzu/marker-dropshadow
```

## Usage

To use the plugin, simply add it to your Vizzu instance as a feature and configure the marker parameters:

```javascript
import { MarkerDropshadow } from '@vizzu/marker-dropshadow'

chart.features(new MarkerDropshadow(), true)

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
```

This plugin adds the following parameters to the style object:

| Key               | Type   | Default value | Description                          |
| ----------------- | ------ | ------------- | ------------------------------------ |
| **shadowColor**   | String | #00000060     | Hexadecimal rgba color code          |
| **shadowBlur**    | Number | 9             | The blur radius.                     |
| **shadowOffsetX** | Number | 3             | The horizontal offset of the shadow. |
| **shadowOffsetY** | Number | 3             | The vertical offset of the shadow.   |

All parameters are optional, with default values applied if not provided.

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
