import { handleCollectionClick } from '../../function'

export const getTableRowsParams = en => (dispatch, getState) => {
  const { volantisMyData: { _mydataList: { selected } } } = getState()
  const isSelected = !!en.id
                      && !!selected[en.selectedType] && selected[en.selectedType].length
                      && selected[en.selectedType].findIndex(select => `${select.id}` === `${en.id}`) > -1

  const tableRows = {
    folder: {
      en,
      isSelected,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en })),
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
      handleDoubleClick: () => {},
    },
    default: {
      en,
      isSelected,
      handleDoubleClick: () => {},
    },
  }

  return tableRows[en.selectedType] || tableRows.default
}
