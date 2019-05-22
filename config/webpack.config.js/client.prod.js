const merge = require('webpack-merge')
const baseConfig = require('./client.base')

// const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true'

const config = {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'bundle.[hash:8].js',
  },
}

module.exports = merge(baseConfig, config)
