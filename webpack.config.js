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
        'polyfill': './src/polyfill',
        'polyfill-webpack': ['babel-polyfill', './src/polyfill-webpack'],

        'from': './src/from',
        'assign': './src/assign',
        'assign-alias': './src/assign-alias',
        'includes': './src/includes',
        'promise': './src/promise',
        'set': './src/set',

        'class': './src/class',
        'class-without-helpers': './src/without-helpers/class'
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'var'
    },
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
