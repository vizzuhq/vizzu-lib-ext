declare module 'vizzu' {
	export interface HookContexts
}

declare module 'csv-parse/sync' {
	export interface Options {
	  encoding?: BufferEncoding;
	  delimiter?: string;
	  skip_empty_lines?: boolean;
	  comment?: string | RegExp;
	  relax_column_count?: boolean;
	  skip_records_with_error?: boolean;
	}
  
	export function parse(input: string, options?: Options): string[][];
  }
  
  declare module 'headerDetect' {
	export function headerDetect(source: string, delimiter: string): number;
  }
  
  declare module 'delimiterDetect' {
	export function delimiterDetect(data: string): string;
  }
  
  export interface optionsTypes {
	delimiter?: string;
	encoding?: BufferEncoding;
	headers?: boolean;
	autoheader?: boolean;
	emptyColumnPrefix?: string;
	hasHeader?: boolean;
  }
  
  export interface csvTypes {
	url: string;
	content: string;
	options?: optionsTypes;
  }
  
  export interface hookContex {
	target: {
	  data: {
		csv?: csvTypes;
		series?: {
		  name: string;
		  values: number[] | string[];
		}[];
	  };
	}[];
  }
  
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
  
  export class DataParser {
	private _data: dataType | null;
	private _headers: string[] | null;
	private _autoheader: boolean;
	private _isHeader: boolean;
	private _hasHeader: boolean;
	private _emptyColumnPrefix: string;
	private _probabilityVariable: number;
	public parserOptions: Options;
	meta: {
	  name: string;
	};
	get hasHeader(): boolean;
	get data(): dataType | null;
	get delimiter(): string;
	get api(): {
	  hasHeader: boolean;
	  delimiter: string;
	  data: dataType | null;
	};
	get hooks(): {
	  setAnimParams: (
		ctx: hookContex,
		next: nextType
	  ) => Promise<void>;
	};
	private _setOptions(options: optionsTypes): void;
	public parse(input: string, options?: Options): Promise<dataType | null>;
	public setSource(source: string): Promise<void>;
	public fetchData(url: string): Promise<string>;
	public getDelimiter(data: string): string;
	private _buildData(records: string[][]): dataType | null;
	private _getHeader(records: string[][]): string[];
  }