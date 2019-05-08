import { handleCollectionClick } from '../../function'

export const getTableRowsParams = en => dispatch => {
  const tableRows = {
    folder: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en })),
    },
    sensorgroup: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en })),
    },
    asset: {
      en,
      handleDoubleClick: () => {},
    },
    default: {
      en,
      handleDoubleClick: () => {},
    },
  }

  return tableRows[en.selectedType] || tableRows.default
}
