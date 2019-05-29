import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { Switch } from 'react-router'
import { renderRoutes } from 'react-router-config'

import routes from './routes'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Inconsolata|Roboto:400,500');
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto',sans-serif;
    background: #313440;
    color: #9ea1b4;
  }
`

function App() {
  return (
    <>
      <Helmet defaultTitle="Volantis IQ" titleTemplate="%s – Enterprise Data Unification Platform" />
      <GlobalStyle />
      <Switch>
        {renderRoutes(routes)}
      </Switch>
    </>
  )
}

export default connect()(App)
