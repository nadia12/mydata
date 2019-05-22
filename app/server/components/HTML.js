// @flow
/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

export default function HTML({
  children, scripts, css, state, styled,
}) {
  const head = Helmet.renderStatic()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <link rel="shortcut icon" href="https://volantisiq.com/static/img/favicon.png" type="image/vnd.microsoft.icon" />
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {css.map(href => <link key={href} rel="stylesheet" href={href} />)}
        <style>{styled}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(src => <script key={src} src={src} />)}
      </body>
    </html>
  )
}

HTML.propTypes = {
  children: PropTypes.node.isRequired,
  css: PropTypes.array,
  scripts: PropTypes.array,
  state: PropTypes.string,
  styled: PropTypes.string,
}

HTML.defaultProps = {
  css: [],
  scripts: [],
  state: '{}',
  styled: '',
}
