declare module 'router';

declare module 'comps';

declare module 'object-assign';

declare module 'echarts';

declare module 'lodash/*';

declare module 'moment';

declare module 'crypto-js';

declare module 'ant-design-pro/lib/*';

declare module 'HtmlExtPlugin';

declare module 'jsencrypt';

declare module 'fs-extra';

declare module 'js-base64';

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