declare module 'router';

declare module 'comps';

declare module 'util/*';

declare module 'object-assign';

declare module 'echarts';

declare module 'lodash/*';

declare module 'moment';

declare module 'ant-design-pro/lib/*';


/**
 * 开发模式
 */
declare const __DEV__: boolean;

interface Window {
    _store: any;
}

declare const System: {
    import(modulePath: string): Promise<any>;
};