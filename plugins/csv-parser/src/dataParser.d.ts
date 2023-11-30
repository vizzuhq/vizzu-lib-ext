/// <reference types="node" />
import { Options } from 'csv-parse/sync';
import { Anim, Data, Config, Styles } from 'vizzu';
import * as CA from 'vizzu/dist/module/canimctrl.js';
import * as CC from 'vizzu/dist/module/cchart';
import { Plugin, PluginHooks } from 'vizzu/dist/plugins.js';
import { AnimCompleting } from 'vizzu/dist/animcompleting';
export interface optionsTypes {
    delimiter?: string;
    encoding?: BufferEncoding;
    headers?: boolean;
    autoheader?: boolean;
    emptyColumnPrefix?: string;
    hasHeader?: boolean | null;
}
export interface detectedTypes {
    delimiter: string;
    probability: number;
    headers: string[];
    hasHeader: boolean;
}
export interface csvTypes {
    url?: string;
    content?: string;
    options?: optionsTypes;
}
export interface csvTarget {
    target: {
        data: {
            csv: csvTypes;
        };
    };
}
export interface csvDataType extends Data.Filter {
    csv: csvTypes;
}
export interface Target {
    data?: Data.Set | csvDataType;
    config?: Config.Chart;
    style?: Styles.Chart | null;
}
export interface Keyframe {
    target: Target | CC.Snapshot;
    options?: Options;
}
export type Keyframes = Keyframe[];
export type AnimTarget = Keyframes | CA.CAnimation;
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
    private _hasHeader;
    private _emptyColumnPrefix;
    private _probabilityVariable;
    private _debug;
    detected: detectedTypes;
    parserOptions: Options;
    meta: {
        name: string;
    };
    constructor(debug?: boolean);
    get hasHeader(): boolean | null;
    get data(): dataType | null;
    get delimiter(): string;
    get detectedDelimiter(): string;
    get api(): {
        hasHeader: boolean;
        detectedDelimiter: string;
        delimiter: string;
        data: dataType;
    };
    get hooks(): PluginHooks;
    private _setOptions;
    convertNumbers(data: dataType): dataType;
    parse(input: string, options?: optionsTypes, convert?: boolean): Promise<dataType | null>;
    setSource(source: string): Promise<void>;
    fetchData(url: string): Promise<string>;
    getDelimiter(data: string): string;
    private _buildData;
    private _getHeader;
    private _log;
}
