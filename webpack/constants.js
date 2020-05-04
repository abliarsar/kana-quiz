const path = require('path')


const PUBLIC_PATH = '/static/'

const PROJECT_ROOT = path.resolve(__dirname, '../')
const PROJECT_SRC = path.join(PROJECT_ROOT, 'src')
const PROJECT_DIST = path.join(PROJECT_ROOT, 'dist')


const ENABLE_TYPECHECK = process.env.NODE_ENV !== 'production'
const ENABLE_CIRCULAR_CHECK = false
const ENABLE_BUNDLE_ANALYZER = false



const OUTPUT_DIR = PROJECT_DIST

module.exports = {
  ENABLE_TYPECHECK,
  ENABLE_CIRCULAR_CHECK,
  ENABLE_BUNDLE_ANALYZER,
  OUTPUT_DIR,
  PUBLIC_PATH,
  PROJECT_ROOT,
  PROJECT_DIST,
  PROJECT_SRC,
}
