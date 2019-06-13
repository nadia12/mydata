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

import {
  setDoubleClick,
  setToggleModalOpen,
  getEntityConnector,
} from 'MyData/list/reducer'

import handleSelectList from './select-list-helper'

// ** Folder Double Click
const handleCollectionClick = ({ entity = {}, linkTo }) => (dispatch, getState) => {
  if (!!entity.name && [UI_ENTITY_TYPES.FOLDER, UI_ENTITY_TYPES.SQL_DATABASE].includes(entity.uiEntityType)) {
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

// ** RIGHT CLICK
const handleRightClick = (evt, en) => (dispatch, getState) => {
  evt.preventDefault()
  let {
    volantisMyData: { _mydataList: { position: { left, top } } },
  } = getState()

  const outerHeight = (isWindowExist() && window.outerHeight) || 0
  const outerWidth = (isWindowExist() && window.outerWidth) || 0

  const screenY = (outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280
  const screenX = (outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120
  top = Math.ceil(screenY / 16)
  left = Math.ceil(screenX / 16)

  dispatch(handleSelectList(evt, en, { left, top }, true))
}
// END RIGHT CLICK

export const getTableRowActions = (en, linkTo) => dispatch => {
  const tableRows = {
    folder: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en, linkTo })),
      handleOneClick: (event, en) => dispatch(handleSelectList(event, en)),
      handleRightClick: (event, entity) => {
        dispatch(handleRightClick(event, entity))
        dispatch(setToggleModalOpen('menubarRight'))
      },
    },
    sensorgroup: {
      en,
      handleDoubleClick: () => dispatch(handleCollectionClick({ entity: en, linkTo })),
      handleOneClick: (event, en) => dispatch(handleSelectList(event, en)),
      handleRightClick: (event, entity) => {
        dispatch(handleRightClick(event, entity))
        dispatch(setToggleModalOpen('menubarRight'))
      },
    },
    asset: {
      en,
      handleDoubleClick: () => {},
      handleOneClick: (event, en) => dispatch(handleSelectList(event, en)),
      handleRightClick: (event, entity) => {
        dispatch(handleRightClick(event, entity))
        dispatch(setToggleModalOpen('menubarRight'))
      },
    },
    default: {
      en,
      handleDoubleClick: () => {},
      handleOneClick: (event, en) => dispatch(handleSelectList(event, en)),
      handleRightClick: (event, entity) => {
        dispatch(handleRightClick(event, entity))
        dispatch(setToggleModalOpen('menubarRight'))
      },
    },
  }

  return tableRows[en.selectedType] || tableRows.default
}

export const setEntityConnector = connectorId => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
    },
  } = getState()

  const pathEntityConnector = `/v2/directory/${headers['V-DRIVEID']}/entity/${connectorId}`

  dispatch(getEntityConnector(pathEntityConnector, authCookie, (res, err) => {
    if (!err) {
      console.log('setEntityConnector ==> ', res)
    }
  }))
}

