const merge = require('webpack-merge')
const serverBase = require('./server.base')

module.exports = merge(serverBase, {
  mode: 'production',
})
