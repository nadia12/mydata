const path = require('path')

module.exports = {
  env: process.env.NODE_ENV,
  path_base: path.resolve(__dirname, '../'),
  path_dist: 'dist',
  path_app: 'app',
  path_server: 'server',
  host: {
    root: 'http://staging-iq-app.volantis.io:18000',
    webAPI: 'http://staging-iq-app.volantis.io:18000/api',
    pipeline: 'http://staging-iq-app.volantis.io:18000/v1/pipeline',
    xplorer: 'http://iq-xplorer.volantis.io',
    mlStudio: 'http://iq-mlstudio.volantis.io/create',
    marketplaceAPI: 'http://uat-service.volantis.io/api',
  },
  // host: process.env.GATEWAY_HOST,
  shuttle_url: '/shuttle',
}
