const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: {
          nthrive_main_bundle:'./src/client/index.js',
          nthrive_ptop_bundle:'./src/client/ptop.js'
    },
    mode: 'production',
    output: {
      filename: "[name].js",
        libraryTarget: 'var',
        library: 'Client'  // All of our javascipt code is accessible through this Client library.
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader?url=false', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|pdf)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },
    optimization: {
        minimizer: [
          new TerserPlugin(),
          new OptimizeCssAssetsPlugin({})
        ],
      },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html",
        }),
        new HtmlWebPackPlugin({
          template: "./src/client/ptop-index.html",
          filename: "./ptop-index.html",
      }),
        new MiniCssExtractPlugin()
    ]
}
