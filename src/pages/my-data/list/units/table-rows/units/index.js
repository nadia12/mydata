import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'

const TableRows = (props) => {
  return (
    <>
      {    
        //Render SYSTEM_FOLDERS
        !!props.SYSTEM_FOLDERS && props.SYSTEM_FOLDERS.map((params, idx) => {
          return <Tr key={`tr-SYSTEM_FOLDERS-${idx}`} {...params} />
        }) 
      }
                        
      {
        !!props.entities && props.entities.map((en, idx) => {
          en.ntype = props.setNtype(en.type, en.entityType);
          en.idx = idx;

          const { size, status } = props.getSizeAndStatus(en, props._mydataList);
          en.size = size;
          en.status = status;

          const { isSelected, handleClick, handleDoubleClick } = props.getTableRowsParams(en, props._mydataList, props.handleSelectList);
          return <Tr en = {en} 
                    isSelected = {isSelected}
                    oneClick = {{isActive: true, action: handleClick}}
                    doubleClick = {{isActive: true, action: handleDoubleClick}}
                    rightClick = {{isActive: true, action: (event) => props.handleRightClick(event, en) }}
                    ICON={props.ICON}
                  />
        })
      }
    </>
  );
};

TableRows.defaultProps = {
  entities: [],
  SYSTEM_FOLDERS: [],
  handleRightClick: null
}

TableRows.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  setNtype: PropTypes.func.isRequired,
  getSizeAndStatus: PropTypes.func.isRequired,
  getTableRowsParams: PropTypes.func.isRequired,
  entities: PropTypes.object, 
  ICON: PropTypes.func.isRequired,
  SYSTEM_FOLDERS: PropTypes.array,
  handleRightClick: PropTypes.func,
}

export default TableRows;