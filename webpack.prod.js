const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  externals: {
    jquery: "jQuery",
  },
  entry: {
    main: "./src/client/index.js",
    contact: "./src/client/contact.js",
    ptop: "./src/client/ptop.js",
    hub: "./src/client/hub.js",
    userforums: "./src/client/userforums.js",
  },
  mode: "production",
  output: {
    filename: "[name].js",
    libraryTarget: "var",
    library: "Client", // All of our javascipt code is accessible through this Client library.
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html",
      chunks: ["main"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/contact-us.html",
      filename: "./contact-us.html",
      chunks: ["contact"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/ptop-index.html",
      filename: "./ptop-index.html",
      chunks: ["ptop"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/userforums.html",
      filename: "./userforums.html",
      chunks: ["userforums"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/hub.html",
      filename: "./hub.html",
      chunks: ["hub"],
    }),
    new MiniCssExtractPlugin(),
  ],
};
