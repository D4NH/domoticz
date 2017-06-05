const copyFiles = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        'domoticz': './assets/scripts/index.js',
        'vendor': ['vue', 'lodash']
    },

    output: {
        filename: 'assets/scripts/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '//localhost:3000/',
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
            }
        }, {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new copyFiles([
            { from: './index.html', to: path.resolve(__dirname, 'dist') },
        ]),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new webpack.NamedModulesPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
};
