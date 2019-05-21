
export const handleCreateApp = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: { routes: { apiManagement: { root: apiManagementRoot } } },
  } = getState()

  linkTo(`${apiManagementRoot}?asset=${asset[0].id}`)
}

export const handleEditPipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { selected: { asset } } },
    volantisConstant: { routes: { pipeline: { root: pipelineRoot } } },
  } = getState()

  linkTo(`${pipelineRoot}/${asset[0].id}`)
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
    const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`
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

// END RIGHT CLICK ACTION
