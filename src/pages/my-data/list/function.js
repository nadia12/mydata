import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import { getCookie } from 'Helpers/get-cookie'
import queryString from 'query-string'

// import sortColumn from 'Config/lib/sort-column'
import {
  FILE_TYPES,
  ASSET_STATUS,
  LOCATIONS,
} from 'Config/constants'
import {
  setValue,
  setValues,
  setEmptyEntities,
  setEntitiesPage,
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
  resetState,
} from './reducer'
import { getMenuList } from './menu-right-helper'
import {
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
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
  setRootLocation,
  setLocationBreadcrumbBy,
  isInTrash,
} from './local-helper'

export const setHeaders = () => (dispatch, getState) => {
  const { volantisConstant: { cookie: { user } } } = getState()

  const userInfo = getCookie({ cookieName: user }) || {}
  dispatch(setValue('headers', {
    'V-DRIVEID': userInfo.owner_id || '',
    'V-CREATORNAME': userInfo.name || '',
    'V-CREATORID': userInfo.id || '',
    'V-PARENTID': '',
    'V-PATH': '',
  }))
}

const setTopScroll = () => {
  if (typeof window !== 'undefined' && window !== null && window.document.getElementById('infinite-scroll')) {
    window.document.getElementById('infinite-scroll').scrollTop = 0
  }
}

const setResponseEntities = ({
  res,
  query,
  type,
  currEntities,
  pagination,
  nextPage,
  lastEntitiesLength,
}) => dispatch => {
  if (res.length) {
    const mergedEntities = type !== 'scroll' ? doRefineEntities(res) : [currEntities, doRefineEntities(res)].flat()
    const lastPage = typeof query.page !== 'undefined' ? pagination.page : nextPage // not from query
    const lastLength = query.size ? lastEntitiesLength : res.length

    dispatch(setEntitiesPage(mergedEntities, lastPage, lastLength))
  } else {
    dispatch(setValue('lastEntitiesLength', res.length))
  }
}

export const setEntityList = (query = {}, type = 'scroll') => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        headers, sort, pagination,
        entities: currEntities,
        last, lastEntitiesLength,
        search: { list: searchListText },
        isEntitiesLoading,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()
  const currLocation = getJLocation()

  const nextPage = typeof query.page === 'undefined' && !!currLocation && currLocation.name === last.location.name && (pagination.page + 1)
  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      parentId: (!!currLocation && currLocation.entityId) || '',
      pathPrefix: (!!currLocation && currLocation.path) || '',
      name: searchListText,
      orderName: sort.activeField,
      orderType: sort.isAsc ? 'ASC' : 'DESC',
      page: nextPage || 0,
      size: 20,
      ...query, // page, size
    },
  }

  const pathEntity = `${emmaDirectory}/${params.driveId}/entities`

  if (!isEntitiesLoading && ((typeof query.page !== 'undefined' || !!query.size) || (!!lastEntitiesLength) || (currLocation.name !== last.location.name))) {
    dispatch(setValue('isEntitiesLoading', true))
    dispatch(getEntityList(pathEntity, params, authCookie, res => {
      dispatch(setValue('isEntitiesLoading', false))
      dispatch(setResponseEntities(
        {
          res,
          query,
          type,
          currEntities,
          pagination,
          nextPage,
          lastEntitiesLength,
        }
      ))
    }))
  }
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
  const cDatasetSuccess = cAsset === 1 && selected.asset.some(et => !!et && et.entityType === ENTITY_TYPES.DATASET && ([ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS].includes(et.status)))
  const cAssetSuccess = cAsset ? selected.asset
    .filter(et => [ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS].includes(et.status)).length : 0

  const cSensor = selected.sensor.length
  const cFolder = selected.folder.length
  const cSensorGroup = selected.sensorgroup.length

  const hasSensorSelected = cSensor + cSensorGroup > 0
  const hasSelectedItem = cSensor + cFolder + cDataSource + cAsset + cSensorGroup + cDashboard > 0

  const selectedFolderIds = cFolder ? selected.folder.map(fd => fd.id) : []

  const folders = entities.length ? entities
    .filter(et => et.entityType === null && et.type === FILE_TYPES.COLLECTION && !selectedFolderIds.includes(et.id))
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
  const showEditPipeline = !inTrash && (cSensor + cFolder + cDataSource + cAsset + cSensorGroup === 1) && cDatasetSuccess

  const show = {
    editDashboard: showEditDashboard,
    pipeline: showAddToPipeline && !hasSensorSelected,
    pipelineSensor: showAddToPipeline && hasSensorSelected,
    createApp: showDetailAssets,
    pipelineEdit: showEditPipeline,
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

const handleCreateApp = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: { routes: { apiManagement: { root: apiManagementRoot } } },
  } = getState()

  linkTo(`${apiManagementRoot}?asset=${asset[0].id}`)
}

const handleEditPipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: { routes: { pipeline: { root: pipelineRoot } } },
  } = getState()

  linkTo(`${pipelineRoot}/${asset[0].id}`)
}

const handleCreatePipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { datasource }, selected } },
    volantisConstant: { routes: { pipeline: { root: pipelineRoot } } },
  } = getState()
  delete selected.menu

  const newSelected = {
    ...selected,
    datasource: !!datasource && (
      datasource.filter(d => [DATASOURCE_STATUS.SUCCESS, DATASOURCE_STATUS.SYNC_SUCCESS, DATASOURCE_STATUS.SYNC_FAILED].includes(d.status))
    ),
  }

  const flattenSelect = Object.values(newSelected).flatMap(select => select)

  const ids = flattenSelect.map(({ id }) => encodeURIComponent(id))
  const names = flattenSelect.map(({ name }) => encodeURIComponent(name))

  if (ids.length === 0) {
    dispatch(setConfirmationModalOpen({ type: 'addToPipelineEmpty' }))
  } else {
    const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`
    linkTo(`${pipelineRoot}?${qs}`)
  }
}

const handleMoveDirectory = menu => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers, selected } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()

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

        const pathMoveDirectory = `${libraDirectory}/${data.driveId}/${data.entityId}/into/${data.targetCollectionId}`

        dispatch(putMoveDirectory(pathMoveDirectory, authCookie, res => {
          if (res) dispatch(setEntityList())
        }))
      }
    })
  })
}

const handleEditDashboard = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { dashboard } } },
    volantisConstant: { routes: { xplorer: { root: xplorerRoot, dashboard: dashboardUrl } } },
  } = getState()
  linkTo(`${xplorerRoot}${dashboardUrl}/${dashboard.length && dashboard[0].id}`)
}

const setTrashList = () => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()
  const driveId = headers['V-DRIVEID']
  const pathTrash = `${libraDirectory}/trash/${driveId}/`
  dispatch(setValue('isEntitiesLoading', true))

  return dispatch(getTrashList(pathTrash, authCookie, res => {
    dispatch(setValue('isEntitiesLoading', false))
    dispatch(setValue('entities', doRefineEntities(res)))
  }))
}

export const handleActionTrash = (type = 'move') => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected, headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()

  dispatch(setEmptyEntities())

  const selecteds = [...Object.values(selected)]
  const driveId = headers['V-DRIVEID']

  const flattenSelect = Object.values(selecteds).flatMap(select => select)
  const ids = flattenSelect.map(s => (s.id))

  const pathTrash = `${libraDirectory}/trash/${driveId}`
  const pathRestore = `${libraDirectory}/trash/${driveId}/restore`

  const defineAction = type => {
    const action = {
      move: () => {
        dispatch(postMoveToTrash(pathTrash, ids, authCookie, () => {
          dispatch(setEntityList())
        }))
      },
      restore: () => {
        dispatch(postRestoreFromTrash(pathRestore, ids, authCookie, () => {
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
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { tazApp } },
    },
  } = getState()

  const pathSearch = `${tazApp}/search`

  dispatch(getFilteredAppByAsset({ pathSearch, assetId: asset[0].id }, authCookie, res => {
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
      if (typeof window !== 'undefined' && window !== null) window.document.getSelection().removeAllRanges()
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

const setSelectedStatus = (newSelected, entities) => {
  const newSelectedIds = Object.values(newSelected).flatMap(selected => selected).map(({ id }) => id)

  const newEntities = entities.map(entity => ({
    ...entity,
    isSelected: newSelectedIds.includes(entity.id),
  }))

  return newEntities
}

export const handleSelectList = (event, en, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList },
  } = getState()

  const { idx: enIdx } = en
  const { show, entities } = _mydataList
  const newSelected = selectedByEvent(event, en, _mydataList)()
  // eslint-disable-next-line no-use-before-define
  const menuList = isRightClick ? rightClickMenus(newSelected, _mydataList) : {}
  const newEntities = setSelectedStatus(newSelected, entities)

  const values = {
    selected: newSelected,
    show: { ...show, menubarRight: false, infoDrawer: false },
    lastSelected: enIdx,
    menuList,
    position,
    entities: newEntities,
  }

  dispatch(setValues(values))
}
// END ONCLICK ON TABLE ROWS

// ** RIGHT CLICK
export const handleRightClick = (evt, en) => (dispatch, getState) => {
  evt.preventDefault()
  let {
    volantisMyData: { _mydataList: { position: { left, top } } },
  } = getState()

  const outerHeight = (typeof window !== 'undefined' && window !== null && window.outerHeight) || 0
  const outerWidth = (typeof window !== 'undefined' && window !== null && window.outerWidth) || 0

  const screenY = (outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280
  const screenX = (outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120
  top = Math.ceil(screenY / 16)
  left = Math.ceil(screenX / 16)

  dispatch(handleSelectList(evt, en, { left, top }, true))
}

export const handleChangeMenuRight = (menu = '', value = '', linkTo = () => {}) => dispatch => {
  const lmenu = menu.toLowerCase()
  let action = () => null

  if (lmenu) {
    if (lmenu === 'info') action = handleShowInfoDrawer()
    if (lmenu === 'preview') action = handleAssetDetail()
    if (lmenu === 'pipeline sensor') setConfirmationModalOpen({ type: 'addToPipeline' })
    if (lmenu === 'pipeline') action = handleCreatePipeline(linkTo)
    if (lmenu === 'pipeline edit') action = handleEditPipeline(linkTo)
    if (lmenu === 'sensors') setConfirmationModalOpen({ type: 'addToSensorGroup' })
    if (lmenu === 'move to folder') action = handleMoveDirectory(value)
    if (lmenu === 'edit dashboard') action = handleEditDashboard(linkTo)
    if (lmenu === 'create app') action = handleCreateApp(linkTo)
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
    volantisMyData: {
      _mydataList: {
        selected: {
          datasource,
        },
        headers,
      },
    },
    volantisConstant: {
      cookie: { auth },
      service: { endpoint: { emmaConnector } },
    },
  } = getState()
  const connectorId = datasource.length ? datasource[0].id : ''
  const pathSync = `${emmaConnector}/${connectorId}/sync`

  dispatch(putSyncDatasource(pathSync, headers, auth, () => {
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
  const {
    volantisMyData: { _mydataList: { fields, rules } },
  } = getState()

  const currentData = { ...fields[fieldName], [key]: replacer === '' ? value : inputReplacer(replacer, value, valueReplacer) }
  const currentRules = { ...rules }
  currentRules[fieldName].touched = { ...currentRules[fieldName].touched, [key]: true }
  const isValid = !checkRequired(currentData, currentRules[fieldName].required)

  const values = {
    isValid: { ...getState().volantisMyData._mydataList.isValid, [fieldName]: isValid },
    rules: currentRules,
    fields: {
      ...fields,
      [fieldName]: currentData,
    },
  }

  dispatch(setValues(values))
}

// ** Menu Top (Add New)
const setHeadersAddNew = entities => {
  let headers = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT }

  if (entities.length) {
    const { driveId, name, parentId } = entities[0]
    headers = { driveId, name, parentId }
  }
  window.localStorage.setItem('MYDATA.create', JSON.stringify(headers))
}

export const handleChangeTopMenu = (menu = '', linkTo = () => {}) => (dispatch, getState) => {
  const lmenu = menu.toLowerCase()
  const {
    volantisMyData: { _mydataList: { entities } },
    volantisConstant: {
      routes: {
        myData: { root, create },
        xplorer: { root: xplorerRoot, dashboard: dashboardUrl },
      },
    },
  } = getState()

  setHeadersAddNew(entities)

  const action = {
    file: () => linkTo(`${root}${create}?type=${lmenu}`),
    sql: () => linkTo(`${root}${create}?type=${lmenu}`),
    device: () => linkTo(`${root}${create}?type=${lmenu}`),
    media: () => linkTo(`${root}${create}?type=${lmenu}`),
    folder: () => {
      dispatch(setValue('fields', DEFAULT_STATE.fields))
      dispatch(setToggleModalOpen('newFolder'))
    },
    sensorgroup: () => {
      // this.fetchSensorList()
      dispatch(setValue('fields', { ...DEFAULT_STATE.fields }))
      dispatch(setToggleModalOpen('newSensorGroup'))
    },
    dashboard: () => {
      linkTo(`${xplorerRoot}${dashboardUrl}`)
    },
    default: () => console.log('default==> ', lmenu),
  }

  return action[lmenu]() || action.default()
}
// END Menu Top (Add New)

export const handleSort = orderName => (dispatch, getState) => {
  const { sort: { activeField, isAsc }, entities } = getState().volantisMyData._mydataList
  const inActiveField = activeField === orderName

  const newSort = {
    activeField: orderName,
    isAsc: inActiveField ? !isAsc : false,
  }

  const query = {
    orderName,
    page: 0,
    size: entities.length,
    orderType: (newSort.isAsc ? 'ASC' : 'DESC'),
  }

  setTopScroll()
  dispatch(setValue('sort', newSort)) // flag for arrowIcon in table
  dispatch(setEmptyEntities())
  dispatch(setEntityList(query))
}
// END Handle Sort

// SEARCH
export const handleSearchList = () => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { search: { list: searchListText } } },
  } = getState()
  dispatch(setEmptyEntities())
  let inFilteredResult = true

  if (searchListText === '') {
    inFilteredResult = false
    dispatch(setEntityList())
  } else {
    dispatch(setEntityList({ page: 0, name: searchListText }))
  }

  const search = {
    ...DEFAULT_STATE.search,
    inFilteredResult,
    searchListText,
    list: searchListText,
  }

  setTopScroll()
  dispatch(setValues({ search, selected: { ...DEFAULT_STATE.selected } }))
}

export const handleSearchChange = value => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { search } },
  } = getState()

  dispatch(setValues({ search: { ...search, list: value, inSearchList: false } }))
}

export const handleSearchTypeChange = value => (dispatch, getState) => {
  let inFilteredResult = true
  const { headers, show } = getState().volantisMyData._mydataList
  dispatch(setEmptyEntities())

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
    const {
      volantisMyData: { _mydataList: { headers } },
    } = getState()

    const jBreadcrumb = getJBreadcrumb()
    const breadcrumbIdx = jBreadcrumb.length || 0
    jBreadcrumb.push({
      label: entity.name,
      name: entity.name,
      entityId: entity.id,
      parentId: entity.id,
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

    if (typeof window !== 'undefined' && window !== null) {
      window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
      window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
      setTopScroll()
      dispatch(setDoubleClick(values))
      dispatch(setEmptyEntities())
      dispatch(setEntityList())
    }
  }
}
//  END Folder Double CLick

export const handleChangeLocation = locationName => (dispatch, getState) => {
  setTopScroll()
  dispatch(resetState())
  dispatch(setHeaders())

  const {
    volantisMyData: { _mydataList: { search, show } },
  } = getState()

  const inFilteredResult = true
  const actions = locationName => {
    const path = {
      [LOCATIONS.TRASH]: () => {
        setLocationBreadcrumbBy(locationName)
        dispatch(setTrashList())
      },
      [LOCATIONS.ROOT]: () => {
        setRootLocation() // set breadcrumb and location to ROOT
        dispatch(setEntityList({ page: 0 }))
      },
      default: () => {},
    }

    return (path[locationName] || path.default)()
  }
  actions(locationName)

  const listType = locationName === LOCATIONS.SENSOR_GROUP ? DEFAULT_TYPE_LABEL : locationName
  const values = {
    location: locationName,
    search: { ...search, listType, inFilteredResult },
    show: { ...show, entityContent: true },
    selected: { ...DEFAULT_STATE.selected },
  }

  dispatch(setValues(values))
}

// ** Breadcrumb
export const handleBreadcrumbChange = ({ entityId, idx }) => (dispatch, getState) => {
  dispatch(setEmptyEntities())
  const jBreadcrumb = getJBreadcrumb()

  const currBreadcrumb = jBreadcrumb[idx] || {}
  const newBreadcrumb = jBreadcrumb.filter((bread, idx2) => idx2 <= idx)

  const newLocation = {
    name: currBreadcrumb.name,
    entityId,
    path: currBreadcrumb.path,
  }

  const {
    volantisMyData: { _mydataList: { headers } },
  } = getState()

  if (typeof window !== 'undefined' && window !== null) {
    window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(newBreadcrumb))
  }

  if (idx === 0) {
    const values = {
      ...DEFAULT_STATE,
      headers: { ...headers, 'V-PARENTID': LOCATIONS.ROOT, 'V-PATH': '' },
    }
    dispatch(setValues(values))
    dispatch(handleChangeLocation((!isInTrash() ? LOCATIONS.ROOT : LOCATIONS.TRASH)))
  } else {
    const values = { headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }
    dispatch(setValues(values))
    dispatch(setEntityList({ page: 0 }))
  }
}

export const getBreadcrumbList = () => dispatch => {
  const Jbreadcrumb = getJBreadcrumb()
  const arrays = Jbreadcrumb.map((breadcrumb, idx) => ({
    title: breadcrumb.name === 'ROOT' ? 'My Data' : breadcrumb.name,
    onClick: () => dispatch(handleBreadcrumbChange({ entityId: breadcrumb.entityId, idx })),
  }))

  return arrays
}

export const setFooterText = () => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected } },
  } = getState()

  if (selected) {
    const selectedEntity = Object.values(selected)
      .filter(select => select.length)
      .map(select => {
        const types = select.reduce((carry, en) => {
          const newCarry = carry
          const key = en.uiEntityType
          newCarry[key] = !carry[key] ? 1 : carry[key] + 1

          return newCarry
        }, {})

        return Object.entries(types).map(([key, value]) => `${value} ${`${key}${value > 1 ? 's' : ''}`}`).join(', ')
      })

    return selectedEntity.join(', ') || ''
  }

  return ''
}
