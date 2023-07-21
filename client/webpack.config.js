const webpack = require('webpack');
var path = require('path')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  mode: env == 'production' || env == 'none' ? env : 'development',
  entry: ['./src/app.js'],
  devServer: {
    proxy: {
      '/appfront': {
        target: 'http://localhost:9000',
        pathRewrite: { '^/appfront': '' },
      },
      '/appback': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/appback': '' },
      },
      '/peppuback': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/peppuback': '' },
      },
    },
    
    historyApiFallback: true,
    port: 9000,
    hot: true,
    watchOptions: {
      poll: true
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }
    ]
  },
  stats: { children: false }, //to fix the error-Entrypoint undefined=index.html
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};