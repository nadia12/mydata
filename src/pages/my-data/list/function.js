import inputReplacer from 'Config/lib/input-replacer'
import checkRequired from 'Config/lib/input-check-required'
import queryString from 'query-string'

import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'
import sortColumn from 'Config/lib/sort-column'
import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  GET_FILTER_ENTITY_REQUEST,
  GET_FILTER_ENTITY_SUCCESS,
  GET_FILTER_ENTITY_ERROR,

  POST_CONNECTOR_REQUEST,
  POST_CONNECTOR_SUCCESS,
  POST_CONNECTOR_ERROR,

  GET_FUNCTION_DOC_REQUEST,
  GET_FUNCTION_DOC_SUCCESS,
  GET_FUNCTION_DOC_ERROR,

  GET_ACCURACY_REQUEST,
  GET_ACCURACY_SUCCESS,
  GET_ACCURACY_ERROR,

  PUT_MOVE_DIRECTORY_REQUEST,
  PUT_MOVE_DIRECTORY_SUCCESS,
  PUT_MOVE_DIRECTORY_ERROR,

  POST_MOVE_TRASH_REQUEST,
  POST_MOVE_TRASH_SUCCESS,
  POST_MOVE_TRASH_ERROR,

  POST_RESTORE_TRASH_REQUEST,
  POST_RESTORE_TRASH_SUCCESS,
  POST_RESTORE_TRASH_ERROR,

  GET_TRASH_LIST_REQUEST,
  GET_TRASH_LIST_SUCCESS,
  GET_TRASH_LIST_ERROR,

  SET_AUTH_COOKIE,
} from './action-type'
import {
  setValue,
  setValues,
  setToggleModal,
  setToggleModalOpen,
  setPreviewAsset,
  setDoubleClick,
} from './reducer'
import { getMenuList } from './menu-right-helper'
import {
  LOCATIONS,
  FILE_TYPES,
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

  breadcrumb,
  isBreadcrumbExist,

  location,
} from './local-helper'

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export const setHeaders = () => dispatch => (
  dispatch(setValue('headers', {
    'V-DRIVEID': '' || 'bc0d3416-2441-466d-acf1-69b7b082a3bf',
    'V-CREATORNAME': '',
    'V-CREATORID': '',
    'V-PARENTID': '',
    'V-PATH': '',
  }))
)

// REQUEST ENTITIES ON ROOT and postConnectorData

export const getEntityList = (params, cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      GET_ENTITY_REQUEST,
      GET_ENTITY_SUCCESS,
      GET_ENTITY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${params.driveId}/${params.entityId}/contents`,
      method: Method.get,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

export const postConnectorData = (connectorIds = [], cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      POST_CONNECTOR_REQUEST,
      POST_CONNECTOR_SUCCESS,
      POST_CONNECTOR_ERROR,
    ],
    shuttle: {
      path: '/v1/connector',
      method: Method.post,
      endpoint: Hostname.root,
      payloads: connectorIds,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

export const setEntityList = () => (dispatch, getState) => {
  const { _mydataList } = getState()
  const currLocation = window.localStorage.getItem('MYDATA.location')

  const params = {
    driveId: _mydataList.headers['V-DRIVEID'],
    entityId: JSON.parse(currLocation).entityId,
  }

  //     const { entities, sort } = props._mydataList
  // const connectorIds = entities.map((et) => (et.id))
  // props.handleSort(sort.activeField)
  // props.postConnectorData(connectorIds)

  dispatch(getEntityList(params, res => {
    const connectorIds = res.map(entity => (entity.id))
    dispatch(setValue('entities', doRefineEntities(res)))
    dispatch(postConnectorData(connectorIds, res2 => {
      dispatch(setToggleModalOpen('entityContent'))
      if (res2) dispatch(setValue('connectorsData', res2))
    }))
  }))
}
// END REQUEST ENTITIES ON ROOT

// SEARCH
export const handleSearchTypeChange = value => (dispatch, getState) => {
  let inFilteredResult = true
  const { headers, show } = getState()._mydataList

  if (value === DEFAULT_TYPE_LABEL) {
    if (headers['V-PATH'] === '') inFilteredResult = false
    dispatch(setEntityList())
  } else {
    this.props.searchEntityTypePath({
      driveId: headers['V-DRIVEID'],
      entityType: value,
      parentPath: headers['V-PATH'],
    })
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
// END SEARCH

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

// ****** Action on Entity TableRows My Data ***** //
// ==== ONECLICK, RIGHTCLICK, DOUBLECLICK

const isSelectedAllError = selected => {
  const arraySelected = [...Object.values(selected)]
  const findSuccess = arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1

  return !findSuccess
}

const rightClickMenus = (selected, _mydataList) => {
  const { entities } = _mydataList

  const currLocation = window.localStorage.getItem('MYDATA.location')
  const isInTrash = JSON.parse(currLocation).name === LOCATIONS.TRASH
  // const isInModel = JSON.parse(currLocation).name === LOCATIONS.MODEL
  // const isInPretrainedModel = JSON.parse(currLocation).name === LOCATIONS.PRETRAINED_MODEL
  const isInDataset = JSON.parse(currLocation).name === LOCATIONS.DATASET

  // const permissionAsset = (isInModel && actionPermission.viewModel)
  //                         || (isInDataset && actionPermission.viewDataset)
  //                         || (isInPretrainedModel && actionPermission.viewPretrainedModel)

  // const permissionRemove = actionPermission.removeDatabase && actionPermission.removeFolder && actionPermission.removeIot
  // const permissionRestore = permissionRemove
  // const permissionAddToPipeline = actionPermission.addToPipeline

  const cDataSource = selected.datasource.length
  const cAsset = selected.asset.length
  const cAssetSuccess = cAsset > 0 ? selected.asset.filter(et => et.status === ASSET_STATUS.SUCCESS || et.status === ASSET_STATUS.DONE).length : 0
  const cSensor = selected.sensor.length
  const cFolder = selected.folder.length
  const cSensorGroup = selected.sensorgroup.length

  const hasSelectedItem = cSensor + cFolder + cDataSource + cAsset + cSensorGroup > 0

  const hasSensorSelected = cSensor + cSensorGroup >= 1
  const showAddToPipeline = hasSelectedItem
  const showAddToFolder = hasSelectedItem
  const folders = entities.length === 0 ? [] : entities.filter(et => et.entityType === null && et.type === FILE_TYPES.COLLECTION).map(et => ({ label: et.name, value: et.id }))
  const showInfo = (cSensor === 1 || cSensorGroup === 1 || cDataSource === 1) && (cSensor + cSensorGroup + cDataSource === 1)
  const showTrash = cDataSource >= 1 && cSensor === 0 && cFolder === 0 && cAsset === 0 && cSensorGroup === 0 && isSelectedAllError(selected.datasource)
  const showSync = cSensor === 0 && cSensorGroup === 0 && cDataSource === 1 && !selected.datasource[0].entityType.startsWith('FILE_')
  const sensorgroup = entities.length === 0 ? [] : entities.filter(et => et.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR && et.type === FILE_TYPES.ITEM).map(et => ({ label: et.name, value: et.id }))
  const showAddToSensorGroup = !isInSensorGroup && (cSensor > 0 && cSensorGroup === 0 && cDataSource === 0 && selected.sensor.every(sensor => sensor.type === selected.sensor[0].type))
  const showDetailAssets = (cAsset === 1 && cAssetSuccess === 1)

  // const show = {
  //   pipeline: permissionAddToPipeline && showAddToPipeline && !hasSensorSelected,
  //   pipelineSensor: permissionAddToPipeline && showAddToPipeline && hasSensorSelected,
  //   createApp: isInDataset && showDetailAssets && actionPermission && actionPermission.createApp,
  //   info: showInfo,
  //   sync: showSync,
  //   folders: showAddToFolder && folders && folders.length > 0,
  //   delete: permissionRemove && showTrash,
  //   sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
  //   detailAsset: permissionAsset && showDetailAssets,
  //   asset: permissionAsset && showDetailAssets,
  //   restore: isInTrash && permissionRestore && hasSelectedItem
  // }

  const show = {
    pipeline: showAddToPipeline && !hasSensorSelected,
    pipelineSensor: showAddToPipeline && hasSensorSelected,
    createApp: isInDataset && showDetailAssets && actionPermission && actionPermission.createApp,
    info: showInfo,
    sync: showSync,
    folders: showAddToFolder && folders && folders.length > 0,
    delete: showTrash,
    sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
    detailAsset: showDetailAssets,
    asset: showDetailAssets,
    restore: isInTrash && hasSelectedItem,
  }

  const submenu = {
    folders: folders || [],
    sensorgroup: sensorgroup || [],
  }

  const menuList = getMenuList(show, submenu)

  return menuList
}

const eventName = () => {
  let name = 'default'
  if (event.metaKey || event.ctrlKey) name = 'ctrl'
  if (event.shiftKey) name = 'shift'

  return name
}

const selectedByEvent = (event, en, _mydataList) => {
  const { ntype, id, idx: enIdx } = en
  const { lastSelected, selected, entities } = _mydataList
  let newSelected = { ...selected }

  const actions = {
    ctrl: () => {
      const detail = selected[ntype].find(det => det.id === id)
      let newSelectedType = selected[ntype]
      const exist = detail && newSelectedType.findIndex(select => select.id === detail.id) > -1

      if (exist) newSelectedType = newSelectedType.filter(select => select.id !== detail.id)
      else newSelectedType.push({ ...en })

      newSelected[ntype] = newSelectedType

      return newSelected
    },

    shift: () => {
      document.getSelection().removeAllRanges()
      const selectedEntities = lastSelected < enIdx ? entities.slice(lastSelected, enIdx + 1) : entities.slice(enIdx, lastSelected + 1)
      selectedEntities.forEach(selectedEn => {
        const selectedType = newSelected[selectedEn.ntype]
        const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1
        if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn })
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
        [ntype]: [en],
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

export const handleRightClick = (evt, en) => (dispatch, getState) => {
  evt.preventDefault()

  const { _mydataList } = getState()
  let { position: { left, top } } = _mydataList

  const screenY = (window.outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280
  const screenX = (window.outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120
  top = Math.ceil(screenY / 16)
  left = Math.ceil(screenX / 16)

  dispatch(handleSelectList(evt, en, { left, top }, true))
}

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

  if (['file', 'sql', 'device', 'media'].includes(lmenu)) router.push(`/create?type=${lmenu}`)
  if (lmenu === 'folder') {
    dispatch(setValue('fields', DEFAULT_STATE.fields))
    dispatch(setToggleModalOpen('newFolder'))
  } else if (lmenu === 'sensorgroup') {
    // this.fetchSensorList()
    dispatch(setValue('fields', { ...DEFAULT_STATE.fields }))
    dispatch(setToggleModalOpen('newSensorGroup'))
  }
}

const handleCreatePipeline = () => (dispatch, getState) => {
  const { selected: { datasource }, selected } = getState()._mydataList

  delete selected.menu

  const newSelected = { ...selected }

  if (datasource && datasource.length > 0) {
    const filteredDatasource = datasource.filter(d => d.status === DATASOURCE_STATUS.SUCCESS || d.status === DATASOURCE_STATUS.SYNC_SUCCESS || d.status === DATASOURCE_STATUS.SYNC_FAILED)
    newSelected.datasource = filteredDatasource
  }

  const flattenSelect = Object.values(newSelected).flatMap(select => select)
  const ids = flattenSelect.map(({ id }) => encodeURIComponent(id))
  const names = flattenSelect.map(({ name }) => encodeURIComponent(name))

  if (ids.length === 0) {
    // this.handleConfirmationModal({ type: 'addToPipelineEmpty' })
  } else {
    const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`
    if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
      // window.location.href = `${RoutePath.pipeline}?${qs}`
      window.location.href = `/pipeline?${qs}` //routr pipeline perlu di define
    }
  }
}

// ======= MOVE DIRECTORY
const putMoveDirectory = ({ driveId, entityId, targetCollectionId }, cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      PUT_MOVE_DIRECTORY_REQUEST,
      PUT_MOVE_DIRECTORY_SUCCESS,
      PUT_MOVE_DIRECTORY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${driveId}/${entityId}/into/${targetCollectionId}`,
      method: Method.put,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

const handleMoveDirectory = menu => (dispatch, getState) => {
  const { _mydataList } = getState()

  const selecteds = [...Object.values(_mydataList.selected)]
  selecteds.forEach(select => {
    select.forEach(s => {
      if (!!s && s.id) {
        const data = {
          driveId: _mydataList.headers['V-DRIVEID'],
          entityId: s.id,
          name: s.name,
          targetCollectionId: menu,
        }
        dispatch(putMoveDirectory(data, res => {
          if (res) dispatch(setEntityList())
        }))
      }
    })
  })
}

// type = move || restore
const postMoveToTrash = ({ driveId, ids }, cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      POST_MOVE_TRASH_REQUEST,
      POST_MOVE_TRASH_SUCCESS,
      POST_MOVE_TRASH_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: ids,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

const postRestoreFromTrash = ({ driveId, ids }, cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      POST_RESTORE_TRASH_REQUEST,
      POST_RESTORE_TRASH_SUCCESS,
      POST_RESTORE_TRASH_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}/restore`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: ids,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

const getTrashList = cb => (dispatch, getState) => {
  const { authCookie, headers } = getState()._mydataList
  const driveId = headers['V-DRIVEID']

  return dispatch({
    type: [
      GET_TRASH_LIST_REQUEST,
      GET_TRASH_LIST_SUCCESS,
      GET_TRASH_LIST_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}/`,
      method: Method.get,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

const setTrashList = () => dispatch => {
  dispatch(getTrashList(res => dispatch(setValue('entities', doRefineEntities(res)))))
}

const handleActionTrash = (type = 'move') => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { selected } = _mydataList

  const selecteds = [...Object.values(selected)]
  const driveId = _mydataList.headers['V-DRIVEID']

  const flattenSelect = Object.values(selecteds).flatMap(select => select)
  const ids = flattenSelect.map(s => (s.id))

  if (type === 'move') {
    dispatch(postMoveToTrash({ driveId, ids }, () => {
      dispatch(setEntityList())
    }))
  } else {
    dispatch(postRestoreFromTrash({ driveId, ids }, () => {
      dispatch(setTrashList())
    }))
  }
}

const getFunctionDoc = cb => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  const { _mydataList } = getState()

  const { selected: { asset } } = _mydataList

  return dispatch({
    type: [
      GET_FUNCTION_DOC_REQUEST,
      GET_FUNCTION_DOC_SUCCESS,
      GET_FUNCTION_DOC_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/function-doc/${asset[0].id}?component_type=${`${asset.type}`.toUpperCase()}&access_token=${authCookie}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res && typeof res.error === 'undefined' ? res : []
      cb(data, asset, err)
    },
  })
}

const getAccuracy = (assetId, cb) => (dispatch, getState) => {
  // sample authCookie, akan dihapus
  const { authCookie } = getState()._mydataList

  return dispatch({
    type: [
      GET_ACCURACY_REQUEST,
      GET_ACCURACY_SUCCESS,
      GET_ACCURACY_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/ml-models/accuracy/${assetId}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res ? res : 0
      cb(data, err)
    },
  })
}

const handleFunctionDoc = () => {
  getFunctionDoc(componentType, (res, asset) => {
    const accuracy = 0
    if (asset[0].type === 'Model') {
      getAccuracy(asset[0], resAccuracy => setPreviewAsset(resAccuracy, 'assetDetail'))
    }

    return setPreviewAsset(accuracy, 'assetDetail')
  })
}

const handleShowInfoDrawer = () => setToggleModal('infoDrawer')

// ====== ConfirmationModal
// const handleConfirmationModal = props => {
//   console.log('harus ada yang di set lagi')
//
//   return setToggleModal('confirmationModal')
// }

// ====== Syncro
const putSyncDatasource = (cb = () => {}) => (dispatch, getState) => {
  // sample authCookie, akan dihapus
  const { authCookie } = getState()._mydataList
  const connectorId = getState()._mydataList.selected.datasource[0].id

  return dispatch({
    type: [
      PUT_SYNC_DATASOURCE_REQUEST,
      PUT_SYNC_DATASOURCE_SUCCESS,
      PUT_SYNC_DATASOURCE_ERROR,
    ],
    shuttle: {
      path: `/v1/connector/${connectorId}/sync`,
      method: Method.put,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => {
      cb(res, err)
    },
  })
}

const handleSync = () => {
  putSyncDatasource(res => {
    if (res) {
      setToggleModal('sync')
      setEntityList()
    }
  })
}
// ======

// END ACTIONS ON MENURIGHT CLICK
// ****** END Action on Entity TableRows My Data ***** //

const entitiesbyLocation = _mydataList => {
  const { models, datasets, entities } = _mydataList
  const newEntities = {
    [LOCATIONS.DATASET]: datasets,
    [LOCATIONS.MODEL]: models,
    default: entities,
  }

  return newEntities[location] || newEntities.default
}

const entityTypebyLocation = () => {
  const entities = {
    [LOCATIONS.DATASET]: 'datasets',
    [LOCATIONS.MODEL]: 'models',
    default: 'entity',
  }

  return entities[location] || entities.default
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

// === REQUEST ENTITIES ON ROOT and postConnectorData
export const searchEntityNamePath = ({ driveId, entityName, parentPath }, cb) => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  const path = parentPath !== '' ? `&path=${parentPath}` : ''

  return dispatch({
    type: [
      GET_FILTER_ENTITY_REQUEST,
      GET_FILTER_ENTITY_SUCCESS,
      GET_FILTER_ENTITY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${driveId}/search/name?name=${entityName}${path}`,
      method: Method.get,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  })
}

export const handleSearchList = () => (dispatch, getState) => {
  let inFilteredResult = true
  const { headers, search: { list: searchListText }, location } = getState()._mydataList
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
      dispatch(searchEntityNamePath({
        driveId: headers['V-DRIVEID'],
        entityName: searchListText,
        parentPath: headers['V-PATH'],
      }, res => {
        dispatch(setValue('entities', doRefineEntities(res)))
      }))
    }
  } else if (inModelOrDataset) {
    const { selected: { asset } } = getState()._mydataList
    const entity = inModel ? asset.models : asset.datasets

    filteredAsset = entity.length > 0 && searchListText.trim() !== ''
      ? entity.filter(et => et.name.toLowerCase().indexOf(searchListText.trim().toLowerCase()) > -1)
      : entity
  }
  dispatch(setValues({ search: { ...search, inFilteredResult }, filteredAsset, selected: { ...DEFAULT_STATE.selected } }))
}

export const handleSearchChange = value => (dispatch, getState) => {
  const { search } = getState()._mydataList
  dispatch(setValues({ search: { ...search, list: value, inSearchList: false } }))
}
// set breadcrumb only for dataset, model and trash
const setBreadcrumb = location => {
  const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb') || ''
  const breadcrumbExist = breadcrumb !== null && `${breadcrumb}`.trim() !== ''
  const jBreadcrumb = breadcrumbExist ? JSON.parse(breadcrumb) : []
  const breadcrumbIdx = jBreadcrumb.length || 0

  const exist = (jBreadcrumb.length > 1) && jBreadcrumb.findIndex(bc => bc.label === location) > -1

  if (!exist) {
    jBreadcrumb.push({
      label: location,
      name: location,
      entityId: location,
      idx: breadcrumbIdx,
      path: '',
    })
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
  }
}

export const handleChangeLocation = locationName => (dispatch, getState) => {
  const filteredAsset = []
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
    }

    return path[locationName]
  }
  actions(locationName)

  const listType = locationName === LOCATIONS.SENSOR_GROUP ? DEFAULT_TYPE_LABEL : location
  const values = {
    filteredAsset,
    location: locationName,
    search: { ..._mydataList.search, listType, inFilteredResult },
    show: { ..._mydataList.show, entityContent: true },
    selected: { ...DEFAULT_STATE.selected },
  }

  dispatch(setValues(values))
  dispatch(handleSort(_mydataList.sort.activeField))
}

// folder click
export const handleCollectionClick = ({ isInDataset = false, isInModel = false, entity = {} }) => (dispatch, getState) => {
  if (!isInDataset && !isInModel && entity.name && (entity.entityType === null || entity.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR)) {
    const { _mydataList } = getState()._mydataList

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

    const { headers } = _mydataList
    const values = {
      headers: { ...headers, 'V-PARENTID': entity.id, 'V-PATH': entity.path },
      selected: { ...DEFAULT_STATE.selected },
    }
    window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
    window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(jBreadcrumb))
    dispatch(setDoubleClick(values))
    dispatch((setEntityList()))
  }
}

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
      // this.setState(({ headers }) => ({ ...DEFAULT_STATE, headers: { ...headers, 'V-PARENTID': LOCATIONS.ROOT, 'V-PATH': '' } }), this.fetchEntityList)
    } else {
      const values = { headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }
      dispatch(setValues(values))
      dispatch(setEntityList())
      // this.setState(({ headers }) => ({ headers: { ...headers, 'V-PATH': currBreadcrumb.path, 'V-PARENTID': currBreadcrumb.entityId || LOCATIONS.ROOT } }), this.fetchEntityList)
    }
  }
}

export const handleChangeMenuRight = (menu = '', value = '') => {
  const lmenu = menu.toLowerCase()
  let action = () => null

  if (lmenu) {
    if (lmenu === 'info') action = handleShowInfoDrawer()
    if (lmenu === 'preview') action = handleFunctionDoc()
    // if (lmenu === 'pipeline sensor') this.handleConfirmationModal({ type: 'addToPipeline' })
    if (lmenu === 'pipeline') action = handleCreatePipeline()
    // if (lmenu === 'sensors') this.handleConfirmationModal({ type: 'addToSensorGroup' })
    if (lmenu === 'folder') action = handleMoveDirectory(value)
    // if (lmenu === 'create app') this.handleCreateApp()
    if (lmenu === 'delete') action = handleActionTrash('move')
    if (lmenu === 'sync') action = handleSync()
    if (lmenu === 'asset') action = handleFunctionDoc()
    if (lmenu === 'restore') action = handleActionTrash('restore')
    // if (lmenu === 'telemetry') this.handleTelemetryMapping()
  }

  return action
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
