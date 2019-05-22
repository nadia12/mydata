/* eslint no-console: 0 */
import express from 'express'
import cors from 'cors'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import manifestHelpers from 'express-manifest-helpers'
import { configureStore } from '../shared/store'
import { serverRenderer, errorHandler } from './middleware'
import paths from '../../config/paths'

require('dotenv').config()

const app = express()

const port = process.env.PORT || 8080

app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.locals.store = configureStore()
  if (typeof next !== 'function') {
    throw new Error('Next handler is missing')
  }
  next()
})

const manifestPath = path.join(paths.clientBuild, paths.publicPath)

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
)

app.use(serverRenderer())

app.use(errorHandler)

app.listen(port, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(
      `App is running at ${process.env.HOST || 'http://localhost'}:${port}`
    )
  )
})

export default app
