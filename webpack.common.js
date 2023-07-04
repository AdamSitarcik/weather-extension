const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/contentScript.tsx'),
    },
    module: {
        rules: [
            { use: 'ts-loader', test: /\.tsx?$/, exclude: /node_modules/ },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                },
            ],
        }),
        ...getHtmlPlugins(['popup', 'options']),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            os: false,
            path: false,
            crypto: false,
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist'),
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name !== 'contentScript';
            },
        },
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HtmlPlugin({
                title: 'Weather extension',
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
