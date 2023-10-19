# Vizzu CSV parser plugin

This plugin enables CSV file parsing and transformation into Vizzu-compatible data.

It provides an opportunity for automatic delimiter recognition and checks that the file has a header.

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

You can then pass the data to it in two ways, either via HTTP or as plain text:

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

or via URL:

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

The plugin accepts two input parameters as a data source: 'content' for plain CSV text and 'url' for a reference to the CSV file. Additionally, it accepts an 'options' parameter, which can have the following properties:

- encoding: The character encoding of the file. Default value: utf-8.
- delimiter: The delimiter used in the CSV file. Default value: ','.
- hasHeader: A boolean value (true or false) to manually specify whether the file contains a header. Default value: false.
- headers: You can specify headers if they are not present in the CSV.
- autoheader: A boolean value (true or false). If set to true, missing headers will be generated automatically; if set to false, they will not. Default value: true.
- emptyColumnPrefix: A string that defines the prefix for any empty columns. Default value: 'Column'.

All parameters are optional and have default values if not explicitly provided.

## License

Copyright © 2021-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://lib.vizzuhq.com/latest/LICENSE/).
