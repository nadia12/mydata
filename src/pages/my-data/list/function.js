import inputReplacer from 'Config/lib/input-replacer'
import checkRequired from 'Config/lib/input-check-required'
import queryString from 'query-string'

import sortColumn from 'Config/lib/sort-column'
import { accessToken } from 'Config/constants/context'
import { SET_AUTH_COOKIE } from './action-type'
import {
  setValue,
  setValues,
  setToggleModal,
  setToggleModalOpen,
  setPreviewAsset,
  setDoubleClick,
  postMoveToTrash,
  postRestoreFromTrash,
  getFunctionDoc,
  getAccuracy,
  putSyncDatasource,
  getTrashList,
  putMoveDirectory,
  getEntityList,
  postConnectorData,
  getFilterEntity,
  getModelList,
  getPretrainedModelList,
  getPipelineList,
  getDatasetList,
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
  doRefinedModel,
  doRefinedDataset,
} from './helper'

import {
  isInSensorGroup,
  breadcrumb,
  isBreadcrumbExist,
  location,
} from './local-helper'

// ****** Action on Entity TableRows My Data ***** //
// ==== ONECLICK, RIGHTCLICK, DOUBLECLICK

const isSelectedAllError = selected => {
  const arraySelected = [...Object.values(selected)]

  return !arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1
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

  return getMenuList(show, submenu)
}

const eventName = () => {
  let name = 'default'
  if (event.metaKey || event.ctrlKey) name = 'ctrl'
  if (event.shiftKey) name = shift

  return name
}

const handleCreatePipeline = () => (dispatch, getState) => {
  const { selected: { datasource }, selected } = getState()._mydataList

  delete selected.menu

  const newSelected = {
    ...selected,
    datasrouce: datasource.datasource && (
      datasource.filter(d => d.status === DATASOURCE_STATUS.SUCCESS || d.status === DATASOURCE_STATUS.SYNC_SUCCESS || d.status === DATASOURCE_STATUS.SYNC_FAILED)
    ),
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
const handleMoveDirectory = menu => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { authCookie } = getState()._mydataList

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
        dispatch(putMoveDirectory(data.driveId, data.entityId, data.targetCollectionId, authCookie, res => {
          if (res) dispatch(setEntityList())
        }))
      }
    })
  })
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

const handleFunctionDoc = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  dispatch(getFunctionDoc(componentType, authCookie, () => {
    const accuracy = 0
    if (componentType[0].type === 'Model') {
      dispatch(getAccuracy(componentType[0], resAccuracy => setPreviewAsset(resAccuracy, 'assetDetail')))
    }

    return setPreviewAsset(accuracy, 'assetDetail')
  }))
}

const handleShowInfoDrawer = () => setToggleModal('infoDrawer')

const handleSync = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  const connectorId = getState()._mydataList.selected.datasource[0].id

  dispatch(putSyncDatasource(connectorId, authCookie, res => {
    if (res) {
      setToggleModal('sync')
      setEntityList()
    }
  }))
}

export const handleChangeMenuRight = (menu = '', value ='') => {
  const lmenu = menu.toLowerCase()
  let action = () => null
   console.log('handleChangeMenuRight =====>', lmenu)

  if (!!lmenu) {
    if (lmenu === 'info') action = handleShowInfoDrawer();
    if (lmenu === 'preview') action = handleFunctionDoc();
    // if (lmenu === 'pipeline sensor') this.handleConfirmationModal({ type: 'addToPipeline' });
    if (lmenu === 'pipeline') action = handleCreatePipeline()
    // if (lmenu === 'sensors') this.handleConfirmationModal({ type: 'addToSensorGroup' });
    if (lmenu === 'folder') action = handleMoveDirectory(value);
    // if (lmenu === 'create app') this.handleCreateApp();
    if (lmenu === 'delete') action = handleActionTrash('move');
    if (lmenu === 'sync') action = handleSync();
    if (lmenu === 'asset') action = handleFunctionDoc();
    if (lmenu === 'restore') this.handleActionTrash('restore');
    // if (lmenu === 'telemetry') this.handleTelemetryMapping();
  }
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

const selectedByEvent = (event, en, _mydataList) => {
  const { ntype, id, idx: enIdx } = en
  const { lastSelected, selected, entities } = _mydataList
  let newSelected = { ...selected }
  console.log('newsSelected', event)

  const actions = {
    'ctrl': () => {
      const detail = selected[ntype].find(det => det.id === id)
      let newSelectedType = selected[ntype]
      const exist = detail && newSelectedType.findIndex(select => select.id === detail.id) > -1

      if (exist) newSelectedType = newSelectedType.filter(select => select.id !== detail.id)
      else newSelectedType.push({ ...en })

      newSelected[ntype] = newSelectedType

      return newSelected
    },

    'shift': () => {
      document.getSelection().removeAllRanges()
      const selectedEntities = lastSelected < enIdx ? entities.slice(lastSelected, enIdx + 1) : entities.slice(enIdx, lastSelected + 1)
      selectedEntities.forEach(selectedEn => {
        const selectedType = newSelected[selectedEn.ntype]
        const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1
        if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn })
      })

      return newSelected
    },
    'default': () => {
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

export const setEntityList = () => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { authCookie } = getState()._mydataList
  const currLocation = window.localStorage.getItem('MYDATA.location')

  console.log('masuk entity')

  const params = {
    driveId: _mydataList.headers['V-DRIVEID'],
    entityId: JSON.parse(currLocation).entityId,
  }

  //     const { entities, sort } = props._mydataList
  // const connectorIds = entities.map((et) => (et.id))
  // props.handleSort(sort.activeField)
  // props.postConnectorData(connectorIds)
  dispatch(getEntityList(params, authCookie, res => {
    const connectorIds = res.map(entity => entity.id)
    dispatch(setValue('entities', doRefineEntities(res)))
    dispatch(postConnectorData(connectorIds, authCookie, res2 => {
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

export const handleSelectList = (event, en, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const { _mydataList } = getState()
  const { idx: enIdx } = en
  const { show } = _mydataList
  const newSelected = selectedByEvent(event, en, _mydataList)()
  console.log('newSelected', newSelected)
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

export const handleSearchList = () => (dispatch, getState) => {
  let inFilteredResult = true
  const { authCookie } = getState()._mydataList
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
      dispatch(getFilterEntity({
        driveId: headers['V-DRIVEID'],
        entityName: searchListText,
        parentPath: headers['V-PATH'],
      }, authCookie, res => {
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
  dispatch(setValues({ search: { ...DEFAULT_STATE.search, inFilteredResult }, filteredAsset, selected: { ...DEFAULT_STATE.selected } }))
}

export const handleSearchChange = value => (dispatch, getState) => {
  const { search } = getState()._mydataList
  dispatch(setValues({ search: { ...search, list: value, inSearchList: false } }))
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

const setModelList = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch(getModelList(authCookie, (res, err) => (
    dispatch(setValue('entities', doRefinedModel(res, err)))
  )))
}

const setPretrainedModelList = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList

  return dispatch(getPretrainedModelList(authCookie, (res, err) => (
    dispatch(setValue('entities', doRefinedModel(res, err)))
  )))
}

const setPipelineList = (authCookie, resDataset) => (dispatch, getState) => {

  return dispatch(getPipelineList(authCookie, res => (
    dispatch(setValue('entities', doRefinedDataset(resDataset, res)))
  )))
}

const setDatasetList = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  const token = accessToken()

  return dispatch(getDatasetList(authCookie, res => (
    dispatch(setPipelineList(token, res))
  )))
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
      [LOCATIONS.MODEL]: () => {
        dispatch(setModelList())
      },
      [LOCATIONS.PRETRAINED_MODEL]: () => {
        dispatch(setPretrainedModelList())
      },
      [LOCATIONS.DATASET]: () => {
        dispatch(setDatasetList())
      },
    }

    return path[locationName]()
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

