import { expect, test, describe } from "vitest";
import { CSVParser } from "../src/index";

import { CSVParser as BrowserParser } from "../src/browser";

const parser = new CSVParser();
describe("csv read", () => {
  test("reads empty file", () => {
    const source = "";
    const sourceContent = parser.readCSVFile(source);
    expect(sourceContent).toEqual("");
  });
  test("reads file", () => {
    const source = "./tests/testsources/music.csv";
    const sourceContent = parser.readCSVFile(source);
    expect(sourceContent).not.toEqual("");
    const lines = sourceContent.split("\n");
    expect(lines[0]).toEqual("Genres,Kinds,Popularity");
    expect(lines.at(-1)).toEqual("Metal,Experimental,58");
  });
});

describe("parser", () => {
  const parserNames = ["CSVParser", "BrowserParser"];
  [CSVParser, BrowserParser].forEach((parserInstance, key) => {
    describe(parserNames[key], () => {
      const parser = new parserInstance();
      test("does not add data on empty input", async () => {
        const data = await parser.parse("");
        expect(data).toBeNull();
      });

      describe("manual data", () => {
        const exceptedData = [
          { name: "a", values: ["1"] },
          { name: "b", values: ["2"] },
          { name: "c", values: ["3"] },
          { name: "d", values: ["4"] },
        ];

        test("loads data to records", async () => {
          const data = await parser.parse('"a","b","c","d"\n"1","2","3","4"');
          expect(typeof parser.error).toBe("undefined");
          expect("series" in data).toBe(true);
          expect(data.series.length).toEqual(4);
          expect(data.series).toEqual(exceptedData);
        });
        test("load data with custom (;) separator", async () => {
          const data = await parser.parse('"a";"b";"c";"d"\n"1";"2";"3";"4"');
          expect(typeof parser.error).toBe("undefined");
          expect("series" in data).toBe(true);
          expect(data.series.length).toEqual(4);
          expect(data.series).toEqual(exceptedData);
        });
      });
    });
  });
});
describe("parser load data from files", () => {
  test("small source (testsources/music.csv)", async () => {
    const source = "./tests/testsources/music.csv";

    const data = await parser.parse(source);

    expect(typeof parser.error).toBe("undefined");
    expect("series" in data).toBe(true);
    expect(data.series.length).toEqual(3);
    expect(data.series[0].name).toEqual("Genres");
    expect(data.series[0].values.length).toEqual(12);
  });

  test("load data from url", async () => {
    const url =
      "https://raw.githubusercontent.com/vizzuhq/vizzu-lib-doc/gh-pages/0.3.0/content/howtos/csv-input/population_total_long.csv";
    const data = await parser.parse(url);
    expect(data.series.length).toEqual(3);
    expect(data.series[0].name).toEqual("Country Name");
    expect(data.series[0].values.length).toEqual(12595);
  });
});
