const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  mode: process.env.NODE_ENV,
  // entry
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  // module rules
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js','.jsx' ]
  },
  // plugins
  plugins : [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // used to pick up key values from .env file in frontend
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed) 
    })
  ],
  devServer: {
    publicPath: '/',
    port: 8080,
    hot: true,
    compress: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './index.html'),
    proxy: {
     '/': 'http://localhost:3000',
    }
  }
}
