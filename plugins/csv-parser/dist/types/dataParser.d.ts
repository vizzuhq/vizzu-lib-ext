/// <reference types="node" />
import { Options } from 'csv-parse/sync';
import * as Anim from 'vizzu/dist/types/anim.js';
export interface optionsTypes {
    delimiter?: string;
    encoding?: BufferEncoding;
    headers?: boolean;
    autoheader?: boolean;
    emptyColumnPrefix?: string;
    hasHeader?: boolean;
}
export interface csvTypes {
    url?: string;
    content?: string;
    options?: optionsTypes;
}
export type hookContexts = {
    target: Anim.AnimTarget & {
        data: {
            csv?: csvTypes;
        };
    };
    options?: Anim.ControlOptions;
};
export interface dataSeries {
    name: string;
    values: number[] | string[];
}
export interface dataType {
    series: dataSeries[];
}
export interface nextType {
    (): void;
}
export declare class DataParser {
    private _data;
    private _headers;
    private _autoheader;
    private _isHeader;
    private _hasHeader;
    private _emptyColumnPrefix;
    private _probabilityVariable;
    parserOptions: Options;
    meta: {
        name: string;
    };
    get hasHeader(): boolean;
    get data(): dataType | null;
    get delimiter(): string;
    get api(): {
        hasHeader: boolean;
        delimiter: string;
        data: dataType;
    };
    get hooks(): {
        setAnimParams: ((ctx: hookContexts, next: nextType) => Promise<void>) & {
            priority: number;
        };
    };
    private _setOptions;
    parse(input: string, options?: Options): Promise<dataType | null>;
    setSource(source: string): Promise<void>;
    fetchData(url: string): Promise<string>;
    getDelimiter(data: string): string;
    private _buildData;
    private _getHeader;
}
