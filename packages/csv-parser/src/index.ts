import fs from "fs";
import { DataParser } from "./dataParser";

export class CSVParser extends DataParser {
  public async parse(input: string): Promise<Object | null> {
    if (!input) return null;

    if (!input.startsWith("http") && input.endsWith(".csv")) {
      const fileContent = this.readCSVFile(input);
      await this.setSouce(fileContent);
      return this.data;
    }
    await this.setSouce(input);
    return this.data;
  }
  public readCSVFile(fileName: string): string {
    if (!fileName) {
      return "";
    }
    return fs.readFileSync(fileName, "utf-8");
  }
}
