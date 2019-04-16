import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'

const TableRows = props => {
  const {
    SET_ICON,
    ENTITY_ICON,
    ENTITY_TYPE_LABEL,
    entities,
    getTableRowsParams,
    handleSelectList,
    handleRightClick,
    theads,
  } = props
  console.log("ENTITY_TYPE_LABEL==>", ENTITY_TYPE_LABEL)

  return (
    <>
      {
        !!entities && entities.map((en, idx) => {
          const { isSelected, handleDoubleClick } = getTableRowsParams(en)
          const icon = !!SET_ICON && SET_ICON(ENTITY_ICON[en.entityType || en.type || en.name], isSelected)
          const tabularDatas = [
            {
              value: en.name,
              icon,
              width: theads[0].width,
              className: `table-icon ${isSelected ? 'icon-selected' : ''}`,
            },
            { value: en.creatorName, width: theads[1].width },
            { value: `${ENTITY_TYPE_LABEL[en.entityType] || 'ITEM' }`, width: theads[2].width },
            { value: en.size, width: theads[3].width },
            { value: en.updatedAt, width: theads[4].width },
            { value: `${en.status || '-'}`, width: theads[5].width },
          ]

          return (
            <Tr
              key={idx}
              isSelected={isSelected}
              oneClick={{ isActive: true, action: event => handleSelectList(event, en) }}
              doubleClick={{ isActive: true, action: event => handleDoubleClick(event, en) }}
              rightClick={{ isActive: true, action: event => handleRightClick(event, en) }}
              tds={tabularDatas}
            />
          )
        })
      }
    </>
  )
}

TableRows.defaultProps = {
  entities: [],
  handleRightClick: null,
  handleSelectList: null,
  SET_ICON: null,
  ENTITY_ICON: {},
  ENTITY_TYPE_LABEL: {},
  theads: [],
}

TableRows.propTypes = {
  getTableRowsParams: PropTypes.func.isRequired,
  entities: PropTypes.object,
  SET_ICON: PropTypes.func,
  ENTITY_ICON: PropTypes.object,
  ENTITY_TYPE_LABEL: PropTypes.object,
  handleRightClick: PropTypes.func,
  handleSelectList: PropTypes.func,
  theads: PropTypes.array,
}

export default TableRows
