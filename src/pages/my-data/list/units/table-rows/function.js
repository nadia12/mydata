import { handleCollectionClick } from '../../function'

export const getTableRowsParams = (en, linkTo) => dispatch => {
  const tableRows = {
    folder: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en, linkTo })),
    },
    sensorgroup: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en, linkTo })),
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
