import { globSync } from 'glob'

export const filesWithHeaders = () => {
  const files = globSync('./tests/fixtures/headers/*.csv')

  const exception = {
    './tests/fixtures/headers/deficient-headers.csv': 0.84
  }
  return files.map((file) => {
    return {
      description: `file: ${file}`,
      input: file,
      separator: ',',
      excepted: {
        csv: '',
        header: exception[file] || 1
      }
    }
  })
}

export const filesWithoutHeaders = () => {
  const files = globSync('./tests/fixtures/noheaders/*.csv')
  return files.map((file) => {
    return {
      description: `file: ${file}`,
      input: file,
      separator: ',',
      excepted: {
        csv: '',
        header: 0.5
      }
    }
  })
}

export const filesCustomSeparator = () => {
  const files = [
    {
      input: './tests/fixtures/custom-separator/backtick.csv',
      separator: '`'
    },
    {
      input: './tests/fixtures/custom-separator/pipe.csv',
      separator: '|'
    },
    {
      input: './tests/fixtures/custom-separator/semicolon.csv',
      separator: ';'
    },
    {
      input: './tests/fixtures/custom-separator/tabs.csv',
      separator: '\t'
    },
    {
      input: './tests/fixtures/custom-separator/whitespace.csv',
      separator: ' ',
      columns: ['a a a', 'b b b', 'c   c c', 'd d', 'e', 'f  f f']
    }
  ]
  return files.map((file) => {
    return {
      description: `file: ${file.input} (separator: ${file.separator})`,
      input: file.input,
      separator: file.separator,
      excepted: {
        csv: '',
        header: 1,
        columns: file?.columns || ['a', 'b', 'c', 'd', 'e', 'f'],
        values: [
          ['1', '7', '13', '19'],
          ['2', '8', '14', '20'],
          ['3', '9', '15', '21'],
          ['4', '10', '16', '22'],
          ['5', '11', '17', '23'],
          ['6', '12', '18', '24']
        ]
      }
    }
  })
}

export const filesCustomCharset = () => {
  const files = [
    {
      input: './tests/fixtures/custom-charset/latin.csv',
      charset: 'ascii'
    },
    {
      input: './tests/fixtures/custom-charset/utf8.csv',
      charset: 'utf8'
    },
    {
      input: './tests/fixtures/custom-charset/utf16-big.csv',
      charset: 'utf16'
    },
    {
      input: './tests/fixtures/custom-charset/utf16.csv',
      charset: 'utf16'
    },
    {
      input: './tests/fixtures/custom-charset/base64.csv',
      charset: 'base64',
      length: 1
    }
  ]
  return files.map((file) => {
    return {
      description: `file: ${file.input} (separator: ${file.charset})`,
      input: file.input,
      separator: file.charset,
      excepted: {
        csv: '',
        header: 1,
        length: file?.length || 3
      }
    }
  })
}
