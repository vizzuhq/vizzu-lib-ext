export const generatedCases = () => [
	{
		fileName: 'dataset.xlsx',
		description: 'should read excel generated file',
		detected: {
			headers: [],
			sheetNames: ['Sheet1'],
			selectedSheet: 'Sheet1',
			headerRow: 1
		},
		expected: {
			series: [
				{
					name: 'Year',
					values: [
						2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2022, 2022, 2022, 2022,
						2022, 2022, 2022, 2022, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023
					]
				},
				{
					name: 'Quarter',
					values: [
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4',
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4',
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4'
					]
				},
				{
					name: 'Continent',
					values: [
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe'
					]
				},
				{
					name: 'Country',
					values: [
						'United States',
						'China',
						'Canada',
						'Germany',
						'Mexico',
						'Japan',
						'United States',
						'Germany',
						'Canada',
						'Japan',
						'Mexico',
						'Germany',
						'United States',
						'Japan',
						'Canada',
						'France',
						'United States',
						'China',
						'Mexico',
						'France',
						'United States',
						'China',
						'Canada',
						'Germany'
					]
				},
				{
					name: 'Category',
					values: [
						'Furniture',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Office Supplies',
						'Technology',
						'Furniture',
						'Furniture',
						'Office Supplies',
						'Technology',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Technology',
						'Furniture',
						'Furniture',
						'Technology',
						'Technology',
						'Office Supplies',
						'Office Supplies',
						'Technology',
						'Office Supplies'
					]
				},
				{
					name: 'Sub-Category',
					values: [
						'Bookcases',
						'Chairs',
						'Labels',
						'Tables',
						'Binders',
						'Furnishings',
						'Art',
						'Phones',
						'Chairs',
						'Tables',
						'Binders',
						'Accessories',
						'Bookcases',
						'Binders',
						'Furnishings',
						'Phones',
						'Bookcases',
						'Chairs',
						'Phones',
						'Phones',
						'Art',
						'Art',
						'Accessories',
						'Binders'
					]
				},
				{
					name: 'Items sold',
					values: [
						264, 198, 97, 268, 54, 187, 149, 47, 70, 93, 87, 154, 109, 154, 78, 251,
						116, 246, 266, 281, 266, 127, 63, 196
					]
				},
				{
					name: 'Unit price',
					values: [
						283, 92, 269, 224, 158, 180, 145, 229, 204, 94, 205, 98, 59, 198, 149, 278,
						39, 168, 165, 97, 289, 106, 250, 69
					]
				},
				{
					name: 'Revenue',
					values: [
						74712, 18216, 26093, 60032, 8532, 33660, 21605, 10763, 14280, 8742, 17835,
						15092, 6431, 30492, 11622, 69778, 4524, 41328, 43890, 27257, 76874, 13462,
						15750, 13524
					]
				},
				{
					name: 'Profit',
					values: [
						9712.56, 3461.04, 5218.6, 10205.44, 1706.4, 5722.2, 3672.85, 1076.3, 2713.2,
						1486.14, 1961.85, 2565.64, 1157.58, 5488.56, 1743.3, 11862.26, 814.32,
						7852.32, 7900.2, 4633.69, 9993.62, 1615.44, 2205, 1487.64
					]
				}
			]
		}
	},
	{
		fileName: 'music.xlsx',
		description: 'should read excel generated file',
		detected: {
			headers: [],
			sheetNames: ['Sheet1'],
			selectedSheet: 'Sheet1',
			headerRow: 1
		},
		expected: {
			series: [
				{
					name: 'Genres',
					values: [
						'Pop',
						'Rock',
						'Jazz',
						'Metal',
						'Pop',
						'Rock',
						'Jazz',
						'Metal',
						'Pop',
						'Rock',
						'Jazz',
						'Metal'
					]
				},
				{
					name: 'Kinds',
					values: [
						'Hard',
						'Hard',
						'Hard',
						'Hard',
						'Smooth',
						'Experimental',
						'Smooth',
						'Smooth',
						'Experimental',
						'Experimental',
						'Experimental',
						'Experimental'
					]
				},
				{
					name: 'Popularity',
					values: [114, 96, 78, 52, 56, 36, 174, 121, 127, 83, 94, 58]
				}
			]
		}
	},
	{
		fileName: 'c.xlsx',
		description: 'should read excel generated file (c.xlsx)',
		detected: {
			headers: [],
			sheetNames: ['Sheet1'],
			selectedSheet: 'Sheet1',
			headerRow: 1
		},
		expected: {
			series: [
				{
					name: 'Column 1',
					values: [
						'2023.05.26.',
						'2023.07.21.',
						'2023.11.14.',
						'2023.11.15.',
						'2023.11.16.',
						'2023.11.17.',
						'2023.11.18.',
						'2023.11.19.',
						'2023.11.20.',
						'2023.11.21.',
						'2023.11.22.',
						'2023.11.23.',
						'2023.11.24.',
						'2023.11.25.',
						'2023.11.26.',
						'2023.11.27.',
						'2023.11.28.',
						'2023.11.29.',
						'2023.11.30.',
						'2023.12.01.',
						'2023.12.02.',
						'2023.12.03.',
						'2023.12.04.',
						'2023.12.05.',
						'2023.12.06.',
						'2023.12.07.',
						'2023.12.08.',
						'2023.12.09.',
						'2023.12.10.',
						'2023.12.11.',
						'2023.12.12.',
						''
					]
				},
				{
					name: 'dy',
					values: [
						0, 56, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185,
						186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 0
					]
				},
				{
					name: 'dw',
					values: [
						'',
						'',
						'Tue',
						'Wed',
						'Thu',
						'Fri',
						'Sat',
						'Sun',
						'Mon',
						'Tue',
						'Wed',
						'Thu',
						'Fri',
						'Sat',
						'Sun',
						'Mon',
						'Tue',
						'Wed',
						'Thu',
						'Fri',
						'Sat',
						'Sun',
						'Mon',
						'Tue',
						'Wed',
						'Thu',
						'Fri',
						'Sat',
						'Sun',
						'Mon',
						'Tue',
						''
					]
				},
				{
					name: 'fk',
					values: [
						21002, 21494, 22985, 23010, 23030, 23044, 23044, 23044, 23065, 23090, 23110,
						23136, 23151, 23151, 23151, 23173, 23197, 23217, 23243, 23254, 23254, 23254,
						23277, 23297, 23314, 23336, 23353, 23353, 23353, 23376, 0, 0
					]
				},
				{
					name: 'dk',
					values: [
						0, 0, 0, 25, 20, 14, 0, 0, 21, 25, 20, 26, 15, 0, 0, 22, 24, 20, 26, 11, 0,
						0, 23, 20, 17, 22, 17, 0, 0, 23, 0, 0
					]
				},
				{
					name: 'fm',
					values: [
						0, 0, 2558, 2562, 2567, 2569, 0, 0, 2571, 2576, 2579, 2581, 0, 0, 0, 2588,
						2591, 2593, 2596, 2598, 0, 0, 2600, 0, 2604, 2607, 2609, 0, 0, 2611, 0, 53
					]
				},
				{
					name: 'fw',
					values: [
						0, 0, 3879, 3882, 3885, 3887, 0, 0, 3891, 3895, 3897, 3900, 0, 0, 0, 3906,
						3910, 3913, 3917, 3922, 0, 0, 3926, 0, 3931, 3934, 3937, 0, 0, 3939, 0, 0
					]
				},
				{
					name: 'fwc',
					values: [
						0, 0, 47, 47, 47, 47, 0, 0, 47, 47, 47, 47, 0, 0, 0, 47, 47, 47, 47, 48, 0,
						0, 48, 0, 48, 48, 48, 0, 0, 48, 0, 0
					]
				},
				{
					name: 'ff',
					values: [
						0, 0, 71, 71, 71, 71, 0, 0, 71, 71, 71, 71, 0, 0, 0, 72, 72, 72, 72, 72, 0,
						0, 72, 0, 72, 72, 72, 0, 0, 72, 0, 0
					]
				},
				{
					name: 'fc',
					values: [
						0, 0, 2205, 2209, 2212, 2214, 0, 0, 2216, 2219, 2221, 2222, 0, 0, 0, 2226,
						2229, 2231, 2232, 2234, 0, 0, 2234, 0, 2237, 2240, 2242, 0, 0, 2244, 0, 0
					]
				},
				{
					name: 'Column 11',
					values: [
						0, 0, 0.1112899717, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
						0, 0, 0, 0, 0, 0, 0, 0.1116957563, 1.003646192, 0
					]
				}
			]
		}
	},
	{
		fileName: 'merged.xlsx',
		description: 'should read excel merged file more sheet with first sheet',
		detected: {
			headers: [],
			sheetNames: ['music', 'dataset', 'c'],
			selectedSheet: 'music',
			headerRow: 1
		},
		expected: {
			series: [
				{
					name: 'Genres',
					values: [
						'Pop',
						'Rock',
						'Jazz',
						'Metal',
						'Pop',
						'Rock',
						'Jazz',
						'Metal',
						'Pop',
						'Rock',
						'Jazz',
						'Metal'
					]
				},
				{
					name: 'Kinds',
					values: [
						'Hard',
						'Hard',
						'Hard',
						'Hard',
						'Smooth',
						'Experimental',
						'Smooth',
						'Smooth',
						'Experimental',
						'Experimental',
						'Experimental',
						'Experimental'
					]
				},
				{
					name: 'Popularity',
					values: [114, 96, 78, 52, 56, 36, 174, 121, 127, 83, 94, 58]
				}
			]
		}
	},
	{
		fileName: 'merged.xlsx',
		description: 'should read excel merged file more sheet with second sheet',
		sheet: 1,
		detected: {
			headers: [],
			sheetNames: ['music', 'dataset', 'c'],
			selectedSheet: 'dataset',
			headerRow: 1
		},
		expected: {
			series: [
				{
					name: 'Year',
					values: [
						2021, 2021, 2021, 2021, 2021, 2021, 2021, 2021, 2022, 2022, 2022, 2022,
						2022, 2022, 2022, 2022, 2023, 2023, 2023, 2023, 2023, 2023, 2023, 2023
					]
				},
				{
					name: 'Quarter',
					values: [
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4',
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4',
						'Q1',
						'Q1',
						'Q2',
						'Q2',
						'Q3',
						'Q3',
						'Q4',
						'Q4'
					]
				},
				{
					name: 'Continent',
					values: [
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe',
						'North America',
						'Asia',
						'North America',
						'Europe'
					]
				},
				{
					name: 'Country',
					values: [
						'United States',
						'China',
						'Canada',
						'Germany',
						'Mexico',
						'Japan',
						'United States',
						'Germany',
						'Canada',
						'Japan',
						'Mexico',
						'Germany',
						'United States',
						'Japan',
						'Canada',
						'France',
						'United States',
						'China',
						'Mexico',
						'France',
						'United States',
						'China',
						'Canada',
						'Germany'
					]
				},
				{
					name: 'Category',
					values: [
						'Furniture',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Office Supplies',
						'Technology',
						'Furniture',
						'Furniture',
						'Office Supplies',
						'Technology',
						'Furniture',
						'Office Supplies',
						'Furniture',
						'Technology',
						'Furniture',
						'Furniture',
						'Technology',
						'Technology',
						'Office Supplies',
						'Office Supplies',
						'Technology',
						'Office Supplies'
					]
				},
				{
					name: 'Sub-Category',
					values: [
						'Bookcases',
						'Chairs',
						'Labels',
						'Tables',
						'Binders',
						'Furnishings',
						'Art',
						'Phones',
						'Chairs',
						'Tables',
						'Binders',
						'Accessories',
						'Bookcases',
						'Binders',
						'Furnishings',
						'Phones',
						'Bookcases',
						'Chairs',
						'Phones',
						'Phones',
						'Art',
						'Art',
						'Accessories',
						'Binders'
					]
				},
				{
					name: 'Items sold',
					values: [
						264, 198, 97, 268, 54, 187, 149, 47, 70, 93, 87, 154, 109, 154, 78, 251,
						116, 246, 266, 281, 266, 127, 63, 196
					]
				},
				{
					name: 'Unit price',
					values: [
						283, 92, 269, 224, 158, 180, 145, 229, 204, 94, 205, 98, 59, 198, 149, 278,
						39, 168, 165, 97, 289, 106, 250, 69
					]
				},
				{
					name: 'Revenue',
					values: [
						74712, 18216, 26093, 60032, 8532, 33660, 21605, 10763, 14280, 8742, 17835,
						15092, 6431, 30492, 11622, 69778, 4524, 41328, 43890, 27257, 76874, 13462,
						15750, 13524
					]
				},
				{
					name: 'Profit',
					values: [
						9712.56, 3461.04, 5218.6, 10205.44, 1706.4, 5722.2, 3672.85, 1076.3, 2713.2,
						1486.14, 1961.85, 2565.64, 1157.58, 5488.56, 1743.3, 11862.26, 814.32,
						7852.32, 7900.2, 4633.69, 9993.62, 1615.44, 2205, 1487.64
					]
				}
			]
		}
	}
]
