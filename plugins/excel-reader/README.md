# Vizzu CSV parser plugin

This plugin enables you to parse CSV files and transform them into Vizzu compatible data. It's designed with features like:

-   Automatic delimiter recognition
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

You can pass your data in one of two ways.<be></br>
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

The plugin accepts two input parameters as a data source:

| Name        | Type   | Description               |
| ----------- | ------ | ------------------------- |
| **content** | File   | File content with reader  |

Additionally, it accepts an **'options'** parameter with various properties to customize the behavior of the parser:

| Name                  | Type    | Default value | Description                                                                               |
| --------------------- | ------- | ------------- | ----------------------------------------------------------------------------------------- |                           |
| **headers**           | Array   | []            | An array of strings providing headers if they are not present in the CSV file.            |
| **autoheader**        | Boolean | True          | A boolean value indicating whether to generate headers automatically if they are missing. |                               |

All parameters are optional, with default values applied if not provided.

## Extracting information

You can easily extract specific details from the excel by requesting a parameter in the following way.

```javascript
chart.feature.excelReader.delimiter
chart.feature.excelReader.data
```

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
