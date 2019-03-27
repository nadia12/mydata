import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'

const TableRows = (props) => {
  console.log("TableRows==>", props)
  return (
    <>
    
      {    
        //Render SystemFolders
        !!props.systemFolders && props.systemFolders.map((params, idx) => {
          return <Tr key={`tr-systemfolders-${idx}`} {...params} setIcon={props.setIcon} />
        }) 
      }
                        
      {
        !!props.entities && props.entities.map((en, idx) => {
          en.ntype = props.setNtype(en.type, en.entityType);
          en.idx = idx;

          const { size, status } = props.getSizeAndStatus(en, props._mydataList);
          en.size = size;
          en.status = status;

          const { isSelected, handleClick, handleDoubleClick } = props.getTableRowsParams(en, props._mydataList);
          return <Tr en = {en} 
                    isSelected = {isSelected}
                    handleClick = {handleClick}
                    handleDoubleClick = {handleDoubleClick}
                    handleRightClick = {() => null}
                    setIcon={props.setIcon}
                  />
        })
      }
    </>
  );
};

TableRows.defaultProps = {
  entities: [],
  systemFolders: [],
}

TableRows.propTypes = {
  _mydataList: PropTypes.object._mydataList,
  setNtype: PropTypes.func.isRequired,
  getSizeAndStatus: PropTypes.func.isRequired,
  getTableRowsParams: PropTypes.func.isRequired,
  setIcon: PropTypes.func.isRequired,
  entities: PropTypes.object, 
  systemFolders: PropTypes.array,

  // isSelected: PropTypes.bool, 
  // handleClick: PropTypes.func, 
  // handleDoubleClick: PropTypes.func, 
  // handleRightClick: PropTypes.func, 
  // setIcon: PropTypes.func,
  // icon: PropTypes.element
}

export default TableRows;