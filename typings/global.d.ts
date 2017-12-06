declare module 'router';
declare module 'util/Util';
declare module 'util/Fetch';
declare module 'util/Dialog';
declare module 'util/Validator';
declare module 'object-assign';
declare module 'echarts';

declare const __DEV__: boolean;
declare const myStorage: any;

interface Window {
    _store: any;
}



declare const System: {
    import(modulePath: string): Promise<any>;
};