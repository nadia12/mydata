import {
  putSyncDatasource,
  setConfirmationModalClose,
  setToggleModalClose,
} from 'MyData/list/reducer'

import {
  setEntitiesByHref,
} from 'MyData/list/function'

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
