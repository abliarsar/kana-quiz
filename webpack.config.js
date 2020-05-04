const merge = require('webpack-merge')


const dev = require('./webpack/dev.config.js')
const prod = require('./webpack/prod.config.js')
const common = require('./webpack/common.config.js')

const mode = (type) => ({
  dev: merge(dev, common),
  production: merge(prod, common),
}[type] || merge(dev, common))

module.exports = mode(process.env.NODE_ENV)

