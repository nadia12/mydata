import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import { getCookie } from 'Helpers/get-cookie'
import queryString from 'query-string'

import {
  LOCATIONS,
  UI_ENTITY_TYPES,
} from 'Config/constants'
import {
  getCurrentWindow,
  checkPath,
  extendedData,
} from 'Config/lib/url-helper'
import {
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
  setRootLocation,
  setTrashLocation,
} from 'Config/lib/local-helper'

import {
  handleCreateApp,
  handleEditPipeline,
  handleCreatePipeline,
  handleMoveDirectory,
  handleEditDashboard,
  handleActionTrash,
  handleAssetDetail,
  handleShowInfoDrawer,
} from 'MyData/list/units/table-rows/right-click-helper/rc-handlers'

import {
  setValue,
  setValues,
  setEmptyEntities,
  setEntitiesPage,
  setToggleModalOpen,
  setConfirmationModalOpen,
  getTrashList,
  getEntityList,
} from './reducer'

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

export const getAllFolders = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        headers,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const params = {
    driveId: headers['V-DRIVEID'],
    query: {
      uiEntityType: UI_ENTITY_TYPES.FOLDER,
      parentId: headers['V-PARENTID'],
    },
  }

  const pathEntity = `${emmaDirectory}/${params.driveId}/entities`

  dispatch(getEntityList(pathEntity, params, authCookie, res => {
    dispatch(setValue('allFolders', res))
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

export const handleClickTrashBin = linkTo => (dispatch, getState) => {
  const {
    volantisConstant: { routes: { myData: { root: myDataRoot, trash: trashPath } } },
  } = getState()

  const newPath = checkPath(LOCATIONS.TRASH) ? `${myDataRoot}` : `${myDataRoot}${trashPath}`
  linkTo(`${newPath}`)
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

export const handleChangeMenuRight = (menu = '', value = '', linkTo = () => {}) => dispatch => {
  const lmenu = menu.toLowerCase()

  const action = {
    info: handleShowInfoDrawer(),
    preview: handleAssetDetail(),
    'pipeline sensor': setConfirmationModalOpen({ type: 'addToPipeline' }),
    pipeline: handleCreatePipeline(linkTo),
    'pipeline edit': handleEditPipeline(linkTo),
    sensors: setConfirmationModalOpen({ type: 'addToSensorGroup' }),
    'move to folder': handleMoveDirectory(value),
    'edit dashboard': handleEditDashboard(linkTo),
    'create app': handleCreateApp(linkTo),
    moveToTrash: handleActionTrash('move'),
    delete: handleActionTrash('delete'),
    sync: setConfirmationModalOpen({ type: 'sync' }),
    asset: handleAssetDetail(),
    restore: handleActionTrash('restore'),
    default: () => null,
  }

  return lmenu ? dispatch(action[lmenu]) : dispatch(action.default)
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
// ** END SEARCH

// ** Breadcrumb
const handleBreadcrumbChange = ({ entityId, idx }, linkTo = () => {}) => (dispatch, getState) => {
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
// ** END Breadcrumb

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
