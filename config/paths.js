const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const paths = {
  appHtml: resolveApp('config/webpack.config.js/template.html'),
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  packageBuild: resolveApp('dist'),
  dotenv: resolveApp('.env'),
  src: resolveApp('app'),
  srcClient: resolveApp('app/client'),
  srcServer: resolveApp('app/server'),
  srcShared: resolveApp('app/shared'),
  srcPackage: resolveApp('src'),
  publicPath: '/static/',
}

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  paths.srcPackage,
  'node_modules',
]

module.exports = paths
