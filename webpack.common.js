require('babel-polyfill');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    stats: {
        warnings: false,
        colors: true
    },
    entry: {
        src : ["babel-polyfill", path.join(__dirname, "/src/index.tsx")]
    },
    resolve : {
        extensions : [".ts", ".tsx", ".js"],
        alias : {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
    module : {
        rules: [ 
            {
                test : /\.tsx?$/,
                // use: ["babel-loader", "ts-loader", "tslint-loader"]
                use: ['awesome-typescript-loader']
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test : /\.css$/i,
                use : ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif|jpe?g)$/,
                use: [
                  {
                    options: {
                      name: "[name].[ext]",
                      outputPath: "assets/imgs/"
                    },
                    loader: "file-loader"
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template : "./src/index.html"
        }),
        new CopyWebpackPlugin([
            {
                from:'src/assets',
                to:'assets'
            } 
        ]), 
    ]
}