import { expect, test, describe } from "vitest";

import { CSVParser } from "../src/browser";
import Vizzu from "./assets/mocks/vizzu";
import { vizzuHookTestCases } from "./assets/vizzu-hook-test-cases";

const chart = new Vizzu();
chart.feature(new CSVParser());

describe("Vizzu hook CSVParser", () => {
    test.each(vizzuHookTestCases)("$description", async ({data, excepted}) => {
        await chart.animate({ data : data });
        expect(chart.data).toEqual(excepted);
    });
})