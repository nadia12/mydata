const { readFile, writeFile } = require('./file-sync')

const packageJson = readFile('scripts/package-tmp.json')
writeFile('package.json', packageJson)
