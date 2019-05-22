const webpack = require('webpack')
const merge = require('webpack-merge')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const baseConfig = require('./client.base')

const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true'

const config = {
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: generateSourceMap ? 'cheap-module-inline-source-map' : false,
  performance: {
    hints: false,
  },
}

module.exports = merge(baseConfig, config)
