const paths = require('../paths')

const pkg = require('../../package.json')

module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    [pkg.name]: paths.srcPackage,
  },
}
