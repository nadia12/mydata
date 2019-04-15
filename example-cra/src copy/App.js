import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  MyDataList,
  MyDataCreate,
} from 'volantis-mydata'

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/my-data" exact component={MyDataList} />
        <Route path="/my-data/create" component={MyDataCreate} />
      </Switch>
    </Router>
  )
}

export default AppRouter
