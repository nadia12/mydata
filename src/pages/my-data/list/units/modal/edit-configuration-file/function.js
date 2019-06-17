import {
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
} from 'Config/lib/local-helper'
import { getCookie } from 'Helpers/get-cookie'

import {
  putConnectorConfiguration as putConnectorConfigurationReducer,
} from '../../../reducer'

export const setHeaders = ({
  name = [], userInfoName = '',
}) => {
  const jLocation = getJLocation()
  const jBreadcrumb = getJBreadcrumb()

  const userInfo = getCookie({ cookieName: userInfoName })
  const currBreadcrumb = jBreadcrumb.pop() || {} // get last breadcrumb

  const headers = {
    driveId: userInfo.owner_id,
    creatorName: userInfo.name,
    creatorId: userInfo.id,
    parentId: jLocation.entityId,
    name: name || '',
    mime: currBreadcrumb.path || '',
  }

  return headers
}

export const putConnectorConfiguration = (param, cb = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        fields,
        selected: {
          connector,
        },
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie, user: userInfoName },
      service: { endpoint: { emmaConnector } },
    },
  } = getState()

  const connectorId = connector.length ? connector[0].id : ''
  const data = {
    editConfigurationSQL: {
      dataSourceType: fields[param].dataSourceType || null,
      hostName: fields[param].hostName || null,
      port: fields[param].port || null,
      username: fields[param].username || null,
      password: fields[param].password || null,
    },
    editConfigurationFile: {
      dataSourceType: fields[param].dataSourceType || null,
      fileUrl: fields[param].fileUrl || null,
    },
  }

  const req = {
    id: connectorId || null,
    currentDataFlow: {
      dataIntegrationMeta: {
        type: fields[param].type || null,
        dataSourceConfig: { ...data[param] },
      },
    },
  }

  const headersResponse = setHeaders({ name: fields[param].name, userInfoName })
  const headers = {
    'V-DRIVEID': headersResponse.driveId,
    'V-CREATORNAME': headersResponse.creatorName,
    'V-CREATORID': headersResponse.creatorId,
    'V-PARENTID': headersResponse.parentId,
    'V-PATH': headersResponse.path,
    'V-NAME': headersResponse.name,
  }

  const path = `${emmaConnector}/${connectorId}/update`

  dispatch(putConnectorConfigurationReducer({
    payloads: req,
    authCookie,
    path,
    headers,
    cb,
  }))
}

