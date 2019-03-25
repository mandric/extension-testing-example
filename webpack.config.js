const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// set environment variable NODE_ENV=production for production build
const mode = process.env.NODE_ENV || 'development';
const DEVELOPMENT = mode === 'development';

module.exports = {
    mode: mode,
    // only build source maps for development build
    devtool: mode == 'development' ? 'source-map': false,
    entry: {
        // separate bundles
        browser: './src/browser.js',
        background: './src/background.js',
        popup: './src/popup.js'
    },
    output: {
        // output into either dist/production or dist/development
        path: __dirname + '/dist/' + mode
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
            {from: 'src/manifest.json', to: 'manifest.json'},
            {from: 'src/popup.html', to: 'popup.html'},
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
    module.exports.entry.test = './test/index.js';
    module.exports.plugins.push(new HtmlWebpackPlugin({
        title: 'Test suite',
        filename: 'test.html',
        template: 'test/test.html',
        chunks: ['test']
    }));
}
