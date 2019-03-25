const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        browser: './src/browser.js',
        background: './src/background.js',
        popup: './src/popup.js',
        test: './test/index.js'
    },
    output: {
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
        ]
    },
    plugins: [
        new CopyPlugin([
            {from: 'src/manifest.json', to: 'manifest.json'},
            {from: 'src/popup.html', to: 'popup.html'},
        ]),
        new HtmlWebpackPlugin({
            title: 'Test suite',
            filename: 'test.html',
            template: 'test/test.html',
            chunks: ['test']
        })
    ]
};
