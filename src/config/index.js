const path = require('path')

module.exports = {
  env: process.env.NODE_ENV,
  path_base: path.resolve(__dirname, '../'),
  path_dist: 'dist',
  path_app: 'app',
  path_server: 'server',
  host: 'https://jsonplaceholder.typicode.com',
  // host: process.env.GATEWAY_HOST,
  shuttle_url: '/shuttle'
}
