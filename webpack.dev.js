const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: './public'
    },
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new EnvironmentPlugin({
      API_BASEURL: 'https://api.bliprealize.com/v1',
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
