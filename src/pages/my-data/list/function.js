import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import { getCookie } from 'Helpers/get-cookie'
import queryString from 'query-string'

import sortColumn from 'Config/lib/sort-column'
import {
  FILE_TYPES,
  ASSET_STATUS,
} from 'Config/constants'
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
} from './local-helper'

const breadcrumb = getBreadcrumb()

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

export const setEntityList = (query = {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers, sort } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()
  const currLocation = !!window && window.localStorage.getItem('MYDATA.location')

  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      parentId: (!!currLocation && JSON.parse(currLocation).entityId) || '',
      pathPrefix: (!!currLocation && JSON.parse(currLocation).path) || '',
      orderName: sort.activeField,
      orderType: sort.isAsc ? 'ASC' : 'DESC',
      ...query,
    },
  }

  const pathEntity = `${emmaDirectory}/${params.driveId}/entities`

  dispatch(getEntityList(pathEntity, params, authCookie, res => dispatch(setShowEntities(doRefineEntities(res)))))
}

// *** RIGHT CLICK ACTION
const isSelectedAllError = selected => {
  const arraySelected = [...Object.values(selected)]

  return !arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1
}

const rightClickMenus = (selected, _mydataList) => {
  const { entities } = _mydataList

  const currLocation = !!window && window.localStorage.getItem('MYDATA.location')
  const isInTrash = JSON.parse(currLocation).name === LOCATIONS.TRASH

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
    createApp: showDetailAssets,
    info: showInfo,
    sync: showSync,
    folders: showAddToFolder && folders && folders.length > 0,
    delete: showTrash,
    sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
    asset: showDetailAssets,
    restore: isInTrash && hasSelectedItem,
  }

  const submenu = {
    folders: folders || [],
    sensorgroup: sensorgroup || [],
  }

  return getMenuList(show, submenu)
}

const handleCreatePipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { datasource }, selected } },
    volantisConstant: { routes: { pipeline: { root } } },
  } = getState()
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
      linkTo(`${root}${qs}`)// route pipeline perlu di define
    }
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

  return dispatch(getTrashList(pathTrash, authCookie, res => (
    dispatch(setValue('entities', doRefineEntities(res)))
  )))
}

const handleActionTrash = (type = 'move') => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected, headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { libraDirectory } },
    },
  } = getState()

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
        dispatch(postRestoreFromTrash(pathRestore, ids, authCookie, libraDirectory, () => {
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
    volantisConstant: { cookie: { auth: authCookie } },
  } = getState()

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
      if (!!window) window.document.getSelection().removeAllRanges()
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
        [selectedType]: [en],
      }

      return newSelected
    },
  }

  return actions[eventName(event)]
}

export const handleSelectList = (event, en, position = { left: 0, top: 0 }, isRightClick = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList },
  } = getState()

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
  let {
    volantisMyData: { _mydataList: { position: { left, top } } },
  } = getState()

  const outerHeight = (!!window && window.outerHeight) || 0
  const outerWidth = (!!window && window.outerWidth) || 0

  const screenY = (outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280
  const screenX = (outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120
  top = Math.ceil(screenY / 16)
  left = Math.ceil(screenX / 16)

  dispatch(handleSelectList(evt, en, { left, top }, true))
}

export const handleChangeMenuRight = (menu = '', value = '', linkTo = () => {}) => {
  const lmenu = menu.toLowerCase()
  let action = () => null

  if (lmenu) {
    if (lmenu === 'info') action = handleShowInfoDrawer()
    if (lmenu === 'preview') action = handleAssetDetail()
    if (lmenu === 'pipeline sensor') setConfirmationModalOpen({ type: 'addToPipeline' })
    if (lmenu === 'pipeline') action = handleCreatePipeline(linkTo)
    if (lmenu === 'sensors') setConfirmationModalOpen({ type: 'addToSensorGroup' })
    if (lmenu === 'folder') action = handleMoveDirectory(value)
    // if (lmenu === 'create app') this.handleCreateApp()
    if (lmenu === 'delete') action = handleActionTrash('move')
    if (lmenu === 'sync') action = setConfirmationModalOpen({ type: 'sync' })
    if (lmenu === 'asset') action = handleAssetDetail()
    if (lmenu === 'restore') action = handleActionTrash('restore')
    // if (lmenu === 'telemetry') this.handleTelemetryMapping()
  }

  return action
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
export const handleChangeTopMenu = (menu = '', linkTo = () => {}) => (dispatch, getState) => {
  const lmenu = menu.toLowerCase()
  const {
    volantisMyData: { _mydataList: { entities } },
    volantisConstant: { routes: { myData: { root, create } } },
  } = getState()

  let headers = {}

  if (entities.length > 0) {
    const { driveId, name, parentId } = entities[0]
    headers = { driveId, name, parentId }
  } else {
    headers = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT }
  }
  if (!!window) window.localStorage.setItem('MYDATA.create', JSON.stringify(headers))

  if (['file', 'sql', 'device', 'media'].includes(lmenu) && !!window) {
    linkTo(`${root}${create}?type=${lmenu}`)
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
  const {
    volantisMyData: { _mydataList },
  } = getState()

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
  const {
    volantisMyData: { _mydataList: { search: { list: searchListText }, location } },
  } = getState()

  let inFilteredResult = true
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
  const {
    volantisMyData: { _mydataList: { search } },
  } = getState()

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
    const {
      volantisMyData: { _mydataList: { headers } },
    } = getState()

    if (!window) return

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
  if (isBreadcrumbExist()) {
    const jBreadcrumb = JSON.parse(breadcrumb)

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

    if (!!window) {
      window.localStorage.setItem('MYDATA.location', JSON.stringify(newLocation))
      window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify(newBreadcrumb))
    }

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
  if (!!window && window.localStorage.getItem('MYDATA.breadcrumb')) {
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
  if (!window) return

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

  const {
    volantisMyData: { _mydataList: { search, show, sort } },
  } = getState()

  const inFilteredResult = true
  setBreadcrumb(locationName)
  if (!!window) {
    window.localStorage.setItem('MYDATA.location', JSON.stringify({
      parentId: locationName,
      name: locationName,
      entityId: LOCATIONS.ROOT,
      path: '',
    }))
  }
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
    search: { ...search, listType, inFilteredResult },
    show: { ...show, entityContent: true },
    selected: { ...DEFAULT_STATE.selected },
  }

  dispatch(setValues(values))
  dispatch(handleSort(sort.activeField))
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
