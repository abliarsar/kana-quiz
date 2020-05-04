const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { PROJECT_ROOT, PROJECT_SRC, ENABLE_TYPECHECK } = require('./constants.js')


module.exports = {
  context: PROJECT_ROOT,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', 'src'],
  },
  output: {
    chunkFilename: './js/[name].chunk.[contenthash:8].js',
  },
  target: 'web',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: [
          PROJECT_SRC,
        ],
        loader: 'babel-loader',
        sideEffects: false, // false -> tree-shakeable code
      },
      {
        test: /\.(png|jpg|svg|ico|gif)$/,
        loader: 'file-loader',
        include: /img/,
        options: {
          context: PROJECT_ROOT,
          name: 'img/[name].[ext]',
        },
        sideEffects: true,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        include: /fonts/,
        options: {
          context: PROJECT_ROOT,
          name: 'fonts/[name].[ext]',
        },
        sideEffects: true,
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
        include: PROJECT_SRC,
        options: {
          context: PROJECT_ROOT,
          name: '[name].[ext]',
        },
        sideEffects: true,
      },
      {
        test: /\.css$/,
        include: [
          PROJECT_SRC,
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.styl$/,
        include: PROJECT_SRC,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'stylus-loader',
        ],
        sideEffects: true,
      },
    ],
  },
  plugins: [
    ENABLE_TYPECHECK && new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ].filter(Boolean),
}
