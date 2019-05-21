const { readFile, writeFile } = require('./file-sync')

const packageJson = readFile('package.json')
writeFile('scripts/package-tmp.json', packageJson)

const revertScript = packageJson.scripts['package:revert']
const releaseScript = packageJson.scripts.release

delete packageJson.scripts
delete packageJson['pre-commit']
delete packageJson.devDependencies

packageJson.scripts = {}
packageJson.scripts['package:revert'] = revertScript
packageJson.scripts.release = releaseScript

writeFile('package.json', packageJson)
