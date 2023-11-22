import { Vizzu } from 'vizzu';
export default class VideoCapture {
    private mediaRecorder;
    private _rendered;
    private chart;
    private options;
    meta: {
        name: string;
        version: string;
        depends: any[];
    };
    get api(): {
        start: () => void;
        stop: () => Promise<unknown>;
    };
    constructor(options: any);
    register(chart: Vizzu): void;
    _init(): void;
}
