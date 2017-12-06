declare module 'router';
declare module 'util/Util';

declare const __DEV__: boolean;

interface Window {
    _store: any;
}

declare const System: {
    import(modulePath: string): Promise<any>;
};