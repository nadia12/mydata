const path = require('path')

const { getServicesURL } = require('./constants/service-url')

module.exports = {
  env: process.env.NODE_ENV,
  path_base: path.resolve(__dirname, '../'),
  path_dist: 'dist',
  path_app: 'app',
  path_server: 'server',
  host: getServicesURL(process.env.NODE_ENV || 'development'),
  shuttle_url: '/shuttle',
}
