import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
// import alias from 'rollup-plugin-alias'
import builtins from 'rollup-plugin-node-builtins'

import pkg from './package.json'

// const path = require('path')

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ['moment', 'path'],
  plugins: [
    external({
      includeDependencies: false,
    }),
    url(),
    // alias({
    //   moment: path.resolve('./node_modules/moment/moment.js'),
    // }),
    resolve({
      browser: true,
      jsnext: true,
    }),
    builtins(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
    json(),
  ],
}
