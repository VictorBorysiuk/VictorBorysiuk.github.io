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
    }
};

module.exports = conf;