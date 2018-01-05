const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        "genesis": [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
            "crypto-js",
            "immutable",
            "classnames",
            "js-cookie",
            "object-assign",
            "lodash",
            "moment",
            "antd",
            "echarts",
            "whatwg-fetch"
        ]
    },
    output: {
        library: '[name]',
        path: path.join(__dirname, './properties'),
        filename: `[name].dll.[hash:6].js`
    },
    resolve: {
        modules: ["node_modules"]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]',
            path: path.join(__dirname, './properties/[name].dll.[hash:6].json'),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
    ]

}





