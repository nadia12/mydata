const webpack = require('webpack')
const merge = require('webpack-merge')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const baseConfig = require('./server.base')

const config = {
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  performance: {
    hints: false,
  },
}

module.exports = merge(baseConfig, config)
