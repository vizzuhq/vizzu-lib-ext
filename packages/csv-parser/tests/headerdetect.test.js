import { expect, test, describe } from "vitest";
import { emptyDatas } from "./assets/emptyDatas";
import { headerDetect } from "../src/headerDetect";
import { moreDataCsv } from "./assets/dataWithHeader";
import { files, filesWithHeaders, filesWithoutHeaders } from "./assets/testFiles";
import fs from "fs";

describe("header probabilites detect", () => {
  describe("with empty data", () => {
    test.each(emptyDatas)(
      `$description -> excepted: ($excepted.header)`,
      ({ input, excepted, separator }) => {
        const probabilites = headerDetect(input, separator);
        expect(probabilites).toEqual(excepted.header);
      }
    );
  });

  describe("with empty data", () => {
    test.each(moreDataCsv)(
      `$description -> excepted toBeGreaterThanOrEqual: ( $excepted.header)`,
      ({ description, input, excepted, separator }) => {
        const probabilites = headerDetect(input, separator);
        expect(probabilites).toBeGreaterThanOrEqual(excepted.header);
      }
    );
  });
  describe("with empty data without header", () => {
    test.each(moreDataCsv)(
      `$description -> excepted: (<0.7)`,
      ({ description, input, excepted, separator }) => {
        const withoutHeader = input.split("\n").slice(1).join("\n"); 
        const probabilites = headerDetect(withoutHeader, separator);
        expect(probabilites).toBeLessThanOrEqual(0.7);
      }
    );
  }); 

  describe("csv files header detect", () => {
    describe("with headers", () => {
      const testFiles = filesWithHeaders();
      test.each(testFiles)(
        "small source ($input) >= $excepted.header",
        async ({ input, excepted }) => {
          const data = fs.readFileSync(input, "utf8");
          const probabilites = headerDetect(data);
          expect(probabilites).toBeGreaterThanOrEqual(excepted.header);
        }
      );
    });
    describe("without headers", () => {
        const testFiles = filesWithoutHeaders();
        test.each(testFiles)(
          "small source ($input) <=$excepted.header",
          async ({ input, excepted }) => {
            const data = fs.readFileSync(input, "utf8");
            const probabilites = headerDetect(data);
            expect(probabilites).toBeLessThanOrEqual(excepted.header);
          }
        );
      });
  });
});
