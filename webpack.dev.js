const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/apps/index.js" //在源文件目录下去找index.js 文件作为打包的入口文件
    },
    output: {
        path: path.resolve(__dirname + "/dist"), //生成的文件存放目录
        filename: "bundle-[name]-[hash:5].js",
        chunkFilename: "bundle-[name]-[hash:5].js"
    },
    module: {
        rules: [
            { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' }) },
            { test: /\.(png|gif)$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle-[name]-[hash:5].css', disable: false, allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.ejs'
        })
    ],
    devServer: {
        port: 8088,
        disableHostCheck: true
    }
}