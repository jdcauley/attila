require('dotenv').config()
const compression = require('compression')
const express = require('express')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('./config.child.js')
const compiler = webpack(config)

app.use(compression()); 

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.use('/', proxy(process.env.DEV_URL))

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})
