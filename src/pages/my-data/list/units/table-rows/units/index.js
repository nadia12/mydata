import React from 'react'
import PropTypes from 'prop-types'
import Tr from 'GlobalComponent/table-list/units/tr'

const TableRows = props => {
  const {
    SET_ICON,
    ENTITY_ICON,
    entities,
    getTableRowsParams,
    handleSelectList,
    handleRightClick,
    theads,
    isEntitiesLoading,
    show,
  } = props

  return (
    <>
      {
        !!show.entityContent && !!entities && entities.map((en, idx) => {
          if (!en) return null

          const { handleDoubleClick } = getTableRowsParams(en)
          const icon = !!SET_ICON && SET_ICON(ENTITY_ICON[en.uiEntityType], en.isSelected)
          const tabularDatas = [
            {
              value: en.name,
              icon,
              width: theads[0].width,
              className: `table-icon ${en.isSelected ? 'icon-selected' : ''}`,
              ellipsis: true,
            },
            { value: en.creatorName, width: theads[1].width },
            { value: en.uiEntityType, width: theads[2].width },
            { value: en.size, width: theads[3].width },
            { value: en.updatedAt, width: theads[4].width },
            { value: `${en.status || '-'}`, width: theads[5].width },
          ]

          return (
            <Tr
              key={idx}
              isSelected={en.isSelected}
              oneClick={{ isActive: true, action: event => handleSelectList(event, en) }}
              doubleClick={{ isActive: true, action: event => handleDoubleClick(event, en) }}
              rightClick={{ isActive: true, action: event => handleRightClick(event, en) }}
              tds={tabularDatas}
            />
          )
        })
      }

      {
        !!isEntitiesLoading && Array(20).fill().map((_, idx) => {
          const waitingTds = [
            {
              value: 'waiting...', width: '25.84%',
            },
            {
              value: 'waiting...', width: '15.94%',
            },
            {
              value: 'waiting...', width: '15.94%',
            },
            {
              value: 'waiting...', width: '7.9%',
            },
            {
              value: 'waiting...', width: '15.94%',
            },
            {
              value: 'waiting...', width: '18.34%',
            },
          ]

          return (
            <Tr
              key={`td-waiting-${idx}`}
              tds={waitingTds}
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
  theads: [],
  isEntitiesLoading: false,
  show: {},
}

TableRows.propTypes = {
  getTableRowsParams: PropTypes.func.isRequired,
  entities: PropTypes.array,
  SET_ICON: PropTypes.func,
  ENTITY_ICON: PropTypes.object,
  handleRightClick: PropTypes.func,
  handleSelectList: PropTypes.func,
  theads: PropTypes.array,
  isEntitiesLoading: PropTypes.bool,
  show: PropTypes.object,
}

export default TableRows
