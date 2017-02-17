var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/app.js')]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      ENV_PRODUCTION: true,
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'containers': path.resolve(__dirname, '../src/containers'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },

  resolveLoader: {
    fallback: [path.resolve(__dirname, '../node_modules')]
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'),
        exclude: /node_modules/
      }, {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url?limit=8192&name=img/[name].[hash:7].[ext]',
        exclude: /node_modules/
      }
      ,
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url?limit=8192&name=font/[name].[hash:7].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  eslint: {
    formatter: require('eslint-friendly-formatter')
  },

  postcss: function () {
    return [autoprefixer]
  }
}
