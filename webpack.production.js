const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { version } = require('./package.json') || {};

module.exports = {
    entry: {
        app: "./src/production.js" //在源文件目录下去找index.js 文件作为打包的入口文件
    },
    output: {
        path: path.resolve(__dirname + `/dist/${version}`), //生成的文件存放目录
        filename: "bundle-[name]-[hash:5].js",
        chunkFilename: "bundle-[name]-[hash:5].js"
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: 'css-loader', options: { minimize: true } }] }) },
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [{ loader: 'css-loader', options: { minimize: true } }, 'less-loader'] }) },
            { test: /\.(png|gif)$/, loader: 'file-loader' }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src/web_modules"), "node_modules"],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle-[name]-[hash:5].css', disable: false, allChunks: true
        }),
        new webpack.DefinePlugin({
            __DEBUG__: false,
            __DEV__: false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.ejs'
        })
    ]
}