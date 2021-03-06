const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);
const host = process.env.HOST || "localhost";

const htmlPlugin = new HtmlWebPackPlugin({
  inject: true,
  template: resolveAppPath("./src/index.html"),
});
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules(?!\/striptags)|bower_components)/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
    ],
  },
  devServer: {
    contentBase: resolveAppPath("public"),
    compress: true,
    hot: true,
    host,
    port: 3000,
    publicPath: "/",
  },
};
