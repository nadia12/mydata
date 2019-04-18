import inputReplacer from 'Config/lib/input-replacer'
import checkRequired from 'Config/lib/input-check-required'
import queryString from 'query-string'

import sortColumn from 'Config/lib/sort-column'
import {
  FILE_TYPES,
  ASSET_STATUS,
} from 'Config/constants'
import {
  SET_AUTH_COOKIE,
} from './action-type'
import {
  setValue,
  setValues,
  setEmptyEntities,
  setShowEntities,
  setToggleModalOpen,
  setConfirmationModalClose,
  setConfirmationModalOpen,
  setDoubleClick,
  postMoveToTrash,
  postRestoreFromTrash,
  putSyncDatasource,
  getTrashList,
  putMoveDirectory,
  getEntityList,
  getFilteredAppByAsset,
} from './reducer'
import { getMenuList } from './menu-right-helper'
import {
  LOCATIONS,
  DATASOURCE_STATUS,
  ENTITY_TYPES,
  DEFAULT_TYPE_LABEL,
} from './constant'

import { DEFAULT_STATE } from './initial-states'

import {
  doRefineEntities,
} from './helper'

import {
  isInSensorGroup,
  getBreadcrumb,
  isBreadcrumbExist,
  getLocation,
  isInTrash,
} from './local-helper'

const breadcrumb = getBreadcrumb()

export const setHeaders = () => (dispatch, getState) => {
  const { userInfo } = getState()._mydataList

  dispatch(setValue('headers', {
    'V-DRIVEID': userInfo.owner_id || 'bc0d3416-2441-466d-acf1-69b7b082a3bf',
    'V-CREATORNAME': userInfo.name || '',
    'V-CREATORID': userInfo.id || '',
    'V-PARENTID': '',
    'V-PATH': '',
  }))
}

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export const setEntityList = (query = {}) => (dispatch, getState) => {
  const { _mydataList: { authCookie, headers, sort } } = getState()
  const currLocation = window.localStorage.getItem('MYDATA.location')

  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      parentId: JSON.parse(currLocation).entityId,
      pathPrefix: JSON.parse(currLocation).path,
      orderName: sort.activeField,
      orderType: sort.isAsc ? 'ASC' : 'DESC',
      ...query,
    },
  }

  dispatch(getEntityList(params, authCookie, res => dispatch(setShowEntities(doRefineEntities(res)))))
}

// *** RIGHT CLICK ACTION
const isSelectedAllError = selected => {
  const arraySelected = [...Object.values(selected)]

  return !arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1
}

const rightClickMenus = (selected, _mydataList) => {
  const { entities } = _mydataList

  const inTrash = isInTrash()

  const cDataSource = selected.datasource.length
  const cAsset = selected.asset.length
  const cDashboard = selected.dashboard.length
  const cAssetSuccess = cAsset ? selected.asset
    .filter(et => et.status === ASSET_STATUS.SUCCESS || et.status === ASSET_STATUS.DONE).length : 0
  const cSensor = selected.sensor.length
  const cFolder = selected.folder.length
  const cSensorGroup = selected.sensorgroup.length

  const hasSensorSelected = cSensor + cSensorGroup > 0
  const hasSelectedItem = cSensor + cFolder + cDataSource + cAsset + cSensorGroup + cDashboard > 0

  const folders = entities.length ? entities
    .filter(et => et.entityType === null && et.type === FILE_TYPES.COLLECTION)
    .map(et => ({ label: et.name, value: et.id })) : []

  const sensorgroups = entities.length ? entities
    .filter(et => et.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR && et.type === FILE_TYPES.ITEM)
    .map(et => ({ label: et.name, value: et.id })) : []

  // Show Menus Condition
  const showInfo = (cSensor === 1 || cSensorGroup === 1 || cDataSource === 1 || cDashboard === 1)
                    && (cSensor + cSensorGroup + cDataSource + cDashboard === 1)

  const showTrash = !inTrash && (cDashboard || cDataSource) && cSensor === 0
                    && cFolder === 0 && cAsset === 0 && cSensorGroup === 0
                    && isSelectedAllError(selected.datasource)

  const showSync = !inTrash && cSensor === 0 && cSensorGroup === 0 && cDataSource === 1
                    && !selected.datasource[0].entityType.startsWith('FILE_')

  const showAddToSensorGroup = !inTrash && !isInSensorGroup()
                    && cSensor && cSensorGroup === 0 && cDataSource === 0
                    && selected.sensor.every(sensor => sensor.type === selected.sensor[0].type)

  const showDetailAssets = !inTrash && cAsset === 1 && cAssetSuccess === 1
  const showAddToPipeline = !inTrash && cSensor + cFolder + cDataSource + cAsset + cSensorGroup > 0
  const showEditDashboard = !inTrash && cDashboard === 1
  const showRestoreItem = inTrash && hasSelectedItem
  const showMoveToFolder = !inTrash && hasSelectedItem && !!folders && folders.length

  const show = {
    editDashboard: showEditDashboard,
    pipeline: showAddToPipeline && !hasSensorSelected,
    pipelineSensor: showAddToPipeline && hasSensorSelected,
    createApp: showDetailAssets,
    info: showInfo,
    sync: showSync,
    moveToFolder: showMoveToFolder,
    sensorgroup: showAddToSensorGroup && sensorgroups && sensorgroups.length,
    asset: showDetailAssets,
    delete: showTrash,
    restore: showRestoreItem,
  }

  const submenu = {
    folders: folders || [],
    sensorgroup: sensorgroups || [],
  }

  return getMenuList(show, submenu)
}

const handleCreatePipeline = () => (dispatch, getState) => {
  const { selected: { datasource }, selected } = getState()._mydataList

  delete selected.menu

  const newSelected = {
    ...selected,
    datasource: !!datasource && (
      datasource.filter(d => d.status === DATASOURCE_STATUS.SUCCESS || d.status === DATASOURCE_STATUS.SYNC_SUCCESS || d.status === DATASOURCE_STATUS.SYNC_FAILED)
    ),
  }

  const flattenSelect = Object.values(newSelected).flatMap(select => select)

  const ids = flattenSelect.map(({ id }) => encodeURIComponent(id))
  const names = flattenSelect.map(({ name }) => encodeURIComponent(name))

  if (ids.length === 0) {
    dispatch(setConfirmationModalOpen({ type: 'addToPipelineEmpty' }))
  } else {
    const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      // window.location.href = `${RoutePath.pipeline}?${qs}`
      window.location.href = `/pipeline?${qs}` // route pipeline perlu di define
    }
  }
}

const handleMoveDirectory = menu => (dispatch, getState) => {
  const { authCookie, selected, headers } = getState()._mydataList

  const selecteds = [...Object.values(selected)]
  selecteds.forEach(select => {
    select.forEach(s => {
      if (!!s && s.id) {
        const data = {
          driveId: headers['V-DRIVEID'],
          entityId: s.id,
          name: s.name,
          targetCollectionId: menu,
        }
        dispatch(putMoveDirectory(data.driveId, data.entityId, data.targetCollectionId, authCookie, res => {
          if (res) dispatch(setEntityList())
        }))
      }
    })
  })
}

const handleEditDashboard = () => (dispatch, getState) => {
  const { selected: { dashboard } } = getState()._mydataList
  console.log('will hit xplorer service provider', dashboard)
}

const setTrashList = () => (dispatch, getState) => {
  const { authCookie, headers } = getState()._mydataList
  const driveId = headers['V-DRIVEID']

  return dispatch(getTrashList(driveId, authCookie, res => (
    dispatch(setValue('entities', doRefineEntities(res)))
  )))
  // dispatch(getTrashList(res => dispatch(setValue('entities', doRefineEntities(res)))))
}

const handleActionTrash = (type = 'move') => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { selected, authCookie } = _mydataList

  const selecteds = [...Object.values(selected)]
  const driveId = _mydataList.headers['V-DRIVEID']

  const flattenSelect = Object.values(selecteds).flatMap(select => select)
  const ids = flattenSelect.map(s => (s.id))

  const defineAction = type => {
    const action = {
      move: () => {
        dispatch(postMoveToTrash(driveId, ids, authCookie, () => {
          dispatch(setEntityList())
        }))
      },
      restore: () => {
        dispatch(postRestoreFromTrash(driveId, ids, authCookie, () => {
          dispatch(setTrashList())
        }))
      },
      default: () => {
        console.log('default')
      },
    }

    return action[type]() || action.default()
  }

  return defineAction(type)
}

const handleAssetDetail = () => (dispatch, getState) => {
  const { authCookie, selected: { asset } } = getState()._mydataList
  dispatch(getFilteredAppByAsset({ assetId: asset[0].id }, authCookie, res => {
    dispatch(setValue('appLists', res))
    dispatch(setToggleModalOpen('assetDetail'))
  }))
}

const handleShowInfoDrawer = () => setToggleModalOpen('infoDrawer')

// END RIGHT CLICK ACTION

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
      document.getSelection().removeAllRanges()
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
        sensorgroup: [],
        sensor: [],
        datasource: [],
        folder: [],
        asset: [],
        dashboard: [],
        [selectedType]: [en],
      }

      return newSelected
    },
  }

  return actions[eventName(event)]
}

export const handleSelectList = (event, en, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { idx: enIdx } = en
  const { show } = _mydataList
  const newSelected = selectedByEvent(event, en, _mydataList)()
  // eslint-disable-next-line no-use-before-define
  const menuList = isRightClick ? rightClickMenus(newSelected, _mydataList) : {}
  const values = {
    selected: newSelected,
    show: { ...show, menubarRight: false, infoDrawer: false },
    lastSelected: enIdx,
    menuList,
    position,
  }

  dispatch(setValues(values))
}
// END ONCLICK ON TABLE ROWS

// ** RIGHT CLICK
export const handleRightClick = (evt, en) => (dispatch, getState) => {
  evt.preventDefault()

  let { position: { left, top } } = getState()._mydataList

  const screenY = (window.outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280
  const screenX = (window.outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120
  top = Math.ceil(screenY / 16)
  left = Math.ceil(screenX / 16)

  dispatch(handleSelectList(evt, en, { left, top }, true))
}

export const handleChangeMenuRight = (menu = '', value = '') => dispatch => {
  const lmenu = menu.toLowerCase()
  let action = () => null

  if (lmenu) {
    if (lmenu === 'info') action = handleShowInfoDrawer()
    if (lmenu === 'preview') action = handleAssetDetail()
    if (lmenu === 'pipeline sensor') setConfirmationModalOpen({ type: 'addToPipeline' })
    if (lmenu === 'pipeline') action = handleCreatePipeline()
    if (lmenu === 'sensors') setConfirmationModalOpen({ type: 'addToSensorGroup' })
    if (lmenu === 'move to folder') action = handleMoveDirectory(value)
    if (lmenu === 'edit dashboard') action = handleEditDashboard()
    // if (lmenu === 'create app') this.handleCreateApp()
    if (lmenu === 'delete') action = handleActionTrash('move')
    if (lmenu === 'sync') action = setConfirmationModalOpen({ type: 'sync' })
    if (lmenu === 'asset') action = handleAssetDetail()
    if (lmenu === 'restore') action = handleActionTrash('restore')
    // if (lmenu === 'telemetry') this.handleTelemetryMapping()
  }

  return dispatch(action)
}
// END RIGHT CLICK

export const setSync = () => (dispatch, getState) => {
  const {
    _mydataList: {
      authCookie,
      selected: {
        datasource,
      },
      headers,
    },
  } = getState()
  const connectorId = datasource.length ? datasource[0].id : ''

  dispatch(putSyncDatasource(connectorId, headers, authCookie, () => {
    dispatch(setConfirmationModalClose())
    dispatch(setEntityList())
  }))
}

export const handleChangeInput = ({
  fieldName,
  key,
  value,
  replacer = '',
  valueReplacer = '',
}) => (dispatch, getState) => {
  const { fields, rules } = getState()._mydataList
  const currentData = { ...fields[fieldName], [key]: replacer === '' ? value : inputReplacer(replacer, value, valueReplacer) }
  const currentRules = { ...rules }
  currentRules[fieldName].touched = { ...currentRules[fieldName].touched, [key]: true }
  const isValid = !checkRequired(currentData, currentRules[fieldName].required)

  const values = {
    isValid: { ...getState()._mydataList.isValid, [fieldName]: isValid },
    rules: currentRules,
    fields: {
      ...fields,
      [fieldName]: currentData,
    },
  }

  dispatch(setValues(values))
}

// ** Menu Top (Add New)
export const handleChangeTopMenu = (menu = '') => (dispatch, getState) => {
  const lmenu = menu.toLowerCase()
  const { entities } = getState()._mydataList
  let headers = {}

  if (entities.length > 0) {
    const { driveId, name, parentId } = entities[0]
    headers = { driveId, name, parentId }
  } else {
    headers = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT }
  }
  window.localStorage.setItem('MYDATA.create', JSON.stringify(headers))

  if (['file', 'sql', 'device', 'media'].includes(lmenu)) {
    window.location.href = `/my-data/create?type=${lmenu}`
    // router.push(`/create?type=${lmenu}`)
  }
  if (lmenu === 'folder') {
    dispatch(setValue('fields', DEFAULT_STATE.fields))
    dispatch(setToggleModalOpen('newFolder'))
  } else if (lmenu === 'sensorgroup') {
    // this.fetchSensorList()
    dispatch(setValue('fields', { ...DEFAULT_STATE.fields }))
    dispatch(setToggleModalOpen('newSensorGroup'))
  }
}
// END Menu Top (Add New)

// ** Handle Sort
const entitiesbyLocation = _mydataList => {
  const { models, datasets, entities } = _mydataList
  const newEntities = {
    [LOCATIONS.DATASET]: datasets,
    [LOCATIONS.MODEL]: models,
    default: entities,
  }

  return newEntities[getLocation()] || newEntities.default
}

const entityTypebyLocation = () => {
  const entities = {
    [LOCATIONS.DATASET]: 'datasets',
    [LOCATIONS.MODEL]: 'models',
    default: 'entity',
  }

  return entities[getLocation()] || entities.default
}
export const handleSort = name => (dispatch, getState) => {
  const { _mydataList } = getState()
  const inActiveField = _mydataList.sort.activeField === name
  const sort = {
    activeField: name,
    isAsc: inActiveField ? !_mydataList.sort.isAsc : false,
  }

  const entities = sortColumn({
    name,
    entities: entitiesbyLocation(_mydataList),
    entityType: entityTypebyLocation(),
    sortType: (_mydataList.sort.isAsc ? 'asc' : 'desc'),
  })

  const values = { sort, entities }
  dispatch(setValues(values))
}
// END Handle Sort

// SEARCH
export const handleSearchList = () => (dispatch, getState) => {
  let inFilteredResult = true
  const { search: { list: searchListText }, location } = getState()._mydataList
  const inModel = location === LOCATIONS.MODEL
  const inPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL
  const inDataset = location === LOCATIONS.DATASET
  const inModelOrDataset = inModel || inPretrainedModel || inDataset
  let filteredAsset = []
  if (location === '' || location === LOCATIONS.SENSOR_GROUP) {
    if (searchListText === '') {
      inFilteredResult = false
      dispatch(setEntityList())
    } else {
      dispatch(setEntityList({ name: searchListText }))
    }
  } else if (inModelOrDataset) {
    const { selected: { asset } } = getState()._mydataList
    const entity = inModel ? asset.models : asset.datasets

    filteredAsset = entity.length > 0 && searchListText.trim() !== ''
      ? entity.filter(et => et.name.toLowerCase().indexOf(searchListText.trim().toLowerCase()) > -1)
      : entity
  }
  dispatch(setValues({ search: { ...DEFAULT_STATE.search, inFilteredResult }, filteredAsset, selected: { ...DEFAULT_STATE.selected } }))
}

export const handleSearchChange = value => (dispatch, getState) => {
  const { search } = getState()._mydataList
  dispatch(setValues({ search: { ...search, list: value, inSearchList: false } }))
}

export const handleSearchTypeChange = value => (dispatch, getState) => {
  let inFilteredResult = true
  const { headers, show } = getState()._mydataList

  if (value === DEFAULT_TYPE_LABEL) {
    if (headers['V-PATH'] === '') inFilteredResult = false
    dispatch(setEntityList())
  }

  const values = {
    search: {
      newSensorGroup: '',
      list: '',
      listType: value,
      inFilteredResult,
    },
    show: { ...show, entityContent: false },
  }

  dispatch(setValues(values))
}
// ** END SEARCH

// ** FolderClick
export const handleCollectionClick = ({ entity = {} }) => (dispatch, getState) => {
  if (entity.name && (entity.entityType === null || entity.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR)) {
    const { headers } = getState()._mydataList
    const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb')
    const breadcrumbExist = typeof breadcrumb !== 'undefined' && breadcrumb !== null && `${breadcrumb}`.trim() !== ''
    const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : []
    const breadcrumbIdx = jBreadcrumb.length || 0
    jBreadcrumb.push({
      label: entity.name,
      name: entity.name,
      entityId: entity.id,
      idx: breadcrumbIdx,
      path: entity.path,
    })

    const newLocation = {
      name: entity.name,
      entityId: entity.id,
      path: entity.path,
    }

    const values = {
      headers: { ...headers, 'V-PARENTID': entity.id, 'V-PATH': entity.path },
      selected: { ...DEFAULT_STATE.selected },
    }

    window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
    dispatch(setDoubleClick(values))
    dispatch(setEntityList())
  }
}
//  END Folder Double CLick

// ** Breadcrumb
export const handleBreadcrumbChange = ({ entityId, idx }) => (dispatch, getState) => {
  if (isBreadcrumbExist) {
    const jBreadcrumb = JSON.parse(breadcrumb)

    const currBreadcrumb = jBreadcrumb[idx] || {}
    const newBreadcrumb = jBreadcrumb.filter((bread, idx2) => idx2 <= idx)

    const newLocation = {
      name: currBreadcrumb.name,
      entityId,
      path: currBreadcrumb.path,
    }

    const { headers } = getState()._mydataList

    window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(newBreadcrumb))
    if (idx === 0) {
      const values = {
        ...DEFAULT_STATE,
        headers: { ...headers, 'V-PARENTID': LOCATIONS.ROOT, 'V-PATH': '' },
      }
      dispatch(setValues(values))
      dispatch(setEntityList())
    } else {
      const values = { headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }
      dispatch(setValues(values))
      dispatch(setEntityList())
    }
  }
}

export const getBreadcrumbList = () => dispatch => {
  if (typeof window !== 'undefined' && typeof window.localStorage && window.localStorage.getItem('MYDATA.breadcrumb')) {
    const Jbreadcrumb = JSON.parse(window.localStorage.getItem('MYDATA.breadcrumb'))
    const arrays = Jbreadcrumb.map((breadcrumb, idx) => ({
      title: breadcrumb.name === 'ROOT' ? 'My Data' : breadcrumb.name,
      onClick: () => dispatch(handleBreadcrumbChange({ entityId: breadcrumb.entityId, idx })),
    }))

    return arrays
  }

  return []
}

// set breadcrumb only for dataset, model and trash
const setBreadcrumb = locationName => {
  const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb') || ''
  const breadcrumbExist = breadcrumb !== null && `${breadcrumb}`.trim() !== ''
  let jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : []
  const breadcrumbIdx = jBreadcrumb.length || 0

  const exist = (jBreadcrumb.length > 1) && jBreadcrumb.findIndex(bc => bc.label === locationName) > -1

  if (!exist) {
    jBreadcrumb = [
      ...jBreadcrumb,
      {
        label: locationName,
        name: locationName,
        entityId: locationName,
        idx: breadcrumbIdx,
        path: '',
      },
    ]
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
  }
}
// End Breadcrumb

export const handleChangeLocation = locationName => (dispatch, getState) => {
  dispatch(setEmptyEntities())

  const { _mydataList } = getState()
  const inFilteredResult = true
  setBreadcrumb(locationName)
  window.localStorage.setItem('MYDATA.location', JSON.stringify({
    parentId: locationName,
    name: locationName,
    entityId: LOCATIONS.ROOT,
    path: '',
  }))
  const actions = locationName => {
    const path = {
      [LOCATIONS.TRASH]: () => {
        dispatch(setTrashList())
      },
      default: () => {},
    }

    return (path[locationName] || path.default)()
  }
  actions(locationName)

  const listType = locationName === LOCATIONS.SENSOR_GROUP ? DEFAULT_TYPE_LABEL : locationName
  const values = {
    location: locationName,
    search: { ..._mydataList.search, listType, inFilteredResult },
    show: { ..._mydataList.show, entityContent: true },
    selected: { ...DEFAULT_STATE.selected },
  }

  dispatch(setValues(values))
  dispatch(handleSort(_mydataList.sort.activeField))
}

export const setFooterText = () => (dispatch, getState) => {
  const { selected } = getState()._mydataList
  if (selected) {
    const selectedEntity = Object.values(selected)
      .filter(select => select.length)
      .map(select => {
        const types = select.reduce((carry, en) => {
          const newCarry = carry
          const key = en.labelType
          newCarry[key] = !carry[key] ? 1 : carry[key] + 1

          return newCarry
        }, {})

        return Object.entries(types).map(([key, value]) => `${value} ${`${key}${value > 1 ? 's' : ''}`}`).join(', ')
      })

    return selectedEntity.join(', ') || ''
  }

  return ''
}
