import React, { useState } from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import method from './lifecycle'
import { Input } from 'volantis-ui'

const List = ({
  getFilteredAppList,
  getAppList,
  handleAppSelected,
  list
}) => {
  const [search, setSearch] = useState('')

  return (
    <>
      <Input
        title=""
        name="search"
        type="search"
        placeholder="Search app"
        value={search || ''}
        onChange={e => setSearch(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? getFilteredAppList(search) : null }
      />
      <ul>
        {
          !!list.apps && list.apps.length > 0 && list.apps.map(app => (
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
}

List.defaultProps = {
  getFilteredAppList: () => {},
  getAppList: () => {},
  handleAppSelected: () => {},
  list: {}
}

List.propTypes = {
  getFilteredAppList: PropTypes.func,
  getAppList: PropTypes.func,
  handleAppSelected: PropTypes.func,
  list: PropTypes.object
}

export default lifecycle(method)(List)
