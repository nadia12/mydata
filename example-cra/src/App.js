import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import MyData from 'volantis-lib'

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">MyData</Link>
            </li>
            <li>
              <Link to="/my-data/list">List</Link>
            </li>
            <li>
              <Link to="my-data/create">Create</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={MyData} />
        <Route path="/my-data/list" component={MyData} />
        <Route path="/my-data/create" component={UseMyDatars} />
      </div>
    </Router>
  );
}

export default AppRouter;