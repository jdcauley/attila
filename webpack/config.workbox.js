process.env.NODE_ENV = 'production'
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    workbox: path.resolve(__dirname, '../assets/src/js/workbox.js'),
  },
  output: {
    filename: `sw.js`,
    path: path.resolve(__dirname, '../'),
    publicPath: `/`,
    jsonpFunction: 'attilaSWJsonp',
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
