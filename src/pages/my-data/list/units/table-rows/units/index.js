import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'

const TableRows = props => {
  const {
    _mydataList,
    SET_ICON,
    ENTITY_ICON,
    SYSTEM_FOLDERS,
    entities,
    setNtype,
    getSizeAndStatus,
    getTableRowsParams,
    handleSelectList,
    handleRightClick,
  } = props

  const currLocation = window.localStorage.getItem('MYDATA.location')
  const inRoot = !!currLocation && JSON.parse(currLocation).name === 'ROOT'

  return (
    <>
      {
        // Render SYSTEM_FOLDERS
        inRoot && !!SYSTEM_FOLDERS() && SYSTEM_FOLDERS().map((params, idx) => <Tr key={`tr-SYSTEM_FOLDERS-${idx}`} {...params} />)
      }

      {
        !!entities && entities.map((en, idx) => {
          const newEn = { ...en }
          newEn.ntype = setNtype(en.type, en.entityType)
          newEn.idx = idx

          const { size, status } = getSizeAndStatus(en, _mydataList)
          newEn.size = size
          newEn.status = status

          const { isSelected, handleDoubleClick } = getTableRowsParams(newEn, _mydataList)
          const icon = !!SET_ICON && SET_ICON(ENTITY_ICON[newEn.entityType || newEn.type || newEn.name], isSelected)

          return (
            <Tr
              key={idx}
              en={newEn}
              isSelected={isSelected}
              oneClick={{ isActive: true, action: event => handleSelectList(event, newEn) }}
              doubleClick={{ isActive: true, action: event => handleDoubleClick(event, newEn) }}
              rightClick={{ isActive: true, action: event => handleRightClick(event, newEn) }}
              ICON={icon}
            />
          )
        })
      }
    </>
  )
}

TableRows.defaultProps = {
  entities: [],
  SYSTEM_FOLDERS: [],
  handleRightClick: null,
  handleSelectList: null,
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
  handleSelectList: PropTypes.func,
}

export default TableRows
