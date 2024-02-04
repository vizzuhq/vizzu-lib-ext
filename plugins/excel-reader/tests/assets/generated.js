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
		fileName: 'merged.xlsx',
		description: 'should read excel merged file more sheet with first sheet',
		detected: {
			headers: [],
			sheetNames: ['music', 'dataset'],
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
			sheetNames: ['music', 'dataset'],
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
