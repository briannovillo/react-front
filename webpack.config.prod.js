const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: ['babel-polyfill', './src/client/index.js']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: './[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'sass-loader'
      ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].style.css'
    }),
    new CopyPlugin([
      { from: './src/config', to: './config' }
    ]),
  ]
};
