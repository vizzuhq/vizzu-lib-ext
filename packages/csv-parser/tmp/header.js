const delimiter = ",";
const content = `Genres,Kinds,Popularity
Rock,Hard,96
Jazz,Hard,78
,Hard,52
Pop,ASD,
Rock,Experimental,36
,Smooth,174
Metal,Smooth,121
Pop,Experimental,127
Rock,Experimental,
Jazz,Experimental,94
Metal,Experimental,58`;

const getType = (value) => {
  if (!value || value === "") return "undefined";
  if (typeof value === "number") return "number";
  if (typeof value !== "string") return "string";
  try {
    //try convert to number
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/,/g, ".")
      .replace(/^[−–—]/, "-")
      .replace(/[\u2012\u2013\u2014\u2015]/g, "-");
    return !isNaN(Number(formattedValue)) ? "number" : "string";
  } catch (e) {
    return "string";
  }
};

let allData = content
  .replace("\n\n", "\n")
  .split("\n")
  .map((line) => line.split(delimiter));

const headers = allData.shift();

// CALCULATE UNIQUENESS PERCENTAGE
const calculateUniquenessPercentage = (data) => {
  const header = data.filter((item) => item && item !== null && item !== "");
  const flattenedArr = header.flat();
  const uniqueValues = new Set(flattenedArr.filter(Boolean));

  const totalValues = flattenedArr.length;
  const uniqueValueCount = uniqueValues.size;

  const uniquenessPercentage = (uniqueValueCount / totalValues) * 100;

  return uniquenessPercentage;
};
const uniquenessPercentage = calculateUniquenessPercentage(headers);
console.log("Unique header content percentage: ", uniquenessPercentage);

// CALCULATE TYPE PERCENTAGE
const calculateTypePercentage = (data) => {
  const header = data.filter((item) => item !== "undefined");
  const filteredArr = header.filter((item) => item && item === "string");

  if (filteredArr.length === 0) {
    return 0;
  }

  const stringPercentage = (filteredArr.length / header.length) * 100;
  return stringPercentage;
};

const headerTypes = headers.map((header) => getType(header));
const stringPercentage = calculateTypePercentage(headerTypes);
console.log("Equal header type percentage: ", stringPercentage);

// TRANSPOSE DATA
const transposed = allData[0].map((_, colIndex) => allData.map(row => row[colIndex]));

// CHECK HEADER VALUE IS EXIST IN DATA
const checkHeaderExistInData = (data, header) => {
  const existsCounts = data.map((row, key) => {
    const includes = row.filter(item => item === header[key]).length / row.length * 100;
    return includes
})
  const result = existsCounts.filter(item => item > 0).length / existsCounts.length * 100;
  return 100-result
};

const headerExistInData = checkHeaderExistInData(transposed, headers);
console.log("Data includes header percentage: ", headerExistInData);

// CALCULATE DIFFERENCE PERCENTAGE
allData = allData.map((data, rowKey) => {
  return data.map((element, dataIndex) => {
    const currentType = getType(element);
    if (currentType === "undefined" && rowKey > 0) {
      return getType(allData[rowKey-1][dataIndex]);
    }
    return currentType;
  });
});

function calculateDifferencePercentage(headerTypes, dataList) {
  let nonMatchingCount = 0;

  for (const row of dataList) {
    if (headerTypes.length === row.length && headerTypes.join(",") !== row.join(",")) {
      nonMatchingCount++;
    }
  }

  const differencePercentage = (nonMatchingCount / dataList.length) * 100;
  return differencePercentage;
}

const diffPercentage = calculateDifferencePercentage(headerTypes, allData);
console.log("Row and header type difference percentage: ", diffPercentage);



const percentPoint = {
  "uniqueHeader": 1,
  "onlyString": 3,
  "typePercent": 8,
  "headerExistInData": 6
}

function calculateCombinedProbability(params) {
  let counter = 0;
  const keys = Object.keys(params);
  const pointedValues = keys.map(key => { const point = percentPoint[key] | 1; counter += point; return params[key] * point});
  return pointedValues.reduce((a, b) => a + b) / counter;
}

const result = calculateCombinedProbability({
  "uniqueHeader": uniquenessPercentage,
  "onlyString": stringPercentage,
  "typePercent": diffPercentage,
  "headerExistInData": headerExistInData
})

console.log("\nThe probability that it has a header: ",result)

