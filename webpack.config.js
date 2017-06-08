const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
    context: path.join(__dirname, 'src'),

    devtool: '#cheap-module-eval-source-map',

    entry: {
        'domoticz': './assets/scripts/main.js',
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
                loaders: {
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
        }),
        new webpack.NamedModulesPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Domoticz',
            template: 'index.html',
            inject: true
        }),
    ],

    resolve: {
        extensions: ['.js', '.vue']
    },

    devServer: {
        stats: {
            hash: false,
            assets: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: false
        },
        contentBase: path.resolve(__dirname, 'dist')
    }
};
