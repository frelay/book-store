const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin(),
        new TerserWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
    },
    module: {
        rules: [
            // CSS
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                        },
                    },
                    "css-loader",
                ],
            },
            // Images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ["file-loader"],
            },
        ],
    },
};
