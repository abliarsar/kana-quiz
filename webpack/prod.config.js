const webpack = require('webpack')
const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


const { OUTPUT_DIR, PUBLIC_PATH, PROJECT_SRC, ENABLE_BUNDLE_ANALYZER } = require('./constants.js')



const serviceWorkerConfig = () => {

  // todo: конфиг кэша
  const config = {
    cacheId: `olimp-site`,
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: 'service-worker.js',
    staticFileGlobsIgnorePatterns: [/.+\.js$/, /\.map$/, /asset-manifest\.json$/, /client\.json$/, /index\.html$/],
    minify: true,
  }
  // Не кешируем ничего, кроме шрифтов и изображений
  // Приветствуются улучшения в регулярке
  config.staticFileGlobsIgnorePatterns = [/^(.(?!.*\.jpe?g|\.png|\.svg|\.woff2?|\.ttf|\.eot))*$/]

  return config
}

module.exports = ({
  mode: 'production',
  entry: {
    main: [
      '@babel/polyfill',
      path.join(PROJECT_SRC, `main.tsx`),
    ],
  },
  output: {
    path: OUTPUT_DIR,
    publicPath: PUBLIC_PATH,
    filename: 'js/[name].[chunkhash].js',
  },
  // devtool: 'hidden-source-map',
  plugins: [
    ENABLE_BUNDLE_ANALYZER && new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(PROJECT_SRC, `index.ejs`),
      inject: 'body',
      "chunksSortMode": 'none'
    }),
    // new SWPrecacheWebpackPlugin(serviceWorkerConfig()),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            passes: 3,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    usedExports: true,
  },
})
