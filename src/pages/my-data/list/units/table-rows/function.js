import { handleCollectionClick, setEntityList } from '../../function'

export const getTableRowsParams = en => (dispatch, getState) => {
  const { selected: selectedCol } = getState()._mydataList
  const isSelected = !!en.id && !!selectedCol[en.ntype] && selectedCol[en.ntype].length > 0 && selectedCol[en.ntype].findIndex(select => `${select.id}` === `${en.id}`) > -1
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

  return tableRows[en.ntype] || tableRows.default
}
