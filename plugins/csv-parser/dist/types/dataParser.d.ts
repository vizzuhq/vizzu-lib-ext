/// <reference types="node" />
import { Options } from 'csv-parse/sync';
import { Anim, Data, Config, Styles } from 'vizzu';
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js';
import { AnimCompleting } from 'vizzu/dist/animcompleting';
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
export interface AnimTarget {
    data?: Data.Set | {
        csv: csvTypes;
    };
    config?: Config.Chart;
    style?: Styles.Chart | null;
}
declare module 'vizzu' {
    interface Vizzu {
        animate(target: AnimTarget, options?: Anim.ControlOptions): AnimCompleting;
    }
}
export interface dataSeries {
    name: string;
    values: number[] | string[];
}
export interface dataType {
    series: dataSeries[];
}
export declare class DataParser implements Plugin {
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
    get hooks(): PluginHooks;
    private _setOptions;
    parse(input: string, options?: Options): Promise<dataType | null>;
    setSource(source: string): Promise<void>;
    fetchData(url: string): Promise<string>;
    getDelimiter(data: string): string;
    private _buildData;
    private _getHeader;
}
