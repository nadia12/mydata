import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { MyDataApp, ApiManagementApp } from 'volantis-lib'

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">MyDataApp</Link>
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
        </nav>

        <Route path="/" exact component={MyDataApp} />
        <Route path="/my-data/list" component={MyDataApp} />
        <Route path="/my-data/create" component={MyDataApp} />
        <Route path="/api-management" component={ApiManagementApp} />
      </div>
    </Router>
  );
}

export default AppRouter;