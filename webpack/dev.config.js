const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { PUBLIC_PATH, PROJECT_SRC, PROJECT_DIST, ENABLE_CIRCULAR_CHECK } = require('./constants.js')

module.exports = ({
  entry: {
    main: path.join(PROJECT_SRC, `main.tsx`),
  },
  output: {
    path: PROJECT_DIST,
    publicPath: PUBLIC_PATH,
    filename: 'js/[name].js',
    library: '[name]',
  },
  devtool: 'source-map',
  watch: true,
  devServer: {
    hot: true,
    contentBase: [
      PROJECT_SRC + '/assets',
      PROJECT_DIST,
    ],
    compress: true,
    publicPath: PUBLIC_PATH,
    watchContentBase: true,
    historyApiFallback: {
      index: PUBLIC_PATH,
    },
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PROJECT_SRC, `index.ejs`),
      "chunksSortMode": 'none',
      filename: 'index.html'
    }),
    ENABLE_CIRCULAR_CHECK && new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: true,
    }),
    new ReactRefreshWebpackPlugin({
      disableRefreshCheck: true
    })
  ].filter(Boolean),
  optimization: {
    usedExports: true,
  }
})
