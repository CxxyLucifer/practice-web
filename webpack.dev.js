const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlExtPlugin = require('./src/web_modules/HtmlExtPlugin');
const { dll } = require('./package.json');

module.exports = {
    entry: {
        app: "./src/dev.tsx" //在源文件目录下去找index.js 文件作为打包的入口文件
    },
    output: {
        path: path.resolve(__dirname + "/dist"), //生成的文件存放目录
        filename: "bundle-[name]-[hash:5].js",
        chunkFilename: "bundle-[name]-[hash:5].js"
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' }) },
            { test: /\.(png|gif)$/, loader: 'file-loader' }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src/web_modules"), "node_modules"],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            plume2: "plume2/es5"
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle-[name]-[hash:5].css', disable: false, allChunks: true
        }),
        new webpack.DefinePlugin({
            __DEBUG__: true,
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.DllReferencePlugin({
            name: 'genesis',
            context: __dirname,
            manifest: require(path.resolve(__dirname, `./properties/${dll}.json`))
        }),
        new HtmlWebpackPlugin({
            title: 'practice web',
            filename: 'index.html',
            template: './index.ejs'
        }),
        new HtmlExtPlugin({
            context: __dirname,
            filename: ['./properties/config.json'],
            option: {
                dll: `${dll}`
            }
        })
    ],
    devServer: {
        port: 8088,
        disableHostCheck: true
    }
}