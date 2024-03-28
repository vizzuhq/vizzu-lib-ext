# Vizzu Excel reader plugin

This plugin enables you to read Excel files and transform them into Vizzu compatible data. It's designed with features like:

-   Automatic sheet recognition
-   Header availability check
-   Flexible input parameters

## Install

```sh
$ npm install @vizzu/excel-reader
```

## Usage

To use the plugin, simply add it to your Vizzu instance as a feature:

```javascript
import { ExcelReader } from '@vizzu/excel-reader'

chart.features(new ExcelReader(), true)
```

You can pass your data in one of two ways.

**Via plain text:**

```javascript
chart.animate({
	data: {
		excel: {
			content: FileContent
		}
	}
})
```

The plugin accepts two input parameters:

| Name        | Type   | Description                    |
| ----------- | ------ | ------------------------------ |
| **content** | File   | File content with reader       |
| **options** | Object | Optional parsing configuration |

Additionally, it accepts an **'options'** parameter:

| Name          | Type                                                           | Default value | Description          |
| ------------- | -------------------------------------------------------------- | ------------- | -------------------- |
| **header**    | Boolean                                                        | true          | Has header           |
| **headerRow** | Number                                                         | 0             | Header row index     |
| **sheet**     | Number                                                         | 0             | Selected sheet index |
| **fileType**  | Enum ('binary', 'base64', 'array', 'string', 'buffer', 'file') | 'binary'      | Input file type      |

All parameters are optional, with default values applied if not provided.

## Extracting information

You can easily extract specific details from the excel by requesting a parameter in the following way.

```javascript
chart.feature.excelReader.headerRow
chart.feature.excelReader.sheetNames
chart.feature.excelReader.selectedSheet
chart.feature.excelReader.data
```

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
