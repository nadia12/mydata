import {
  postCheckSqlCredential as postCheckSqlCredentialReducer,
} from '../../../reducer'

const createConnectorConfig = ({
  fields,
}) => ({
  dataSourceType: fields.dataSourceType,
  id: '',
  hostName: fields.hostName || '',
  port: typeof fields.port === 'undefined' || fields.port === null ? '' : +fields.port,
  username: fields.username || '',
  password: fields.password || '',
  databaseName: fields.databaseName || '',
  sid: fields.sid || '',
  serviceName: fields.serviceName || '',
  creator: fields.creator || '',
  filePath: fields.filePath || '',
  fileUrl: fields.fileUrl || '',
  delimiter: fields.delimiter || '',
  quoteCharacter: fields.quoteCharacter || '',
  escapeCharacter: fields.escapeCharacter || '',
  encoding: fields.encoding || '',
  fileSource: typeof fields.filePath !== 'undefined' && fields.filePath !== null ? 'MY_FILES' : '',
})

export const postCheckSqlCredentialConnector = (param, cb = () => {}) => (dispatch, getState) => {
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
