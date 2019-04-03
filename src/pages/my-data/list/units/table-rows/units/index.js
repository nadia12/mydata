import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'
import {
  jLocation
} from '../../../local-helper'

const TableRows = (props) => {
  const { _mydataList, 
          SET_ICON,
          ENTITY_ICON, 
          SYSTEM_FOLDERS, 
          entities, 
          setNtype, 
          getSizeAndStatus, 
          getTableRowsParams ,
          handleSelectList,
          handleRightClick
  } = props

  const currLocation = window.localStorage.getItem('MYDATA.location')
  
  return (
    <>
      {    
        //Render SYSTEM_FOLDERS
        JSON.parse(currLocation).name === 'ROOT' && !!SYSTEM_FOLDERS() && SYSTEM_FOLDERS().map((params, idx) => {
          return <Tr key={`tr-SYSTEM_FOLDERS-${idx}`} {...params} />
        }) 
      }
                        
      {
        !!entities && entities.map((en, idx) => {
          en.ntype = setNtype(en.type, en.entityType);
          en.idx = idx;

          const { size, status } = getSizeAndStatus(en, _mydataList);
          en.size = size;
          en.status = status;

          const { isSelected, handleDoubleClick } = getTableRowsParams(en, _mydataList);
          const icon = !!SET_ICON && SET_ICON(ENTITY_ICON[en.entityType || en.type || en.name], isSelected)
          return <Tr en = {en} 
                    isSelected = {isSelected}
                    oneClick = {{isActive: true, action: (event) => handleSelectList(event, en) }}
                    doubleClick = {{isActive: true, action: (event) => handleDoubleClick(event, en)}}
                    rightClick = {{isActive: true, action: (event) => handleRightClick(event, en) }}
                    ICON={icon}
                  />
        })
      }
    </>
  );
};

TableRows.defaultProps = {
  entities: [],
  SYSTEM_FOLDERS: [],
  handleRightClick: null,
  SET_ICON: null,
  ENTITY_ICON: null,
}

TableRows.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  setNtype: PropTypes.func.isRequired,
  getSizeAndStatus: PropTypes.func.isRequired,
  getTableRowsParams: PropTypes.func.isRequired,
  entities: PropTypes.object, 
  SET_ICON: PropTypes.func,
  ENTITY_ICON: PropTypes.object,
  SYSTEM_FOLDERS: PropTypes.array,
  handleRightClick: PropTypes.func,
  handleSelectList: PropTypes.func
}

export default TableRows;