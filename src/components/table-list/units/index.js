import React from 'react'
import PropTypes from 'prop-types'
import {
  ArrowDropupIcon,
  ArrowDropdownIcon,
} from 'volantis-icon'

import { TableListStyle } from './style'

const TableList = props => (
  <TableListStyle>
    <thead className="has-text-gray">
      <tr>
        {
          props.theads.map((th, idx) => (
            <th
              key={`th-${idx}`}
              onClick={th.isSortAble ? (() => props.handleSort(th.origName)) : null}
              className="table-header"
              style={{ width: th.width }}
            >
              <div className="thead-icon">
                {th.name}
                { props.sort.activeField === th.origName && props.sort.isAsc && <ArrowDropupIcon /> }
                { props.sort.activeField === th.origName && !props.sort.isAsc && <ArrowDropdownIcon /> }
              </div>
            </th>
          ))
        }
      </tr>
      <tr className="table-content">
        <td colSpan="6">
          <div style={{
            width: '100%',
            maxHeight: 'calc(100vh - 313px)',
            overflow: 'auto',
          }}
          >
            <TableListStyle>
              <tbody>
                { props.children }
              </tbody>
            </TableListStyle>
          </div>
        </td>
      </tr>
    </thead>
  </TableListStyle>
)

TableList.defaultProps = {
  children: null,
  theads: [{
    name: 'Name',
    width: '25.84%',
    origName: 'name',
    isSortAble: true,
  }],
  sort: {
    activeField: 'origUpdatedAt',
    isAsc: false,
  },
}

TableList.propTypes = {
  children: PropTypes.element,
  theads: PropTypes.array,
  sort: PropTypes.object,
  handleSort: PropTypes.func.isRequired,
}

export default TableList
