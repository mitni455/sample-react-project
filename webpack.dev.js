const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode : "development",
    devtool : 'inline-source-map',
    devServer : {
        port: 8080,
        host: (process.env.NODE_ENV === 'local' ? '127.0.0.1' : '0.0.0.0')
    },
    plugins : [
        (() => {
            return new webpack.DefinePlugin({ 
                'process.env.random' : JSON.stringify("Hello world!")
            })
        })(),
    ]
})