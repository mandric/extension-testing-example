'use strict';
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// set environment variable NODE_ENV=production for production build
const mode = process.env.NODE_ENV || 'development';
const DEVELOPMENT = mode === 'development';

module.exports = {
    mode: mode,
    // only build source maps for development build
    devtool: mode == 'development' ? 'inline-source-map': false,
    entry: {
        // separate bundles
        browser: path.join(__dirname, 'src', 'browser.js'),
        background: path.join(__dirname, 'src', 'background.js'),
        popup: path.join(__dirname, 'src', 'popup.js')
    },
    output: {
        // output into either dist/production or dist/development
        path: path.join(__dirname, 'dist', mode)
    },
    module: {
        rules: [
            // inserts styles into the page using a js module
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
        ]
    },
    plugins: [
        // These files are directlty copied without modification
        new CopyPlugin([
            {
              from: path.join('src', 'manifest.json'),
              to: 'manifest.json'
            },
            {
              from: path.join('src', 'popup.html'),
              to: 'popup.html'
            },
        ]),
        new webpack.DefinePlugin({
            // Allows us to modify included features inside modules at
            // compile time using `if (DEVELOPMENT) { ... }`.
            DEVELOPMENT: JSON.stringify(DEVELOPMENT)
        })
    ]
};

// Include test suite in development build
if (DEVELOPMENT) {
    module.exports.entry.test = path.join(__dirname, 'test', 'index.js');
    module.exports.plugins.push(new HtmlWebpackPlugin({
        title: 'Test suite',
        filename: 'test.html',
        template: path.join('test','test.html'),
        chunks: ['test']
    }));
//    module.exports.entry.test_integration = path.join(__dirname, 'test', 'integration', 'index.js');
//    module.exports.plugins.push(new HtmlWebpackPlugin({
//        title: 'Integration Test suite',
//        filename: 'test_integration.html',
//        template: path.join('test', 'test.html'),
//        chunks: ['test_integration']
//    }));
}
