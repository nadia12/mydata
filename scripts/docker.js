const { readFile, writeFile } = require('./file-sync')

const packageJson = readFile('package.json')
const dockerJson = readFile('package-docker.json')

writeFile('scripts/package-tmp.json', packageJson)

const deployDeps = {
  ...packageJson.peerDependencies,
  ...dockerJson.dependencies,
  ...packageJson.dependencies,
}

packageJson.dependencies = deployDeps

delete packageJson.main
delete packageJson.module
delete packageJson.moduleRoots
delete packageJson.publishConfig
delete packageJson.scripts
delete packageJson['pre-commit']
delete packageJson.peerDependencies
delete packageJson.devDependencies

writeFile('package.json', packageJson)
