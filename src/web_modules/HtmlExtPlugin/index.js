import objectAssign from 'object-assign';
import path from 'path';

export default class HtmlExtPlugin {
    constructor({ context, filename, option = { dll: '' } }) {
        this.config = objectAssign(option, getConfig(context, filename));
    }
    apply(compiler) {
        let { script, dll } = this.config;

        compiler.plugin("compilation", compilation => {
            compilation.plugin(
                "html-webpack-plugin-before-html-processing",
                (htmldata, callback) => {
                    let { html, plugin } = htmldata || {};
                    htmldata.html = appendFiles(script, html, dll);
                    callback(null, htmldata);
                }
            );
        });
    }
}


const appendFiles = (files, html, dll) => {
    const bodyRegExp = /(<\/body>)/i;
    let scripts = ''
    if (Array.isArray(files)) {
        files.forEach(v => {
            if (v.endsWith('.js')) {
                let filename = _dll(v, dll);
                scripts += `\n\t<script type="text/javascript" charset="utf-8" src="${filename}"></script>`;
            }
        })
        scripts += '\n</body>';
        if (bodyRegExp.test(html)) {
            html = html.replace(bodyRegExp, scripts)
        }
    }
    return html;
}


/**
 * @method
 * @description
 */
const _dll = (filename, dll) => {
    const dllRegExp = /(\[dll\])/g;

    let _filename = filename.replace(dllRegExp, () => dll);
    return _filename;
}


/**
 * 
 * @param {*} context 
 * @param {*} filename 
 */
const getConfig = (context, filename) => {
    let option = {};
    if (Array.isArray(filename)) {
        filename.forEach(v => {
            let obj = getConfigFromFile(context, v);
            objectAssign(option, obj)
        })
    } else if (typeof filename === "string") {
        let obj = getConfigFromFile(context, filename);
        objectAssign(option, obj)
    }
    return option;
}

/**
 * 
 * @param {*} context 
 * @param {*} filename 
 */
const getConfigFromFile = (context, filename) => {
    let config = {};
    try {
        if (/\.json|js$/.test(filename)) {
            config = require(path.resolve(context, filename));
        }
    } catch (e) {
        console.info('配置文件读取有误！')
    }
    return config;
}