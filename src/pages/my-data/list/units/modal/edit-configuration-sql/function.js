import {
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
} from 'Config/lib/local-helper'
import { getCookie } from 'Helpers/get-cookie'

import {
  postCheckSqlCredential as postCheckSqlCredentialReducer,
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

const createConnectorConfig = ({
  fields,
}) => ({
  dataSourceType: fields.dataSourceType,
  id: null,
  hostName: fields.hostName || null,
  port: typeof fields.port === 'undefined' || fields.port === null ? null : +fields.port,
  username: fields.username || null,
  password: fields.password || null,
  databaseName: fields.databaseName || null,
  sid: fields.sid || null,
  serviceName: fields.serviceName || null,
  creator: fields.creator || null,
  filePath: fields.filePath || null,
  fileUrl: fields.fileUrl || null,
  delimiter: fields.delimiter || null,
  quoteCharacter: fields.quoteCharacter || null,
  escapeCharacter: fields.escapeCharacter || null,
  encoding: fields.encoding || null,
  fileSource: typeof fields.filePath !== 'undefined' && fields.filePath !== null ? 'MY_FILES' : null,
})

export const postCheckSqlCredential = (param, cb = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataList: {
        fields,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDatasource } },
    },
  } = getState()

  const req = createConnectorConfig({ fields: { ...fields[param] } })

  const path = `${emmaDatasource}/check/tables`
  dispatch(postCheckSqlCredentialReducer({
    authCookie,
    path,
    cb,
    payloads: req,
  }))
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
  // const req = { ...fields[param] }
  const req = {
    id: connectorId || null,
    currentDataFlow: {
      dataIntegrationMeta: {
        type: fields[param].type || null,
        dataSourceConfig: {
          dataSourceType: fields[param].dataSourceType || null,
          hostName: fields[param].hostName || null,
          port: fields[param].port || null,
          username: fields[param].username || null,
          password: fields[param].password || null,
        },
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

