import React from 'react'
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

const DEFAULT_ENTITY = { creatorName: '-', type: 'System Folder', size: '-', updatedAt: '-', status: '-' };

const staticFolders = [
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my dataset',
      name: 'My Dataset',
    },
    icon: <DatasetIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my model',
      name: 'My Model'
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'pretrained model',
      name: 'Pre-Trained Model',
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    idx: 'my trash',
    en: { 
      ...DEFAULT_ENTITY,
      name: 'Trash'
    },
    icon: <TrashFolderIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  }
]

const TableList = props => {
  return (
    <TableListStyle>
      <thead className="has-text-gray">
        <tr>
          {
            props.thead.map((th, idx) => {
              return (
                <th key={`th-${idx}`} onClick={th.isSortAble ? (() => this.handleSort(th.origName)) : null} className="table-header" style={{ width: th.width }}>
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
                    !!staticFolders && staticFolders.map((params, idx) => {
                      return <Tr key={`tr-${idx}`}  {...params} setIcon={props.setIcon} />
                    })
                  }

                  {
                    // !!entities && entities.map((en, idx) => {
                    //   en.ntype = this.setNtype(en.type, en.entityType);
                    //   en.idx = idx;

                    //   const { size, status } = this.getSizeAndStatus(en);
                    //   en.size = size;
                    //   en.status = status;

                    //   const { isSelected, handleClick, handleDoubleClick } = this.getTableRowsParams(en);
                    //   return this.renderTableRow(en, isSelected, handleClick, handleDoubleClick);
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
  sort: {
    activeField: 'origUpdatedAt',
    isAsc: false
  },
  renderContextMenu: () => {},
  handleClick: null,
  handleDoubleClick: null,
  setIcon: (iconName) =>  {
    const icons = {
      Model: <MyModelIcon color={colors.gold} />,
      Dataset: <DatasetIcon color={colors.gold} />,
      Trash:   <TrashFolderIcon color={colors.gold} />,
      Folder: <FolderIcon color={colors.gold} />,
      default: <FileIcon />
    };
    return icons[iconName] || icons.default;
  }
}

TableList.propTypes = {
  thead: PropTypes.array,
  entities: PropTypes.array,
  isRenderSystemFolder: PropTypes.bool,
  sort: PropTypes.object,
  renderContextMenu: PropTypes.func,
  handleClick: PropTypes.func,
  handleDoubleClick: PropTypes.func,
  setIcon: PropTypes.func,
}

export default TableList