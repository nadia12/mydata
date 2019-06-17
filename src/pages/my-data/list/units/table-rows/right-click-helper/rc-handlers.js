/** List Right Click Actions:
 * 1. handleCreateApp
 * 2. handleEditPipeline
 * 3. handleCreatePipeline
 * 4. handleMoveDirectory
 * 5. handleEditDashboard
 * 6. handleActionTrash (Move Trash or restore Trash)
 * 7. handleAssetDetail
 * 8. handleShowInfoDrawer
 * 9. handleEditConfiguration
 */

import {
  DATASOURCE_STATUS,
} from 'Config/constants'

import {
  setConfirmationModalOpen,
  putMoveDirectory,
  setToggleModalClose,
  setToggleModalOpen,
  setEmptyEntities,
  postMoveToTrash,
  postRestoreFromTrash,
  getFilteredAppByAsset,
  setValue,
  setFields,
} from 'MyData/list/reducer'

import {
  setTrashList,
  setEntitiesByHref,
} from 'MyData/list/function'

import QueryString from 'query-string'

export const handleCreateApp = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: { routes: { apiManagement: { root: apiManagementRoot } } },
  } = getState()

  linkTo(`${apiManagementRoot}?asset=${asset[0].id}`)
}

export const handleEditPipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { pipeline } } },
    volantisConstant: { routes: { pipeline: { root: pipelineRoot } } },
  } = getState()

  linkTo(`${pipelineRoot}/${pipeline[0].id}`)
}

export const handleCreatePipeline = (linkTo = () => {}) => (dispatch, getState) => {
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
    const qs = `${QueryString.stringify({ ids })}&${QueryString.stringify({ name: names })}`
    linkTo(`${pipelineRoot}?${qs}`)
  }
}

export const handleMoveDirectory = menu => (dispatch, getState) => {
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

export const handleEditDashboard = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { dashboard } } },
    volantisConstant: { routes: { xplorer: { root: xplorerRoot, dashboard: dashboardUrl } } },
  } = getState()
  linkTo(`${xplorerRoot}${dashboardUrl}/${dashboard.length && dashboard[0].id}`)
}

const arraySelected = selected => [...Object.values(selected).flatMap(select => select)]

const handleMoveToTrash = ids => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const driveId = headers['V-DRIVEID']
  const pathTrash = `${emmaDirectory}/trash/${driveId}`

  dispatch(postMoveToTrash(pathTrash, ids, authCookie, (res, err) => {
    if (!!err && !!err.response.body.message) dispatch(setConfirmationModalOpen({ type: 'failedMoveToTrash' }))
    else {
      dispatch(setEmptyEntities())
      dispatch(setEntitiesByHref())
    }
  }))
}

const handleRestoreFromTrash = (ids, isParentExist = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const driveId = headers['V-DRIVEID']
  const pathRestore = `${emmaDirectory}/trash/${driveId}/restore`

  dispatch(postRestoreFromTrash(pathRestore, ids, { isParentExist }, authCookie, (res, err) => {
    if (!!err && !!err.response.body.message) dispatch(setConfirmationModalOpen({ type: 'failedRestoreTrash' }))
    else {
      dispatch(setEmptyEntities())
      dispatch(setTrashList({ orderName: 'updatedAt', page: 0 }))
    }
  }))
}

export const handleActionTrash = (type = 'move', isParentExist = false) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected } },
  } = getState()

  const ids = arraySelected(selected).map(s => (s.id))

  const defineAction = type => {
    const action = {
      move: () => dispatch(handleMoveToTrash(ids)),
      restore: () => dispatch(handleRestoreFromTrash(ids, isParentExist)),
      default: () => {},
    }

    return action[type]() || action.default()
  }

  return defineAction(type)
}

export const handleAssetDetail = () => (dispatch, getState) => {
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

export const handleShowInfoDrawer = () => setToggleModalOpen('infoDrawer')

export const handleEditConfiguration = ({ entity }) => dispatch => {
  const {
    currentDataFlow: {
      dataIntegrationMeta:
      {
        type, dataSourceConfig: {
          dataSourceType, hostName, port, username, password, fileUrl, databaseName,
        },
      },
    },
    name,
  } = entity

  const data = {
    SQL_MYSQL: {
      type,
      databaseName,
      dataSourceType,
      hostName,
      port,
      username,
      password,
      // name,
    },
    FILE: {
      type,
      dataSourceType,
      fileUrl,
      // name,
    },
  }

  const modalConfig = {
    SQL_MYSQL: 'editConfigurationSQL',
    FILE: 'editConfigurationFile',
  }

  dispatch(setFields(modalConfig[dataSourceType], data[dataSourceType]))
  dispatch(setToggleModalOpen(modalConfig[dataSourceType]))
}
