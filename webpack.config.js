const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const host = process.env.HOST || 'localhost';

const htmlPlugin = new HtmlWebPackPlugin({
    inject: true,
    template: resolveAppPath('./src/index.html'),
});
module.exports = {
  entry: './src/index.js',
  output: { 
    path: path.resolve(__dirname, 'build'), 
    publicPath: '/',
    filename: 'bundle.js'
  }, 
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: resolveAppPath('public'),
    compress: true,
    hot: true,
    host,
    port: 3000,
    publicPath: '/',
  },
};