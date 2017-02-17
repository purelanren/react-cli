var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var open = require('open')
var webpackConfig = require('./dev.config')

// live
const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.resolve(__dirname, '../dist'),
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false
  }
})

server.listen(3000, 'localhost', err => {
  if (err) {
    console.log(err)
    return
  }
  var url = `http://localhost:3000`
  console.log(`Listening at ${url}`)
  open(url)
})