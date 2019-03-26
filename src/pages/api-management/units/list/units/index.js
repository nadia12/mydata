import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import { Input } from 'volantis-ui'

import method from './lifecycle'

const List = ({
  getFilteredAppList,
  getAppList,
  handleAppSelected,
  apps,
  search,
  setSearch
}) => (
  <>
    <Input
      title=""
      name="search"
      type="search"
      placeholder="Search app"
      value={search}
      onChange={e => setSearch(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' ? getFilteredAppList(search) : null }
    />
    <ul>
      {
        !!apps && apps.length > 0 && apps.map(app => (
          <li
            key={app.id}
            onClick={() => handleAppSelected(app.id)}
          >
            {app.name}
            {app.isDisabled ? 'Disabled' : ''}
          </li>
        ))
      }
    </ul>
  </>
)

List.defaultProps = {
  getFilteredAppList: () => {},
  handleAppSelected: () => {},
  setSearch: () => {},
  apps: [],
  search: ''
}

List.propTypes = {
  getFilteredAppList: PropTypes.func,
  handleAppSelected: PropTypes.func,
  setSearch: PropTypes.func,
  apps: PropTypes.array,
  search: PropTypes.string
}

export default lifecycle(method)(List)
