const path = require('path')

module.exports = {
  env: process.env.NODE_ENV,
  path_base: path.resolve(__dirname, '../'),
  path_dist: 'dist',
  path_app: 'app',
  path_server: 'server',
  host: {
    root: 'http://iq.volantis.io',
    webAPI: 'http://iq.volantis.io/api',
    pipeline: 'http://iq.volantis.io/v1/pipeline',
    xplorer: 'http://iq-xplorer.volantis.io',
    mlStudio: 'http://iq-mlstudio.volantis.io/create',
    marketplaceAPI: 'http://uat-service.volantis.io/api',
  },
  // host: process.env.GATEWAY_HOST,
  shuttle_url: '/shuttle',
}
