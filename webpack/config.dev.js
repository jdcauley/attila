require('dotenv').config()
const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

const THEME_VERSION = process.env.THEME_VERSION || 'latest'
const THEME_SLUG = process.env.THEME_SLUG || 'mediavine-trellis'

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../assets/src/js/main.js'),
    path.resolve(__dirname, '../assets/src/js/legacy.js'),
    path.resolve(__dirname, '../assets/src/js/adminbar.js'),
    path.resolve(__dirname, '../assets/src/js/helpers/prefetchworker.js')
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../assets/dist'),
    hot: true,
  },
  output: {
    filename: `[name].${THEME_VERSION}.js`,
    path: path.resolve(__dirname, '../assets/dist'),
    publicPath: `/wp-content/themes/${THEME_SLUG}/assets/dist/`,
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
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',{
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  stats: 'minimal'
}
