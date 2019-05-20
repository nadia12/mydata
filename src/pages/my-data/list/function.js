import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import { getCookie } from 'Helpers/get-cookie'
import queryString from 'query-string'

import {
  FILE_TYPES,
  ASSET_STATUS,
  LOCATIONS,
  UI_ENTITY_TYPES,
} from 'Config/constants'
import {
  getCurrentWindow,
  checkPath,
  extendedData,
} from 'Config/lib/url-helper'
import {
  isInSensorGroup,
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
  setRootLocation,
  setTrashLocation,
  isWindowExist,
} from 'Config/lib/local-helper'
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
  setToggleModalClose,
} from './reducer'
import { getMenuList } from './menu-right-helper'
import {
  DATASOURCE_STATUS,
  DEFAULT_TYPE_LABEL,
} from './constant'

import { DEFAULT_STATE } from './initial-states'

import {
  doRefineEntities,
} from './helper'

export const setHeaders = () => (dispatch, getState) => {
  const { volantisConstant: { cookie: { user } } } = getState()
  const location = getJLocation()

  const userInfo = getCookie({ cookieName: user }) || {}
  dispatch(setValue('headers', {
    'V-DRIVEID': userInfo.owner_id || '',
    'V-CREATORNAME': userInfo.name || '',
    'V-CREATORID': userInfo.id || '',
    'V-PARENTID': location.entityId ? location.entityId : LOCATIONS.ROOT,
    'V-PATH': '',
  }))
}

const setTopScroll = () => {
  if (isWindowExist() && window.document.getElementById('infinite-scroll')) {
    window.document.getElementById('infinite-scroll').scrollTop = 0
  }
}

const setResponseEntities = ({
  res,
  query,
  currEntities,
  pagination,
  nextPage,
  lastEntitiesLength,
  currHref,
  prev,
}) => dispatch => {
  if (!!res && res.length) {
    const mergedEntities = (prev.href !== currHref || query.page === 0) ? doRefineEntities(res) : [currEntities, doRefineEntities(res)].flat()
    const prevPage = typeof query.page !== 'undefined' ? pagination.page : nextPage // not from query
    const prevLength = query.size ? lastEntitiesLength : res.length

    dispatch(setEntitiesPage(mergedEntities, prevPage, prevLength))
  } else {
    dispatch(setValue('lastEntitiesLength', 0))
  }
}

export const setEntityList = (query = {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        headers, sort, pagination,
        entities: currEntities,
        prev, lastEntitiesLength,
        search: { list: searchListText },
        isEntitiesLoading,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()
  const currHref = getCurrentWindow('href')
  const nextPage = typeof query.page === 'undefined' && !!currHref && currHref === prev.href && (pagination.page + 1)
  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      parentId: headers['V-PARENTID'],
      name: currHref === prev.href ? searchListText : '',
      orderName: sort.orderName,
      orderType: sort.orderType,
      page: nextPage || 0,
      size: 20,
      ...query,
    },
  }

  const pathEntity = `${emmaDirectory}/${params.driveId}/entities`

  if (!isEntitiesLoading && ((typeof query.page !== 'undefined' || !!query.size) || (!!lastEntitiesLength) || (!!currHref && currHref !== prev.href))) {
    dispatch(setValue('isEntitiesLoading', true))
    dispatch(getEntityList(pathEntity, params, authCookie, res => {
      dispatch(setValue('isEntitiesLoading', false))
      dispatch(setResponseEntities(
        {
          res,
          query,
          currEntities,
          pagination,
          nextPage,
          lastEntitiesLength,
          prev,
          currHref,
        }
      ))
    }))
  }
}

export const setTrashList = (query = {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        headers, entities: currEntities, prev, lastEntitiesLength, pagination,
        search: { list: searchListText }, sort,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()

  const currHref = getCurrentWindow('href')

  const nextPage = typeof query.page === 'undefined' && !!currHref && currHref === prev.href && (pagination.page + 1)
  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      name: currHref === prev.href ? searchListText : '',
      orderName: sort.activeField,
      orderType: sort.isAsc ? 'ASC' : 'DESC',
      page: nextPage || 0,
      size: 20,
      ...query,
    },
  }

  const pathTrash = `${libraDirectory}/trash/${params.driveId}/`

  dispatch(setValue('isEntitiesLoading', true))

  return dispatch(getTrashList(pathTrash, params, authCookie, res => {
    dispatch(setValue('isEntitiesLoading', false))
    dispatch(setResponseEntities(
      {
        res,
        query,
        currEntities,
        pagination,
        nextPage,
        lastEntitiesLength,
        prev,
        currHref,
      }
    ))
    dispatch(setValue('entities', doRefineEntities(res)))
  }))
}

export const setEntitiesByHref = (query = {}) => (dispatch, getState) => {
  const { _mydataList: { sort: { orderName, orderType } } } = getState().volantisMyData

  const decodedExtendedData = extendedData('decode')
  const locationType = checkPath(LOCATIONS.TRASH) ? LOCATIONS.TRASH : decodedExtendedData.locationType

  // query for entity list request
  const params = {
    page: 0,
    name: decodedExtendedData.searchName || '',
    orderName: decodedExtendedData.orderName || orderName,
    orderType: decodedExtendedData.orderType || orderType,
    ...query,
  }

  const defineAction = {
    [LOCATIONS.FOLDER]: () => {
      const parentId = decodedExtendedData.entityId

      window.localStorage.setItem('MYDATA.location', JSON.stringify({
        name: queryString.name,
        entityId: parentId,
        path: '',
      }))

      window.localStorage.setItem('MYDATA.breadcrumb', decodedExtendedData.breadcrumb)
      dispatch(setEntityList({ parentId, ...params }))
    },
    [LOCATIONS.ROOT]: () => {
      setRootLocation()
      dispatch(setEntityList({ parentId: 'ROOT', ...params }))
    },
    [LOCATIONS.TRASH]: () => {
      setTrashLocation()
      dispatch(setTrashList({ ...params }))
    },
    default: () => {},
  }

  return defineAction[locationType]() || defineAction.default()
}

// *** RIGHT CLICK ACTION
const isSelectedAllError = selected => {
  const arraySelected = [...Object.values(selected)]

  return !arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1
}

const rightClickMenus = (selected, entities) => {
  const inTrash = checkPath(LOCATIONS.TRASH)

  const cDataSource = selected.datasource.length
  const cAsset = selected.asset.length
  const cDashboard = selected.dashboard.length
  const cConnector = selected.connector.length
  const cSensor = selected.sensor.length
  const cFolder = selected.folder.length
  const cSensorGroup = selected.sensorgroup.length

  const hasSensorSelected = cSensor + cSensorGroup > 0
  const hasSelectedItem = cSensor + cFolder + cDataSource + cAsset + cSensorGroup + cDashboard + cConnector > 0

  const cAssetSuccess = cAsset ? selected.asset
    .filter(et => [ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS].includes(et.status)).length : 0

  const cDatasetSuccess = cAsset === 1 && selected.asset.some(et => !!et && et.uiEntityType === UI_ENTITY_TYPES.DATASET
                          && ([ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS].includes(et.status)))

  const selectedFolderIds = cFolder ? selected.folder.map(fd => fd.id) : []

  const folders = entities.length ? entities
    .filter(et => et.uiEntityType === UI_ENTITY_TYPES.FOLDER && et.type === FILE_TYPES.COLLECTION && !selectedFolderIds.includes(et.id))
    .map(et => ({ label: et.name, value: et.id })) : []

  const sensorgroups = entities.length ? entities
    .filter(et => et.uiEntityType === UI_ENTITY_TYPES.SENSOR_GROUP && et.type === FILE_TYPES.ITEM)
    .map(et => ({ label: et.name, value: et.id })) : []

  // *** Show Menus Condition ***
  const showInfo = (cSensor === 1 || cSensorGroup === 1 || cDataSource === 1 || cDashboard === 1 || cAsset === 1 || cConnector === 1)
                    && (cSensor + cSensorGroup + cDataSource + cDashboard + cAsset + cConnector === 1)

  const showTrash = !inTrash && (cDashboard || cDataSource || cConnector) && cSensor === 0
                    && cFolder === 0 && cAsset === 0 && cSensorGroup === 0
                    && isSelectedAllError(selected.datasource)

  // Sync just for Connector Type
  const showSync = !inTrash && cSensor === 0 && cSensorGroup === 0 && cDataSource === 0 && cDashboard === 0
                  && cAsset === 0 && cFolder === 0 && cConnector === 1 && false // reminder: remove false if sync request has no error from BE.

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
          if (res) {
            dispatch(setToggleModalClose('entityContent'))
            dispatch(setEntitiesByHref())
          }
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

export const handleClickTrashBin = linkTo => (dispatch, getState) => {
  const {
    volantisConstant: { routes: { myData: { root: myDataRoot, trash: trashPath } } },
  } = getState()

  const newPath = checkPath(LOCATIONS.TRASH) ? `${myDataRoot}` : `${myDataRoot}${trashPath}`
  linkTo(`${newPath}`)
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
          dispatch(setEntitiesByHref())
        }))
      },
      restore: () => {
        dispatch(postRestoreFromTrash(pathRestore, ids, authCookie, () => {
          dispatch(setTrashList({ orderName: 'updatedAt', page: 0 }))
        }))
      },
      default: () => {
        // eslint-disable-next-line no-console
        console.info('default defineAction')
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
        sensorgroup: [],
        sensor: [],
        datasource: [],
        folder: [],
        asset: [],
        dashboard: [],
        connector: [],
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

  const menuList = (isRightClick && rightClickMenus(newSelected, entities)) || {}
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
export const handleRightClick = (evt, en) => (dispatch, getState) => {
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
          connector,
        },
        headers,
      },
    },
    volantisConstant: {
      cookie: { auth },
      service: { endpoint: { emmaConnector } },
    },
  } = getState()

  const connectorId = connector.length ? connector[0].id : ''
  const pathSync = `${emmaConnector}/${connectorId}/sync`

  const newHeaders = {
    ...headers,
    'V-NAME': connector.length ? connector[0].name : '',
    'V-PATH': connector.length ? connector[0].path : '',
  }

  dispatch(putSyncDatasource(pathSync, newHeaders, auth, () => {
    dispatch(setConfirmationModalClose())
    dispatch(setToggleModalClose('entityContent'))
    dispatch(setEntitiesByHref())
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
    filelocal: () => linkTo(`${root}${create}?type=${lmenu}`),
    fileurl: () => linkTo(`${root}${create}?type=${lmenu}`),
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
    // eslint-disable-next-line no-console
    default: () => console.info('default==> ', lmenu),
  }

  return action[lmenu]() || action.default()
}
// END Menu Top (Add New)

export const handleSort = (newOrderName, linkTo = () => {}) => (dispatch, getState) => {
  const { prev: { path, q: decodedData } } = getState().volantisMyData._mydataList

  const newSort = {
    orderName: newOrderName,
    orderType: (!!decodedData.orderType && decodedData.orderType === 'ASC' ? 'DESC' : 'ASC'),
  }

  const extendedDataValues = {
    ...decodedData,
    ...newSort,
  }

  dispatch(setValue('sort', newSort)) // flag for arrowIcon in table
  linkTo(`${path}?q=${extendedData('encode', extendedDataValues)}`)
}
// END Handle Sort

// SEARCH
export const handleSearchList = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        search: { list: searchListText },
        prev: { q: decodedData },
      },
    },
    volantisConstant: { routes: { myData: { root: myDataRoot } } },
  } = getState()

  dispatch(setEmptyEntities())

  const extendedDataValues = {
    ...decodedData,
    searchName: searchListText,
  }

  const search = {
    ...DEFAULT_STATE.search,
    list: searchListText,
  }
  dispatch(setValues({ search, selected: { ...DEFAULT_STATE.selected } }))
  linkTo(`${myDataRoot}?q=${extendedData('encode', extendedDataValues)}`)
}

export const handleSearchChange = value => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { search } },
  } = getState()

  dispatch(setValues({ search: { ...search, list: value, inSearchList: false } }))
}

export const handleSearchTypeChange = value => (dispatch, getState) => {
  const { show } = getState().volantisMyData._mydataList
  dispatch(setEmptyEntities())

  if (value === DEFAULT_TYPE_LABEL) {
    dispatch(setEntitiesByHref())
  }

  const values = {
    search: {
      newSensorGroup: '',
      list: '',
      listType: value,
    },
    show: { ...show, entityContent: false },
  }

  dispatch(setValues(values))
}
// ** END SEARCH

// ** FolderClick
export const handleCollectionClick = ({ entity = {}, linkTo }) => (dispatch, getState) => {
  if (!!entity.name && (entity.uiEntityType === UI_ENTITY_TYPES.FOLDER || entity.uiEntityType === UI_ENTITY_TYPES.SQL_DATABASE)) {
    const {
      volantisMyData: { _mydataList: { headers } },
      volantisConstant: { routes: { myData: { root: myDataRoot } } },
    } = getState()

    const currJBreadcrumb = getJBreadcrumb()
    const breadcrumbIdx = currJBreadcrumb.length || 0

    const newJBreadcrumb = [
      ...currJBreadcrumb,
      {
        label: entity.name,
        name: entity.name,
        entityId: entity.id,
        parentId: entity.id,
        idx: breadcrumbIdx,
        path: entity.path,
      },
    ]

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
      setTopScroll()
      dispatch(setDoubleClick(values))
    }
  }
}
//  END Folder Double CLick

// ** Breadcrumb
export const handleBreadcrumbChange = ({ entityId, idx }, linkTo = () => {}) => (dispatch, getState) => {
  const jBreadcrumb = getJBreadcrumb()

  const currBreadcrumb = jBreadcrumb[idx] || {}
  const newBreadcrumb = jBreadcrumb.filter((bread, idx2) => idx2 <= idx)

  const {
    volantisMyData: { _mydataList: { headers, prev } },
    volantisConstant: { routes: { myData: { root: myDataRoot, trash: trashPath } } },
  } = getState()

  const extendedDataValues = {
    name: currBreadcrumb.name,
    breadcrumb: JSON.stringify(newBreadcrumb),
    entityId,
    locationType: LOCATIONS.FOLDER,
  }

  // Root or Trash click
  if (idx === 0) {
    const values = {
      ...DEFAULT_STATE,
      headers: { ...headers, 'V-PARENTID': LOCATIONS.ROOT, 'V-PATH': '' },
    }

    dispatch(setValues(values))
    dispatch(setValue('prev', { ...prev, q: { locationType: LOCATIONS.TRASH } }))
    const newPath = checkPath(LOCATIONS.TRASH) ? `${myDataRoot}${trashPath}` : `${myDataRoot}`
    linkTo(`${newPath}`)
  } else {
    const values = { headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }
    dispatch(setValues(values))
    linkTo(`${myDataRoot}?q=${extendedData('encode', extendedDataValues)}`)
  }
}

export const getBreadcrumbList = (linkTo = () => {}) => dispatch => {
  const Jbreadcrumb = getJBreadcrumb()
  const arrays = Jbreadcrumb.map((breadcrumb, idx) => ({
    title: breadcrumb.name === 'ROOT' ? 'My Data' : breadcrumb.name,
    onClick: () => dispatch(handleBreadcrumbChange({ entityId: breadcrumb.entityId, idx }, linkTo)),
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

export const handleResetSelectList = () => dispatch => {
  dispatch(setValue('selected', DEFAULT_STATE.selected))
}
