import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import Html from '../components/HTML'
import App from '../../shared/App'

const serverRenderer = () => (req, res) => {
  let content = ''
  let styled = ''

  const sheet = new ServerStyleSheet()

  try {
    content = renderToString(
      <Provider store={res.locals.store}>
        <Router location={req.url} context={{}}>
          {sheet.collectStyles(<App />)}
        </Router>
      </Provider>
    )
    styled = sheet.getStyleTags()
  } catch (err) {
    console.error(err) // eslint-disable-line
  } finally {
    sheet.seal()
  }

  const initialState = res.locals.store.getState()

  initialState.authorization.isAuthenticated = typeof req.cookies[process.env.AUTH_COOKIE || 'SID_IQ'] !== 'undefined'

  const state = JSON.stringify(initialState)

  return res.send(
    `<!doctype html>${
      renderToString(
        <Html
          css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')].filter(Boolean)}
          scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')].filter(Boolean)}
          state={state}
          styled={styled}
        >
          {content}
        </Html>
      )}`
  )
}

export default serverRenderer
