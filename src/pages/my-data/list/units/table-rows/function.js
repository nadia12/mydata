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
  setValues,
  setToggleModalOpen,
} from 'MyData/list/reducer'

import { getRightClickMenus } from './right-click-helper/rc-menus'

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

// ** ONCLICK ON TABLE ROWS
const eventName = event => {
  let name = 'default'
  if (event.metaKey || event.ctrlKey) name = 'ctrl'
  if (event.shiftKey) name = 'shift'

  return name
}

const selectedByEvent = (event, en, _mydataList) => {
  const { selectedType, id, idx: enIdx } = en
  const { lastSelected, selected, entities } = _mydataList
  let newSelected = { ...selected }

  const actions = {
    ctrl: () => {
      const detail = selected[selectedType].find(det => det.id === id)
      let newSelectedByType = selected[selectedType]
      const exist = detail && newSelectedByType.findIndex(select => select.id === detail.id) > -1

      if (exist) newSelectedByType = newSelectedByType.filter(select => select.id !== detail.id)
      else newSelectedByType.push({ ...en })

      newSelected[selectedType] = newSelectedByType

      return newSelected
    },

    shift: () => {
      if (isWindowExist()) window.document.getSelection().removeAllRanges()
      const selectedEntities = lastSelected < enIdx ? entities.slice(lastSelected, enIdx + 1) : entities.slice(enIdx, lastSelected + 1)
      selectedEntities.forEach(selectedEn => {
        const selectedByType = newSelected[selectedEn.selectedType]

        const exist = selectedByType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1
        if (!exist) newSelected[selectedEn.selectedType].push({ ...selectedEn })
      })

      return newSelected
    },
    default: () => {
      newSelected = {
        ...DEFAULT_STATE.selected,
        sensorgroup: [],
        sensor: [],
        datasource: [],
        folder: [],
        asset: [],
        dashboard: [],
        connector: [],
        pipeline: [],
        parquet: [],
        [selectedType]: [en],
      }

      return newSelected
    },
  }

  return actions[eventName(event)]
}

const setSelectedStatus = (newSelected, entities) => {
  const newSelectedIds = Object.values(newSelected).flatMap(selected => selected).map(({ id }) => id)

  const newEntities = entities.map(entity => ({
    ...entity,
    isSelected: newSelectedIds.includes(entity.id),
  }))

  return newEntities
}

const handleSelectList = (event, en, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList },
  } = getState()

  const { idx: enIdx } = en
  const { show, entities, allFolders } = _mydataList
  const newSelected = selectedByEvent(event, en, _mydataList)()

  const menuList = (isRightClick && getRightClickMenus(newSelected, entities, allFolders)) || []
  const newEntities = setSelectedStatus(newSelected, entities)

  const values = {
    selected: newSelected,
    show: { ...show, menubarRight: false, infoDrawer: false },
    assetDetail: { show: false, mp: {} },
    lastSelected: enIdx,
    menuList,
    position,
    entities: newEntities,
  }

  dispatch(setValues(values))
}
// END ONCLICK ON TABLE ROWS

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

