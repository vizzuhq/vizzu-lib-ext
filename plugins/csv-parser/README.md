# Vizzu CSV parser plugin

This plugin enables you to parse CSV files and transform them into Vizzu compatible data. It's designed with features like:
- Automatic delimiter recognition
- Header availability check
- Flexible input parameters

## Install

```sh
$ npm install @vizzu/csv-parser
```

## Usage

To use the plugin, simply add it to your Vizzu instance as a feature:


```javascript
import { CSVParser } from "@vizzu/csv-parser";

chart.features(new CSVParser(), true);
```

You can pass your data in one of two ways.<be></br> 
**Via plain text:**

```javascript
chart.animate({
    data: {
        csv: {
            content: contentText,
            options: {
                encoding: 'utf8'
            }
        }
    }
})
```

**Via URL:**

```javascript
chart.animate({
    data: {
        csv: {
            url: 'https://yourdomain.com/data.csv',
            options: {
                encoding: 'utf8'
            }
        }
    }
})

```

The plugin accepts two input parameters as a data source: 
- **'content'** for plain CSV text
- **'url'** for a reference to the CSV file

Additionally, it accepts an **'options'** parameter with various properties to customize the behavior of the parser:
- *encoding:* The character encoding of the file. Default value: utf-8.
- *delimiter:* The delimiter used in the CSV file. Default value: ','.
- *hasHeader:* A boolean value specifying whether the file contains a header. The default value is false.
- *headers:* An array of strings providing headers if they are not present in the CSV file.
- *autoheader:* A boolean value indicating whether to generate headers automatically if they are missing. The default value is true.
- *emptyColumnPrefix:* A string defining the prefix for any empty columns. The default value is 'Column'.

All parameters are optional, with default values applied if not provided.

## Extracting information

You can easily extract specific details from the csv by requesting a parameter in the following way.

```javascript
chart.feature.csvParser.hasHeader
chart.feature.csvParser.delimiter
chart.feature.csvParser.data
```
Three pieces of data can be extracted: the separator (that was specified or automatically recognized), whether the file contains a header or not, and the parsed data structured for Vizzu.

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
