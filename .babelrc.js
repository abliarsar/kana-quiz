const presets = [
    "@babel/preset-typescript",
    ["@babel/preset-env", {
      "targets": {
        "browsers": [">0.5%", "last 2 versions", "ie >= 10"]
      }
    }],
  "@babel/preset-react"
]

const shouldUseReactRefresh = process.env.NODE_ENV !== 'production' && process.env.FAST_REFRESH === 'true'
const plugins = [
  ["module-resolver", {
    "root": ["./src"]
  }],
  ["@babel/transform-runtime",
    {
      "corejs": 2
    }
  ],
  "@babel/transform-async-to-generator",
  "@babel/proposal-class-properties",
  "@babel/proposal-object-rest-spread",
  "@babel/syntax-dynamic-import",
  "babel-plugin-styled-components",
  "@babel/plugin-proposal-export-default-from",
  "@babel/plugin-syntax-export-namespace-from",
  ["@babel/plugin-proposal-nullish-coalescing-operator", {
    "loose": true,
  }],
  "@babel/plugin-proposal-optional-chaining",
  "transform-export-extensions",
  shouldUseReactRefresh && ['react-refresh/babel', {
    skipEnvCheck: true,
  }],
].filter(Boolean)

module.exports = {
  "plugins": plugins,
  "presets": presets,
}
