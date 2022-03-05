const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
            chunks: 'all',
        },
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'],
                        dead_code: true,
                        unused: true,
                        keep_fnames: true,
                        keep_classnames: true,
                        keep_fargs: true,
                    },
                    format: {
                        comments: false,
                    },
                },
                parallel: true,
                exclude: /node_modules/,
            }),
            new CssMinimizerPlugin(),
        ],
    },
});
