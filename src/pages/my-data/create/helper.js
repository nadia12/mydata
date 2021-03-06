import {
  REPLACER,
  CREATE_TYPE,
} from 'Config/constants'
import {
  jBreadcrumb as getJBreadcrumb,
  jLocation as getJLocation,
} from 'Config/lib/local-helper'
import { getCookie } from 'Helpers/get-cookie'
import {
  INPUT_MAX_LENGTH,
} from './constant'

export const getFormDevice = {
  step0: () => ({ touched: {}, required: ['deviceType'] }),
  step1: () => ({
    fields: [
      {
        name: 'Sensor Name', key: 'sensorname', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Sensor Type', key: 'sensortype', type: 'select', isMultiSelect: true, replacer: REPLACER.default, options: [],
      },
      { name: 'Description', key: 'sensordesc', replacer: REPLACER.specialAlphaNumeric },
    ],
    touched: {},
    required: ['sensorname', 'sensortype', 'sensordesc'],
  }),
}

export const getFormFileUrl = {
  step0: () => ({
    required: ['fileName', 'fileUrl'],
    fields: [
      {
        name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      { name: 'Your File Link', key: 'fileUrl', replacer: REPLACER.specialAlphaNumeric },
    ],
  }),
}

export const getFormFileLocal = {
  step0: () => ({
    required: ['uploadType', 'filePath', 'fileName'],
    fields: [{
      name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
    }],
  }),
}

export const getFormSql = {
  step0: () => ({ touched: {}, required: ['dbType'] }),
  step1: ({ type }) => {
    const sqlRules = {
      oracle: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          [
            {
              name: 'SID / Service Name', key: 'oracleType', replacer: REPLACER.default, type: 'select', options: [{ label: 'SID', value: 'SID' }, { label: 'Service Name', value: 'Service Name' }],
            },
            { name: '', key: 'sidservicename', replacer: REPLACER.default },
          ],
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'oracleType', 'sidservicename', 'username', 'password'],
      },
      db2: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          { name: 'Creator Name', key: 'creator', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Database Name', key: 'databaseName', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'creator', 'databaseName', 'username', 'password'],
      },
      default: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          { name: 'Database Name', key: 'databaseName', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'databaseName', 'username', 'password'],
      },
    }

    return sqlRules[type] || sqlRules.default
  },
  step2: () => ({
    fields: [
      {
        name: 'Table Name', key: 'tableName', replacer: REPLACER.default, type: 'select',
      },
    ],
    touched: {},
    required: ['tableName'],
  }),
  step3: () => ({
    fields: [
      { name: 'Incrementing Column', key: 'increamentingColumn', replacer: REPLACER.default },
      { name: 'Time Stamp Column', key: 'timeStampColumn', replacer: REPLACER.default },
    ],
    touched: {},
    required: [['increamentingColumn', 'timeStampColumn']],
  }),
}

export const getFormMedia = {
  step0: () => ({
    touched: {},
    required: ['fileName', 'fileSize', 'UUID'],
    fields: [
      {
        name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  }),
}

export const setHeaders = ({
  data = [], userInfoName = '', type = '',
}) => {
  const datavName = {
    [CREATE_TYPE.sql]: {
      vName: data.step1.datasetName,
    },
    [CREATE_TYPE.file]: {
      vName: data.step1.fileName,
    },
    [CREATE_TYPE.fileUrl]: {
      vName: data.step0.fileName,
    },
    [CREATE_TYPE.fileLocal]: {
      vName: data.step0.fileName,
    },
    default: {
      vName: '',
    },
  }

  const jLocation = getJLocation()
  const jBreadcrumb = getJBreadcrumb()

  const userInfo = getCookie({ cookieName: userInfoName })
  const currBreadcrumb = jBreadcrumb.pop() || {} // get last breadcrumb

  const headers = {
    driveId: userInfo.owner_id,
    creatorName: userInfo.name,
    creatorId: userInfo.id,
    parentId: jLocation.entityId,
    path: currBreadcrumb.path || '',
    name: datavName[type].vName || datavName.default.vName,
  }

  return headers
}

