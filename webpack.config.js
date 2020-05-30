const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

let conf = {
    mode: 'development',
    entry: {        
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].[contenthash].js'

    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: { presets: ["@babel/preset-env"] }
            },
        ]
    }
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production? 'source-map':'eval-sourcemap';
    return conf
};