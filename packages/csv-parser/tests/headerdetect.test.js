import { expect, test, describe } from "vitest";
import { emptyDatas } from "./assets/emptyDatas";
import { headerDetect } from "../src/headerDetect";
import { moreDataCsv } from "./assets/dataWithHeader";

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
      `$description -> excepted: (<0.6)`,
      ({ description, input, excepted, separator }) => {
        const withoutHeader = input.split("\n").slice(1).join("\n"); 
        const probabilites = headerDetect(withoutHeader, separator);
        expect(probabilites<0.6).toEqual(true);
      }
    );
  });
});
