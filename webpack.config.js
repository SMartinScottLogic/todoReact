/* eslint strict: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');

let options = {
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, "public/scripts"),
                query: { presets: ['react','es2015'] }
            },
            {
                test: /\.ts(x?)$/,
                loader: 'babel-loader!ts-loader',
                include: path.resolve(__dirname, "public/scripts"),
                query: { presets: ['es2015'] }
            },
            {
                test: /\.html$/,
                loader: 'html',
                include: path.resolve(__dirname, "public/")
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.resolve(__dirname, "public/scripts")
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: path.resolve(__dirname, "public/css")
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: path.resolve(__dirname, "public/css")
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: 'bundle.js',
    },
    entry: [
        
        './public/scripts/tutorial21_commentbox.jsx'
    ],
    devtool: 'source-map',
};

module.exports = options;
