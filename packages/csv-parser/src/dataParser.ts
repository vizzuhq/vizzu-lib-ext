import { parse } from "csv-parse/sync";
import { headerDetect } from "./headerDetect";

export class DataParser {
  _data: Object | null = null;
  _isHeader: boolean = true;
  private probabilityVariable = 0.5;

  public get data(): Object | null {
    return this._data;
  }

  public async setSouce(source: string) {
    if (source.startsWith("http")) {
      source = await this.fetchData(source);
    }
    const headerProbability = headerDetect(source);
    if (headerProbability < this.probabilityVariable) {
      this._isHeader = false;
    }
    const parsedInput = parse(source);
    this._data = { series: this.buildData(parsedInput) };
  }

  private buildData(records: string[][] | { [x: string]: any; }[]): Object | null {
    if (records.length === 0) {
      return null;
    }
    const series = Object.keys(records[0]).map((key: string) => {
      const entry = records[0][key];
      return {
        name: entry[0],
        values: records.map((record: { [x: string]: any; }) => record[entry[0]]),
      };
    });
    return series;
  }

  public async fetchData(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching data from ${url}`);
      return "";
    }
    return await response.text();
  }

  get hasHeader(): boolean {
    return this._isHeader;
  }
}
