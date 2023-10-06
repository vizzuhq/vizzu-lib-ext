const IMPORTANCEWEIGHT = {
  uniqueHeaderProbalility: 1,
  headerTypesProbability: 5,
  headerFrequencyProbability: 5,
  dataTypesDifference: 5,
};

const getType = (value: string | number): string => {
  if (!value || value === "") return "undefined";
  if (typeof value === "number") return "number";
  if (typeof value !== "string") return "string";
  try {
    // remove special langue number formatters (e.g. 1 000 000,01)
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

const simpleParseData = (data: string, delimeter: string = ","): string[][] => {
  return data
    .replace("\n\n", "\n")
    .split("\n")
    .map((line) => line.split(delimeter));
};

const percentOfUniqueItems = (rowValues: string[]): number => {
  const clearedValues = rowValues.filter(
    (element: string) => element && element !== null && element !== ""
  );
  if (clearedValues.length === 0) return 0;

  const flattenedArr = clearedValues.flat();
  const uniqueValues = new Set(flattenedArr.filter(Boolean));

  const totalValues = flattenedArr.length;
  const uniqueValueCount = uniqueValues.size;

  return (uniqueValueCount / totalValues) * 100;
};

const percentOfTypes = (rowValues: string[]): number => {
  const clearedValues = rowValues.filter((element) => element !== "undefined");
  const filteredItems = clearedValues.filter(
    (element) => element && element === "string"
  );

  if (filteredItems.length === 0) return 0;

  return (filteredItems.length / rowValues.length) * 100;
};

const percentOfFrequency = (rowValues: string[][], items: string[]): number => {
  const existsCounts = rowValues.map((rowData, rowKey) => {
    const equalItems = rowData.filter((element) => element === items[rowKey]);
    return (equalItems.length / rowData.length) * 100;
  });

  const filteredItems = existsCounts.filter((item) => item > 0);
  const probabilityPercent = (filteredItems.length / existsCounts.length) * 100;
  return 100 - probabilityPercent;
};

const percentOfDifference = (values: string[][], types: string[]): number => {
  let nonMatchingCount = 0;

  for (const row of values) {
    if (types.length === row.length && types.join(",") !== row.join(",")) {
      nonMatchingCount++;
    }
  }
  return (nonMatchingCount / values.length) * 100;
};

const convertValuesToTypes = (rowValues: string[][]): string[][] => {
  return rowValues.map((rowData, rowKey) => {
    return rowData.map((element, dataIndex) => {
      const currentType = getType(element);
      if (currentType === "undefined" && rowKey > 0) {
        return getType(rowValues[rowKey - 1][dataIndex]);
      }
      return currentType;
    });
  });
};

export const headerDetect = (data: string, delimeter: string = ","): number => {
  const parsedData = simpleParseData(data, delimeter);
  if (parsedData.length < 2) return 0;

  const headers = parsedData.shift();
  if (!headers) return 0;

  const probabilites = [];
  let probabilitesCount = 0;
  const uniqueHeaderProbalility = percentOfUniqueItems(headers);
  probabilites.push(uniqueHeaderProbalility * (IMPORTANCEWEIGHT.uniqueHeaderProbalility | 1));
  probabilitesCount += IMPORTANCEWEIGHT.uniqueHeaderProbalility | 1;


  const headerTypes = headers.map((header) => getType(header));
  const headerTypesProbability = percentOfTypes(headerTypes);
  probabilites.push(headerTypesProbability * (IMPORTANCEWEIGHT.headerTypesProbability | 1));
  probabilitesCount += IMPORTANCEWEIGHT.headerTypesProbability | 1;

  const transposedData = parsedData[0].map((_, colIndex) =>
    parsedData.map((row) => row[colIndex])
  );
  const headerFreqProbability = percentOfFrequency(transposedData, headers);
  probabilites.push(headerFreqProbability * (IMPORTANCEWEIGHT.headerFrequencyProbability | 1));
  probabilitesCount += IMPORTANCEWEIGHT.headerFrequencyProbability | 1;


  const dataTypes = convertValuesToTypes(parsedData);
  const dataTypesDifference = percentOfDifference(dataTypes, headerTypes);
  probabilites.push(dataTypesDifference * (IMPORTANCEWEIGHT.dataTypesDifference | 1));
  probabilitesCount += IMPORTANCEWEIGHT.dataTypesDifference | 1;

  return probabilites.reduce((a, b) => a + b) /  probabilitesCount /100;
};
