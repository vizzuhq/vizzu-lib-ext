import fs from 'fs'

export const vizzuHookTestCases = []

const basic = {
  description: 'basic',
  data: {
    csv: {
      content: fs.readFileSync('./tests/fixtures/headers/basic.csv', 'utf8')
    }
  },
  excepted: {
    series: [
      { name: 'a', values: [1] },
      { name: 'b', values: [2] },
      { name: 'c', values: [3] }
    ]
  }
}

vizzuHookTestCases.push(basic)

const noHeaders = {
  description: 'no headers',
  data: {
    csv: {
      content: fs.readFileSync('./tests/fixtures/noheaders/no-headers.csv', 'utf8')
    }
  },
  excepted: {
    series: [
      { name: 'Column1', values: [1, 4, 7] },
      { name: 'Column2', values: [2, 5, 8] },
      { name: 'Column3', values: [3, 6, 9] }
    ]
  }
}

vizzuHookTestCases.push(noHeaders)

const customSeparator = {
  description: 'custom separator',
  data: {
    csv: {
      content: fs.readFileSync('./tests/fixtures/custom-separator/semicolon.csv', 'utf8'),
      options: {
        delimiter: ';'
      }
    }
  },
  excepted: {
    series: [
      { name: 'a', values: [1, 7, 13, 19] },
      { name: 'b', values: [2, 8, 14, 20] },
      { name: 'c', values: [3, 9, 15, 21] },
      { name: 'd', values: [4, 10, 16, 22] },
      { name: 'e', values: [5, 11, 17, 23] },
      { name: 'f', values: [6, 12, 18, 24] }
    ]
  }
}

vizzuHookTestCases.push(customSeparator)
