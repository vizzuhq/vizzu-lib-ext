import { DataParser } from "./dataParser";

export class CSVParser extends DataParser {
    public async parse(input: string): Promise<Object | null>  {
        if (!input) return null;
        await this.setSouce(input);
        return this.data;
    }
}