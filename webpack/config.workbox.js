require('dotenv').config()
process.env.NODE_ENV = 'production'
const path = require('path')
const config = require('../config')

const { VERSION } = config
const THEME_SLUG = process.env.THEME_SLUG || 'mediavine-trellis'

module.exports = {
  mode: 'production',
  entry: {
    workbox: path.resolve(__dirname, '../assets/src/js/workbox.js'),
  },
  output: {
    filename: `[name].${VERSION}.js`,
    path: path.resolve(__dirname, '../assets/dist'),
    publicPath: `/wp-content/themes/${THEME_SLUG}/assets/dist/`,
    jsonpFunction: 'mvtrellisJsonp',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  }
}
