/**
 * @fileOverview webapck production config
 */
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            }
        ]
    },
    entry: {
        entry: './src/index'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'var'
    },
    // devtool: 'cheap-module-eval-source-map',
    externals: [],
    resolve: {
        modules: [
            'node_modules',
            path.resolve('./src')
        ],
        enforceExtension: false
    },
    plugins: [
        new CleanWebpackPlugin([
            'dist'
        ], {
            root: path.resolve()
        }),
        new BundleAnalyzerPlugin()
    ],
    stats: { children: false }
}
