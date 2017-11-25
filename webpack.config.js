module.exports = {
    entry: {
        app: "./src/apps/index.js" //在源文件目录下去找index.js 文件作为打包的入口文件
    },
    output: {
        path: __dirname + "/dist", //生成的文件存放目录
        filename: "[name].bundle.js" //生成的文件 name 表示entry下面的app
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, use: [{
                    loader: "babel-loader", options: { presets: ["react", "es2015"] }
                }],
            },
            {   //这里的内容是新增加的对样式的支持
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    }
}