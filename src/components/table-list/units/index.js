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
import colors from '../../../assets/css/colors'
import Tr from './tr'
import { setNtype, getSizeAndStatus } from '../function'
import { 
  DEFAULT_STATE,
  ENTITY_TYPE_LABEL,
  ENTITY_ICON
} from '../constant'

const TableList = props => {
  console.log('ini propsss =======>', props)
  useEffect(() => {
    props.getEntityList()
  }, [])

  const [state, setDefaultState] = useState({ ...DEFAULT_STATE })
  const { entities } = props

  const renderTableRow = (en, isSelected, handleClick, handleDoubleClick) => {
    const icon = ENTITY_ICON[en.type] || ENTITY_ICON[en.entityType] || ENTITY_ICON[en.name];
    en.labelType = ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type;

    return (
      <React.Fragment key={en.id}>
        <tr key={en.id} onContextMenu={(evt) => renderContextMenu(evt, en)} onClick={(evt) => handleClick(evt, en)} className={ isSelected && 'is-active' } onDoubleClick={handleDoubleClick ? () => handleDoubleClick(en) : null }>
          <td style={{ width: '25.84%' }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{this.renderIcon(icon)} &nbsp;&nbsp; {en.name}</div></td>
          <td style={{ width: '15.94%' }}><div> {en.creatorName} </div></td>
          <td style={{ width: '15.94%' }}>{ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type}</td>
          <td style={{ width: '7.9%' }}>{en.size}</td>
          <td style={{ width: '15.94%' }}>{en.updatedAt}</td>
          <td style={{ width: '18.34%' }}>{en.status || '-'}</td>
        </tr>
      </React.Fragment>
    );
  };

  const fetchEntityList = async () => {
    const location = JSON.parse(window.localStorage.getItem('MYDATA.location'));
    const req = {
      driveId: this.state.headers['V-DRIVEID'],
      entityId: location.entityId
    };
  
    // this.setState(({ show }) => ({
    //   show: { ...show, entityContent: false },
    //   selected: { sensorgroup: [], sensor: [], datasource: [], folder: [], asset: [] }
    // }));
    await props.getEntityList(req);
  }

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

                  {
                    // !!props.entities && props.entities.map((en, idx) => {
                    //   en.ntype = setNtype(en.type, en.entityType);
                    //   en.idx = idx;

                    //   const { size, status } = getSizeAndStatus(en, entities);
                    //   en.size = size;
                    //   en.status = status;

                      // const { isSelected, handleClick, handleDoubleClick } = this.getTableRowsParams(en, state);
                      // return renderTableRow(en, isSelected, handleClick, handleDoubleClick);
                    // })
                  }
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
  handleClick: PropTypes.func,
  handleDoubleClick: PropTypes.func,
  handleSort: PropTypes.func,
  setIcon: PropTypes.func,
  entity: PropTypes.object
}

export default TableList