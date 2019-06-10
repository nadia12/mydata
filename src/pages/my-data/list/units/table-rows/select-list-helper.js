/**
 * HandleSelectList on TableRows. Handling Event :
 * a. ctrl
 * b. shift
 * c. default (on click)
 */

import {
  isWindowExist,
} from 'Config/lib/url-helper'

import { DEFAULT_STATE } from 'MyData/list/initial-states'

import {
  setValues,
} from 'MyData/list/reducer'

import getRightClickMenus from './right-click-helper/rc-menus'

// ** ONCLICK ON TABLE ROWS
const eventName = event => {
  let name = 'default'
  if (event.metaKey || event.ctrlKey) name = 'ctrl'
  if (event.shiftKey) name = 'shift'

  return name
}

// *** set status 'isSelected' in entity list.
const setSelectedStatus = (newSelected, entities) => {
  const newSelectedIds = Object.values(newSelected).flatMap(selected => selected).map(({ id }) => id)

  const newEntities = entities.map(entity => ({
    ...entity,
    isSelected: newSelectedIds.includes(entity.id),
  }))

  return newEntities
}

const ctrlEvent = (entity, selected) => {
  const { selectedType, id } = entity
  const newSelected = { ...selected }

  const detail = selected[selectedType].find(det => det.id === id)
  let newSelectedByType = selected[selectedType]
  const exist = detail && newSelectedByType.findIndex(select => select.id === detail.id) > -1

  if (exist) newSelectedByType = newSelectedByType.filter(select => select.id !== detail.id)
  else newSelectedByType = [...newSelectedByType, { ...entity }]

  newSelected[selectedType] = newSelectedByType

  return newSelected
}

const shiftEvent = (entity, _mydataList) => {
  const { idx: enIdx } = entity
  const { lastSelected, selected, entities } = _mydataList
  const newSelected = { ...selected }

  if (isWindowExist()) window.document.getSelection().removeAllRanges()
  const selectedEntities = lastSelected < enIdx ? entities.slice(lastSelected, enIdx + 1) : entities.slice(enIdx, lastSelected + 1)
  selectedEntities.forEach(selectedEn => {
    let newSelectedByType = newSelected[selectedEn.selectedType]

    const exist = newSelectedByType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1
    if (!exist) newSelectedByType = [...newSelectedByType, { ...selectedEn }]

    newSelected[selectedEn.selectedType] = newSelectedByType
  })

  return newSelected
}

const selectByEvent = (event, entity, _mydataList) => {
  const { selectedType } = entity
  const { selected } = _mydataList

  const actions = {
    ctrl: () => ctrlEvent(entity, selected),
    shift: () => shiftEvent(entity, _mydataList),
    default: () => {
      const newSelected = {
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
        [selectedType]: [entity],
      }

      return newSelected
    },
  }

  return actions[eventName(event)]
}

const handleSelectList = (event, entity, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList },
  } = getState()

  const { idx: enIdx } = entity
  const { show, entities, allFolders } = _mydataList

  const newSelected = selectByEvent(event, entity, _mydataList)()
  const newEntities = setSelectedStatus(newSelected, entities)
  const menuList = (isRightClick && getRightClickMenus(newSelected, entities, allFolders)) || []

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

export default handleSelectList
