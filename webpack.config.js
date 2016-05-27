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
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, "public/todo"),
                query: { presets: ['react','es2015'] }
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'public/build'),
        filename: 'bundle.js',
    },
    entry: [
        
        './public/todo/todo.js'
    ],
    devtool: 'source-map',
};

module.exports = options;
