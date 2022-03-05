const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
// 不要同时使用 style-loader 与 mini-css-extract-plugin。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: ['./src/zoom.js', './src/pages/Home/index.jsx', './src/index.js'],
    },
    output: {
        filename: 'chunk.[name].[contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        pathinfo: false,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new WebpackBar({
            color: '#007fff',
        }),
        new HappyPack({
            loaders: ['babel-loader'],
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            as(entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (/\.png$/.test(entry)) return 'image';
                return 'script';
            },
            include: 'asyncChunks',
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    'happypack/loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: '3.21.1',
                                    },
                                ],
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
                generator: {
                    filename: 'static/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[hash][ext][query]',
                },
            },
            {
                test: /\.(le|c)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
};
