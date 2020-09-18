const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  externals: {
    jquery: "jQuery",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  entry: {
    main: "./src/client/index.js",
    contact: "./src/client/contact.js",
    ptop: "./src/client/ptop.js",
    hub: "./src/client/hub.js",
    userforums: "./src/client/userforums.js",
    landing_page: "./src/client/landing_page.js",
    analytics: "./src/client/analytics.js",
  },
  mode: "development",
  devtool: "source-map",
  stats: "verbose",
  output: {
    filename: "[name].bundle.js",
    libraryTarget: "var",
    library: "Client",
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
        use: ["style-loader", "css-loader?url=false", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
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
    new HtmlWebPackPlugin({
      template: "./src/client/landing_page.html",
      filename: "./landing_page.html",
      chunks: ["landing_page"],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/analytics.html",
      filename: "./analytics.html",
      chunks: ["analytics"],
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
