// import {
//   TYPE_LIST_CONNECTOR,
// } from 'Config/constants'

import {
  postCheckSqlCredential as postCheckSqlCredentialReducer,
  putConnectorConfiguration as putConnectorConfigurationReducer,
} from '../../../reducer'

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
      cookie: { auth: authCookie },
      service: { endpoint: { emmaConnector } },
    },
  } = getState()

  const connectorId = connector.length ? connector[0].id : ''
  const req = { ...fields[param] }
  const path = `${emmaConnector}/${connectorId}/update`

  console.log('putConnectorConfiguration ===> ', req, path)

  dispatch(putConnectorConfigurationReducer({
    authCookie,
    path,
    cb,
    payloads: req,
  }))
}

