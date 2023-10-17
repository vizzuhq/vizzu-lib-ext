
export const delimiterDetect = (data: string): string => {
    let content = data;
    // Remove all escaped characters
    content = content.replace(/\\./g, "");
    // Remove all quoted characters
    content = content.replace(/".*?"/gs, "0");
    // Remove all empty lines
    content = content.replace(/^\s*[\r\n]/gm, "");
    // Split by new line
    const lines = content.split(/[\r\n]/); 
    if (lines.at(-1) === "") {
        lines.pop();
    }

    const delimiters = ["\t", ";", ",", "|", "^", "~", ":", " ", "`"];
    const results: { [key: string]: number } = {};
    const resultByLine: { [key: string]: number[] } = {};
    delimiters.forEach((delimiter) => {
        results[delimiter] = 0;
        resultByLine[delimiter] = [];
    });

    lines.forEach((line) => {
        delimiters.forEach((delimiter) => {
            const count = line.split(delimiter).length;
            resultByLine[delimiter].push(count-1);
            results[delimiter] += count-1;
        });
    });

    // clean is 0 result
    Object.keys(results).forEach((key) => {
        if (results[key] === 0) {
            delete results[key];
            delete resultByLine[key];
        }
    });

    const possibleDelimiters = Object.keys(results);
    if (possibleDelimiters.length === 1) {
        return possibleDelimiters[0];
    }

    // Calculate the average of all the numbers
const calculateMean = (values: number[]): number => {
    const mean = (values.reduce((sum, current) => sum + current)) / values.length;
    return mean;
  }
  
  // Calculate variance
  const calculateVariance= (values: number[]): number => {
    const average = calculateMean(values);
    const squareDiffs = values.map((value: number): number => {
      const diff = value - average;
      return diff * diff;
    })
  
    const variance = calculateMean(squareDiffs);
    return variance;
  }
  
  // Calculate stand deviation
  const calculateSD = (variance: number): number => {
    return  Math.sqrt(variance);
  }
  
  // Test it
  const varianceElements = Object.keys(resultByLine).map(key => {
    const line = resultByLine[key];

    const variance = calculateVariance(line);
    const sd = calculateSD(variance);
    return { delimiter: key, value: sd };
  }).filter(sd => sd.value < 0.1).sort(element => element.value)
  
  if (varianceElements.length === 1) {
    return varianceElements[0].delimiter;
  }

  
  if (varianceElements.length > 1) {
    const variancedKeys = varianceElements.map(element => element.delimiter);
    delimiters.forEach((delimiter) => {
        if (variancedKeys.includes(delimiter)) {
            return delimiter;
        }
      })
  }

  return ",";
}