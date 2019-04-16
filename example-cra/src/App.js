import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
  MyDataListApp,
  MyDataCreateApp,
} from 'volantis-lib'

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/my-data" exact component={MyDataListApp} />
        <Route path="/my-data/create" component={MyDataCreateApp} />
      </Switch>
    </Router>
  )
}

export default AppRouter
