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
						format: 'date',
						dependencies: []
					}
				},
				{
					name: 'Quarter',
					type: 'dimension',
					meta: {
						type: 'quarter',
						format: 'date',
						dependencies: ['year']
					}
				},
				{
					name: 'Continent',
					type: 'dimension',
					meta: {
						type: 'string',
						format: 'string',
						dependencies: []
					}
				},
				{
					name: 'Country',
					type: 'dimension',
					meta: {
						type: 'string',
						format: 'string',
						dependencies: []
					}
				},
				{
					name: 'Category',
					type: 'dimension',
					meta: {
						type: 'string',
						format: 'string',
						dependencies: []
					}
				},
				{
					name: 'Sub-Category',
					type: 'dimension',
					meta: {
						type: 'string',
						format: 'string',
						dependencies: []
					}
				},
				{
					name: 'Items sold',
					type: 'measure',
					meta: {
						type: 'number',
						format: 'number',
						dependencies: []
					}
				},
				{
					name: 'Unit price',
					type: 'measure',
					unit: '$',
					meta: {
						type: 'number',
						format: 'number',
						dependencies: []
					}
				},
				{
					name: 'Revenue',
					type: 'measure',
					meta: {
						type: 'number',
						format: 'number',
						dependencies: []
					}
				},
				{
					name: 'Profit',
					type: 'measure',
					meta: {
						type: 'number',
						format: 'number',
						dependencies: []
					}
				},
				{
					name: 'Date',
					type: 'dimension',
					meta: {
						type: 'date',
						format: 'date',
						dependencies: []
					}
				},
				{
					name: 'Time',
					type: 'dimension',
					meta: {
						type: 'date',
						format: 'time',
						dependencies: []
					}
				},
				{
					name: 'DateTime',
					type: 'dimension',
					meta: {
						type: 'date',
						format: 'datetime',
						dependencies: []
					}
				}
			]
		}
	]
}
