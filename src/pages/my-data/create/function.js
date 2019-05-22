import moment from 'moment'
import uuidv4 from 'uuid/v4'
import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import {
  createMappingConfig,
  createDataSourceConfig,
} from 'Helpers/create-connector'
import { getCookie } from 'Helpers/get-cookie'
import { extendedData, isWindowExist } from 'Config/lib/url-helper'
import {
  LOCATIONS,
  CREATE_TYPE,
} from 'Config/constants'

import {
  BUTTON_ADD,
} from './constant'

import {
  getFormDevice,
  getFormSql,
  getFormMedia,
  getFormFileUrl,
  getFormFileLocal,
  setHeaders,
} from './helper'

import {
  setRules,
  setData,
  setFiles,
  resetFiles,
  setToastClose,
  // setToastOpen,
  setModalErrorUpload,
  setModalErrorCreate,
  setLayout,
  setCreateType as setCreateTypeReducer,
  setFileChange as setFileChangeReducer,
  setFileUploading as setFileUploadingReducer,
  postDataSource as postDataSourceReducer,
  postCheckSqlCredential as postCheckSqlCredentialReducer,
  resetFields,
} from './reducer'

const tus = require('tus-js-client')

export {
  setRules,
  setData,
  setFiles,
  resetFiles,
  setModalErrorUpload,
  setModalErrorCreate,
  setLayout,
  resetFields,
  setToastClose,
}

export const handleSetLayout = ({ status }) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataCreate: {
        layout,
        layout: { buttonText },
      },
    },
  } = getState()

  const statusType = {
    success: 'SUCCESS',
    failed: 'FAILED',
  }

  const data = {
    [statusType.success]: {
      buttonText: 'return to mydata',
      allowNext: true,
    },
    [statusType.failed]: {
      buttonText: 'retry',
      allowNext: true,
    },
    default: {
      buttonText,
      allowNext: false,
    },
  }

  const payload = data[status] || data.default
  dispatch(setLayout({
    layout: {
      ...layout, ...payload,
    },
  }))
}

export const setFileChange = ({ status, showTableUpload = false }) => (dispatch, getState) => {
  const { filesData } = getState().volantisMyData._mydataCreate
  const payload = {
    ...filesData,
    status: status || filesData.status,
    showTableUpload,
  }

  dispatch(setFileChangeReducer(payload))
}

export const setFileUploading = ({ status = '', currPercentage = 0 }) => (dispatch, getState) => {
  const { filesData } = getState().volantisMyData._mydataCreate
  const { percentage } = filesData

  const fileStatus = {
    success: 'SUCCESS',
    failed: 'FAILED',
    uploading: 'UPLOADING',
  }

  const defaultPayload = {
    payload: {
      ...filesData,
      status: status || filesData.status,
    },
  }

  const newPercentage = percentage < currPercentage ? currPercentage : percentage
  const data = {
    [fileStatus.uploading]: {
      payload: {
        ...filesData,
        percentage: newPercentage,
        status,
        lastUpdate: moment(),
      },
    },
    [fileStatus.success]: {
      ...defaultPayload,
      showTableUpload: true,
    },
    [fileStatus.failed]: { ...defaultPayload },
  }

  dispatch(setFileUploadingReducer(data[status].payload))
  dispatch(handleSetLayout({ status }))
}

export const postCheckSqlCredential = (cb = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataCreate: {
        data: {
          step0, step1, step2,
        },
        type,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDatasource } },
    },
  } = getState()

  const req = createDataSourceConfig({
    step0, step1, step2, type,
  })

  const path = `${emmaDatasource}/check/tables`
  dispatch(postCheckSqlCredentialReducer({
    authCookie,
    path,
    cb,
    payloads: req,
  }))
}

export const postDatasource = (cb = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataCreate: {
        data,
        type,
      },
    },
    volantisConstant: {
      cookie: { auth: authCookie, user: userInfoName },
      service: { endpoint: { emmaConnector } },
    },
  } = getState()

  const {
    step0, step1, step2,
  } = data

  const req = createMappingConfig({
    step0, step1, step2, type,
  })
  const { id } = req
  const headersResponse = setHeaders({ data, userInfoName, type })
  const headers = {
    'V-DRIVEID': headersResponse.driveId,
    'V-CREATORNAME': headersResponse.creatorName,
    'V-CREATORID': headersResponse.creatorId,
    'V-PARENTID': headersResponse.parentId,
    'V-PATH': headersResponse.path,
    'V-NAME': headersResponse.name,
  }

  const path = `${emmaConnector}/${id}`

  dispatch(postDataSourceReducer({
    headers,
    authCookie,
    path,
    cb,
    payloads: req,
  }))
}

export const setRulePerStep = ({ step, type, props = {} }) => (dispatch, getState) => {
  const {
    rules,
  } = getState().volantisMyData._mydataCreate

  const newRules = [...rules]
  switch (type) {
    case CREATE_TYPE.media:
      newRules[step] = getFormMedia[`step${step}`] ? getFormMedia[`step${step}`](props) : []
      break
    case CREATE_TYPE.sql:
      newRules[step] = getFormSql[`step${step}`] ? getFormSql[`step${step}`](props) : []
      break
    case CREATE_TYPE.fileUrl:
      newRules[step] = getFormFileUrl[`step${step}`] ? getFormFileUrl[`step${step}`](props) : []
      break
    case CREATE_TYPE.fileLocal:
      newRules[step] = getFormFileLocal[`step${step}`] ? getFormFileLocal[`step${step}`](props) : []
      break
    case CREATE_TYPE.device:
      newRules[step] = getFormDevice[`step${step}`] ? getFormDevice[`step${step}`](props) : []
      break
    default:
      newRules[step] = []
  }

  dispatch(setRules({ rules: newRules }))
}

export const setBackStepTypeFile = () => (dispatch, getState) => {
  const {
    layout: { step }, layout, data,
  } = getState().volantisMyData._mydataCreate

  if (step === 1) {
    dispatch(setData({
      data: {
        ...data,
        step1: {},
      },
    }))

    dispatch(resetFiles())
  }

  dispatch(setLayout({
    layout: {
      ...layout, step: step - 1, allowNext: true, isBack: true,
    },
  }))
}

export const setBackStep = () => (dispatch, getState) => {
  const {
    layout: { step }, layout,
  } = getState().volantisMyData._mydataCreate

  dispatch(setLayout({
    layout: {
      ...layout, step: step - 1, allowNext: true, isBack: true,
    },
  }))
}

export const setNextStep = (tableName = []) => (dispatch, getState) => {
  const {
    layout: { step }, rules, data: { step0 }, data, type, layout,
  } = getState().volantisMyData._mydataCreate
  // const { layout: { step }, rules, data: { step0 }, data } = this.state
  // let nowError = false
  const newRules = [...rules]
  const newLayout = { ...layout, step: step + 1, allowNext: false }
  const newData = { ...data }
  const nextFieldProps = {} // buat get form field berikutnya

  if (step === 0 && type === CREATE_TYPE.sql) {
    nextFieldProps.type = `${step0.dbType}`.toLowerCase()
  } else if (step === 0 && type === CREATE_TYPE.device) {
    // taredit
    // nanti dulu
    // await this.getSensorProperties()
    newData.step0.deviceType = CREATE_TYPE.sensor
  } else if (step === 1) {
    // if (type === CREATE_TYPE.device) {
    // await this.handleCreateSensor()
    // const { createConnector: { createSensorState  } } = this.props

    // if (createSensorState === stateStatus.failed) nowError = true
    // }
    newData.step1.tableName = tableName
    newLayout.allowNext = true
  }
  if (!!newRules && !!newRules[newLayout.step]) newRules[newLayout.step].touched = {}
  if (newData[`step${newLayout.step}`]) {
    newData[`step${newLayout.step}`] = {}

    // const required = newRules[newLayout.step] ? newRules[newLayout.step].required : []
    // newLayout.allowNext = !checkRequired(newData[`step${newLayout.step}`], required || [])
  }

  if (step === 0 && type === CREATE_TYPE.file) {
    const isCsv = step0.fileType === 'CSV'
    nextFieldProps.isLocal = !!step0.uploadType && step0.uploadType === 'local'
    nextFieldProps.isCsv = isCsv

    if (isCsv) {
      newData.step1 = {
        delimiter: ',',
        encoding: 'utf8',
        quoteCharacter: '\'',
        escapeCharacter: '/',
      }
    }
  }

  dispatch(setRulePerStep({ step: step + 1, type, props: nextFieldProps }))
  dispatch(setData({ data: newData }))
  dispatch(setLayout({ layout: { ...newLayout, allowNext: false, isBack: false } }))
}
export const setInput = ({
  key, value, replacer = '', valueReplacer = '',
}) => (dispatch, getState) => {
  const {
    layout: { step }, data, rules, layout,
  } = getState().volantisMyData._mydataCreate

  const currentData = {
    ...data[`step${step}`] || {},
    [key]: replacer === '' ? value : inputReplacer({ replacer, value, valueReplacer }),
  }

  const currentRules = [...rules]
  currentRules[step].touched = { ...currentRules[step].touched || {}, [key]: true }
  const isValid = !checkRequired({ fields: currentData, required: currentRules[step].required })

  dispatch(setLayout({ layout: { ...layout, allowNext: isValid } }))
  dispatch(setRules({ rules: currentRules }))
  dispatch(setData({ data: { ...data, [`step${step}`]: currentData } }))
}

export const setType = ({ type = 'default' }) => dispatch => {
  const fileType = {
    layout: {
      progressIndicatorText: [],
      allowNext: true,
      step: 0,
      isBack: false,
      buttonText: BUTTON_ADD[CREATE_TYPE.file],
      hideStep: true,
    },
    maxStep: 0,
    title: 'New File',
  }

  const data = {
    [CREATE_TYPE.sql]: {
      layout: {
        progressIndicatorText: ['Choose database type', 'Configuration', 'Synchronization'],
        allowNext: false,
        step: 0,
        isBack: false,
        buttonText: BUTTON_ADD[CREATE_TYPE.sql],
      },
      maxStep: 2,
      title: 'New Database',
    },
    [CREATE_TYPE.device]: {
      layout: {
        progressIndicatorText: ['Choose device type', 'Choose device detail', 'Get token'],
        allowNext: true,
        step: 0,
        isBack: false,
        buttonText: BUTTON_ADD[CREATE_TYPE.device],
      },
      maxStep: 2,
      title: 'New IoT Device',
    },
    [CREATE_TYPE.fileUrl]: { ...fileType },
    [CREATE_TYPE.fileLocal]: { ...fileType },
    default: {
      layout: {
        progressIndicatorText: [],
        allowNext: false,
        step: 0,
        isBack: false,
        buttonText: '',
      },
      maxStep: 0,
    },
  }

  const payload = {
    type,
    ...(data[type] || data.default),
  }
  dispatch(setCreateTypeReducer(payload))
  dispatch(setRulePerStep({ step: 0, type, props: { type } }))
}

export const setFileProperty = () => dispatch => {
  const UUID = uuidv4()
  dispatch(setInput({ key: 'filePath', value: `/user_files/${UUID}` }))
}

export const postUpload = ({ files, authCookie, uploadUrl = '' }) => (dispatch, getState) => {
  const { type, data } = getState().volantisMyData._mydataCreate
  const { cookie: { user: userInfoName } } = getState().volantisConstant
  const UUID = uuidv4()
  const headers = setHeaders({ data, userInfoName, type })

  const accessToken = getCookie({ cookieName: authCookie })
  const tusUploader = new tus.Upload(files[0], {
    canStoreURLs: false,
    resume: false,
    endpoint: uploadUrl,
    chunkSize: 5 * 1024 * 1024,
    // retryDelays: [0, 1000, 3000, 5000], // multiple post request
    headers: {
      'V-DRIVEID': headers.driveId,
      'V-CREATORNAME': headers.creatorName,
      'V-CREATORID': headers.creatorId,
      'V-PARENTID': headers.parentId,
      'V-PATH': headers.path,
      'V-NAME': headers.name,
      'V-UUID': UUID,
      access_token: accessToken,
    },
    metadata: {
      filename: files[0].name,
      filetype: files[0].type,
    },
    onError: () => {
      dispatch(setFileUploading({ status: 'FAILED' }))
      dispatch(setModalErrorUpload())
    },
    onProgress: (bytesUploaded, bytesTotal) => {
      const currPercentage = Number((bytesUploaded / bytesTotal * 100).toFixed(2))
      dispatch(setFileUploading({ status: 'UPLOADING', currPercentage }))
    },
    onSuccess: () => {
      dispatch(setFileUploading({ status: 'SUCCESS' }))
    },
  })

  // Start the upload
  tusUploader.start()
}

export const linkToMyDataRoot = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisConstant: { routes: { myData: { root: myDataRoot } } },
  } = getState()

  const prev = isWindowExist && window.localStorage.getItem('MYDATA.prev')
  const jPrev = prev ? JSON.parse(prev) : { decodedData: {} }

  const qs = {
    locationType: LOCATIONS.ROOT,
    ...jPrev.decodedData,
    orderType: 'DESC',
    orderName: 'updatedAt',
  }

  linkTo(`${myDataRoot}?q=${extendedData('encode', qs)}`)
}
