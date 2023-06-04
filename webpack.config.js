const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "main.js",
    },
    plugins: [new MiniCssExtractPlugin(), new TerserWebpackPlugin()],
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
