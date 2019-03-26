import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
  TrashFolderIcon,
  FileIcon,
  DatasetIcon,
  MyModelIcon,
  FolderIcon,
  ArrowDropupIcon,
  ArrowDropdownIcon
} from 'volantis-icon'

import { TableListStyle } from './style'
import colors from 'Asset/css/colors'
import Tr from './tr'

const TableList = props => {
  console.log('======> table list', props)
  return (
    <TableListStyle>
      <thead className="has-text-gray">
        <tr>
          {
            props.thead.map((th, idx) => {
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
                  {
                    !!props.staticFolders && props.staticFolders.map((params, idx) => {
                      return <Tr key={`tr-${idx}`}  {...params} setIcon={props.setIcon} />
                    })
                  }
                  { props.renderTrEntities() }
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
  thead:[
    { name: 'Name', width: '25.84%', origName: 'name', isSortAble: true },
    { name: 'Owner', width: '15.94%', origName: 'creatorName', isSortAble: true },
    { name: 'Type', width: '15.94%', origName: 'labelType', isSortAble: true },
    { name: 'Size', width: '7.9%', origName: 'origSize', isSortAble: true },
    { name: 'Last Updated', width: '15.94%', origName: 'origUpdatedAt', isSortAble: true },
    { name: 'Status', width: '18.34%', origName: 'status', isSortAble: false }
  ],
  entities: [],
  staticFolders: [],
  sort: {
    activeField: 'origUpdatedAt',
    isAsc: false
  },
  renderContextMenu: () => {},
  renderTrEntities: () => {},
  handleClick: null,
  handleDoubleClick: null,
  setIcon: (iconName) =>  {
    const icons = {
      Model:   <MyModelIcon color={colors.gold} />,
      Dataset: <DatasetIcon color={colors.gold} />,
      Trash:   <TrashFolderIcon color={colors.gold} />,
      Folder:  <FolderIcon color={colors.gold} />,
      default: <FileIcon />
    };
    return icons[iconName] || icons.default;
  }
}

TableList.propTypes = {
  thead: PropTypes.array,
  entities: PropTypes.array,
  staticFolders: PropTypes.array,
  isRenderSystemFolder: PropTypes.bool,
  sort: PropTypes.object,
  renderContextMenu: PropTypes.func,
  renderTrEntities: PropTypes.func,
  handleClick: PropTypes.func,
  handleDoubleClick: PropTypes.func,
  handleSort: PropTypes.func,
  setIcon: PropTypes.func,
}

export default TableList