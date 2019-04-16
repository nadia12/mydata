import { handleCollectionClick, setEntityList } from '../../function'

export const getTableRowsParams = en => (dispatch, getState) => {
  const { selected } = getState()._mydataList
  const isSelected = !!en.id
                      && selected[en.selectedType].length
                      && selected[en.selectedType].findIndex(select => `${select.id}` === `${en.id}`) > -1
  console.log("isSelected", isSelected)
  
  const tableRows = {
    folder: {
      en,
      isSelected,
      handleDoubleClick: () => {
        dispatch(handleCollectionClick({ entity: en }))

        return dispatch(setEntityList())
      },
    },
    sensorgroup: {
      en,
      isSelected,
      handleDoubleClick: () => {
        // this.handleChangeLocation('Sensor Group');
        dispatch(handleCollectionClick({ entity: en }))
      },
    },
    asset: {
      en,
      isSelected,
      handleDoubleClick: null,
    },
    default: {
      en,
      isSelected,
      handleDoubleClick: null,
    },
  }

  return tableRows[en.selectedType] || tableRows.default
}
