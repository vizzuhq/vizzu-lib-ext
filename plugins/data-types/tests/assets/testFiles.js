export const testCases = () => {
	return [
		{
			file: './tests/fixtures/year-quearter-and-three-date-types.csv',
			description: 'Year, Quarter, unit and three date types',
			series: [
				{
					name: 'Year',
					type: 'dimension',
					meta: {
						type: 'year',
						dataTypes: 'date',
						dependencies: []
					}
				},
				{
					name: 'Quarter',
					type: 'dimension',
					meta: {
						type: 'quarter',
						dataTypes: 'date',
						dependencies: ['year']
					}
				},
				{
					name: 'Continent',
					type: 'dimension',
					meta: {
						type: 'string',
						dataTypes: 'string',
						dependencies: []
					}
				},
				{
					name: 'Country',
					type: 'dimension',
					meta: {
						type: 'string',
						dataTypes: 'string',
						dependencies: []
					}
				},
				{
					name: 'Category',
					type: 'dimension',
					meta: {
						type: 'string',
						dataTypes: 'string',
						dependencies: []
					}
				},
				{
					name: 'Sub-Category',
					type: 'dimension',
					meta: {
						type: 'string',
						dataTypes: 'string',
						dependencies: []
					}
				},
				{
					name: 'Items sold',
					type: 'measure',
					meta: {
						type: 'number',
						dataTypes: 'number',
						dependencies: []
					}
				},
				{
					name: 'Unit price',
					type: 'measure',
					unit: '$',
					meta: {
						type: 'number',
						dataTypes: 'number',
						dependencies: []
					}
				},
				{
					name: 'Revenue',
					type: 'measure',
					meta: {
						type: 'number',
						dataTypes: 'number',
						dependencies: []
					}
				},
				{
					name: 'Profit',
					type: 'measure',
					meta: {
						type: 'number',
						dataTypes: 'number',
						dependencies: []
					}
				},
				{
					name: 'Date',
					type: 'dimension',
					meta: {
						type: 'date',
						dataTypes: 'date',
						dependencies: []
					}
				},
				{
					name: 'Time',
					type: 'dimension',
					meta: {
						type: 'date',
						dataTypes: 'time',
						dependencies: []
					}
				},
				{
					name: 'DateTime',
					type: 'dimension',
					meta: {
						type: 'date',
						dataTypes: 'datetime',
						dependencies: []
					}
				}
			]
		}
	]
}
