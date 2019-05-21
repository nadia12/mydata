import {
  LOCATIONS,
  UI_ENTITY_TYPES,
} from 'Config/constants'

import {
  isWindowExist,
  extendedData,
} from 'Config/lib/url-helper'

import {
  setBreadcrumbBy,
} from 'Config/lib/local-helper'

import { DEFAULT_STATE } from 'MyData/list/initial-states'
import { setDoubleClick } from 'MyData/list/reducer'

// ** Folder Double Click
const handleCollectionClick = ({ entity = {}, linkTo }) => (dispatch, getState) => {
  if (!!entity.name && (entity.uiEntityType === UI_ENTITY_TYPES.FOLDER || entity.uiEntityType === UI_ENTITY_TYPES.SQL_DATABASE)) {
    const {
      volantisMyData: { _mydataList: { headers } },
      volantisConstant: { routes: { myData: { root: myDataRoot } } },
    } = getState()

    const newJBreadcrumb = setBreadcrumbBy(entity)

    const values = {
      headers: { ...headers, 'V-PARENTID': entity.id, 'V-PATH': entity.path },
      selected: { ...DEFAULT_STATE.selected },
    }

    if (isWindowExist()) {
      const extendedDataValues = {
        entityId: entity.id,
        name: entity.name,
        breadcrumb: JSON.stringify(newJBreadcrumb),
        locationType: LOCATIONS.FOLDER,
      }

      linkTo(`${myDataRoot}?q=${extendedData('encode', extendedDataValues)}`)
      dispatch(setDoubleClick(values))
    }
  }
}
//  END Folder Double CLick

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
