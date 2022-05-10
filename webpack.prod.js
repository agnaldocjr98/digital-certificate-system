const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  externals: {
    'react': 'React',
    'axios': 'axios',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM'
  },
  plugins: [
    new EnvironmentPlugin({
      API_BASEURL: 'https://api.bliprealize.com/v1',
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    }),
  ]
})
