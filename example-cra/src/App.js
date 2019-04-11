import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { MyDataListApp, ApiManagementApp } from 'volantis-lib'

function AppRouter() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">MyDataListApp</Link>
            </li>
            <li>
              <Link to="/my-data/list">List</Link>
            </li>
            <li>
              <Link to="/my-data/create">Create</Link>
            </li>
            <li>
              <Link to="/api-management">Api Management</Link>
            </li>
          </ul>
        </nav> */}
        <Route path="/" exact component={MyDataListApp} />
        <Route path="/my-data/list" component={MyDataListApp} />
        <Route path="/my-data/create" component={MyDataListApp} />
        <Route path="/api-management" component={ApiManagementApp} />
      </div>
    </Router>
  );
}

export default AppRouter