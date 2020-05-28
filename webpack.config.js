let path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
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