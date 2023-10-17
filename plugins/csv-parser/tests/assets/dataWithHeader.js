const column = Math.round(Math.random() * 10) + 4;
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const header =
  '"' +
  [...Array(column).keys()].map((key) => alphabet[key]).join('","') +
  '"\n';

const generateData = (
  row,
  column,
  random = true,
  emptycols = false,
  types = false,
  addHeader = false
) => {
  let data = "";
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (emptycols && Math.random() > 0.89) {
        if (types !== false && types[j] === "string") {
          data += '""';
        }
      } else if (types !== false && types[j] === "string") {
        if (addHeader && Math.random() > 0.89) {
          data += '"' + alphabet[j] + '"';
        } else {
          data += '"' + (Math.random() + 1).toString(36).substring(7) + '"';
        }
      } else {
        data += random ? Math.round(Math.random() * 1000) : i + j;
      }
      data += j < column - 1 ? "," : i < row - 1 ? "\n" : "";
    }
  }
  return data;
};

const moreDataCsv = [];

const oneData = {
  description: "one data row",
  input: header + generateData(1, column),
  separator: ",",
  excepted: {
    csv: "",
    header: 1,
    noheader: 0.1
  },
};
moreDataCsv.push(oneData);

for (let i = 0; i < 20; i++) {
  const row = Math.floor(Math.random() * 1000) + 10;
  const data = {
    description: `${row} data row`,
    input: header + generateData(row, column),
    separator: ",",
    excepted: {
      csv: "",
      header: 1,
      noheader: 0.4
    },
  };
  moreDataCsv.push(data);
}

for (let i = 0; i < 20; i++) {
  const row = Math.floor(Math.random() * 1000) + 10;
  const data = {
    description: `${row} data row with empty data`,
    input: header + generateData(row, column, true, true),
    separator: ",",
    excepted: {
      csv: "",
      header: 1,
      noheader: 0.5
    },
  };
  moreDataCsv.push(data);
}

for (let i = 0; i < 20; i++) {
  const row = Math.floor(Math.random() * 1000) + 10;
  const data = {
    description: `${row} data row with strings`,
    input:
      header +
      generateData(row, column, true, true, [
        "string",
        "number",
        "number",
        "number",
      ]),
    separator: ",",
    excepted: {
      csv: "",
      header: 1,
      noheader: 0.6
    },
  };
  moreDataCsv.push(data);
}

for (let i = 0; i < 20; i++) {
  const row = Math.floor(Math.random() * 1000) + 10;
  const data = {
    description: `${row} data row with empty datas and strings`,
    input:
      header +
      generateData(row, column, true, false, [
        "string",
        "number",
        "number",
        "string",
      ]),
    separator: ",",
    excepted: {
      csv: "",
      header: 1,
      noheader: 0.7
    },
  };
  moreDataCsv.push(data);
}

for (let i = 0; i < 20; i++) {
  const row = Math.floor(Math.random() * 1000) + 10;
  const data = {
    description: `${row} data row with empty datas and strings and data includes header`,
    input:
      header +
      generateData(
        row,
        column,
        true,
        false,
        ["string", "number", "number", "string"],
        true
      ),
    separator: ",",
    excepted: {
      csv: "",
      header: 0.80,
      noheader: 0.6
    },
  };
  moreDataCsv.push(data);
}
export { moreDataCsv };
