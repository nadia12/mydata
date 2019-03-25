import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import {MyDataListApp, MyDataCreateApp} from 'volantis-lib'
// import MyDataCreateApp from 'volantis-lib'

function AppRouter() {
  return (
    <Router>
      <div>
        {/* <nav>
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
        </nav> */}

        <Route path="/" exact component={MyDataListApp} />
        <Route path="/my-data/list" component={MyDataListApp} />
        <Route path="/my-data/create" component={MyDataCreateApp} />
      </div>
    </Router>
  );
}

export default AppRouter;