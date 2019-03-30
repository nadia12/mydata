import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  ArrowDropupIcon,
  ArrowDropdownIcon
} from 'volantis-icon'

import { TableListStyle } from './style'

const TableList = props => {
  return (
    <TableListStyle>
      <thead className="has-text-gray">
        <tr>
          {
            props.THEAD.map((th, idx) => {
              return (
                <th key={`th-${idx}`} 
                  onClick={th.isSortAble ? (() => props.handleSort(th.origName)) : null}
                  className="table-header" 
                  style={{ width: th.width }}>

                    <div className="thead-icon">
                      {th.name}
                      { props.sort.activeField === th.origName && props.sort.isAsc && <ArrowDropupIcon /> }
                      { props.sort.activeField === th.origName && props.sort.isAsc && <ArrowDropdownIcon /> }
                    </div>
                    
                </th>
              );
            })
          }
        </tr>
        <tr className="table-content">
          <td colSpan="6">
            <div style={{
              width: '100%',
              maxHeight: 'calc(100vh - 313px)',
              overflow: 'auto'
            }}>
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
};

TableList.defaultProps = {
  children: null,
  THEAD:[ // sample thead
    { name: 'Name', width: '25.84%', origName: 'name', isSortAble: true },
    { name: 'Owner', width: '15.94%', origName: 'creatorName', isSortAble: true },
    { name: 'Type', width: '15.94%', origName: 'labelType', isSortAble: true },
    { name: 'Size', width: '7.9%', origName: 'origSize', isSortAble: true },
    { name: 'Last Updated', width: '15.94%', origName: 'origUpdatedAt', isSortAble: true },
    { name: 'Status', width: '18.34%', origName: 'status', isSortAble: false }
  ],
  sort: {
    activeField: 'origUpdatedAt',
    isAsc: false
  },
}

TableList.propTypes = {
  children: PropTypes.element,
  THEAD: PropTypes.array,
  sort: PropTypes.object,
  handleSort: PropTypes.func,
}

export default TableList