import moment from 'moment'
import uuidv4 from 'uuid/v4'
import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import {
  createMappingConfig,
} from 'Helpers/create-connector'
import { getCookie } from 'Helpers/get-cookie'
import {
  LOCATIONS,
} from 'Config/constants'

import {
  CREATE_TYPE,
  BUTTON_ADD,
} from './constant'

import {
  getFormDevice,
  getFormFile,
  getFormSql,
  getFormMedia,
} from './helper'

import {
  setUserInfo,
  setAuthCookie,
  setRules,
  setData,
  setFiles,
  resetFiles,
  setModalErrorCreate,
  setLayout,
  setCreateType as setCreateTypeReducer,
  setFileChange as setFileChangeReducer,
  setFileUploading as setFileUploadingReducer,
  postDataSource as postDataSourceReducer,
} from './reducer'

const tus = require('tus-js-client')

export {
  setUserInfo,
  setAuthCookie,
  setRules,
  setData,
  setFiles,
  resetFiles,
  setModalErrorCreate,
  setLayout,
}

export const setFileChange = ({ status, showTableUpload = false }) => (dispatch, getState) => {
  const { filesData } = getState()._mydataCreate
  const payload = {
    ...filesData,
    status: status || filesData.status,
    showTableUpload,
  }

  dispatch(setFileChangeReducer(payload))
}

export const setFileUploading = ({ currPercentage = 0 }) => (dispatch, getState) => {
  const { filesData } = getState()._mydataCreate

  const { percentage } = filesData
  const newPercentage = percentage < currPercentage ? currPercentage : percentage
  const payload = {
    ...filesData,
    percentage: newPercentage,
    status: 'UPLOADING',
    lastUpdate: moment(),
  }

  dispatch(setFileUploadingReducer(payload))
}

export const setFileSuccess = ({ UUID }) => (dispatch, getState) => {
  const {
    data,
    data: {
      step0,
    },
    filesData: {
      size,
    },
  } = getState()._mydataCreate
  const payload = {
    ...data,
    step0: {
      ...step0,
      fileSize: size,
      UUID,
    },
  }

  dispatch(setData({ data: payload }))
  dispatch(setFileChange({ status: 'success', showTableUpload: true }))
}

export const postDatasource = (cb = () => {}) => (dispatch, getState) => {
  const {
    authCookie,
    userInfo: userInfoName,
    data,
    type,
  } = getState()._mydataCreate

  const userInfo = getCookie({ cookieName: userInfoName })
  const req = createMappingConfig({ ...data, type })
  const location = window.localStorage.getItem('MYDATA.location') || ''
  const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb')
  const jBreadcrumb = !!breadcrumb && `${breadcrumb}`.trim() !== ''
    ? JSON.parse(breadcrumb)
    : []

  const currBreadcrumb = jBreadcrumb.pop() || {}
  const locationExist = `${location}`.trim() !== ''
  const { id } = req
  let vName = ''

  if (type === CREATE_TYPE.sql) {
    vName = data.step1.datasetName
  }

  const headers = {
    'V-DRIVEID': userInfo.owner_id,
    'V-CREATORNAME': userInfo.name,
    'V-CREATORID': userInfo.id,
    'V-PARENTID': locationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
    'V-PATH': currBreadcrumb.path || '',
    'V-NAME': vName,
  }
  const path = `/v2/connector/${id}`
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
  } = getState()._mydataCreate
  const newRules = [...rules]
  if (type === CREATE_TYPE.media) newRules[step] = getFormMedia[`step${step}`] ? getFormMedia[`step${step}`](props) : []
  if (type === CREATE_TYPE.sql) newRules[step] = getFormSql[`step${step}`] ? getFormSql[`step${step}`](props) : []
  if (type === CREATE_TYPE.file) newRules[step] = getFormFile[`step${step}`] ? getFormFile[`step${step}`](props) : []
  if (type === CREATE_TYPE.device) newRules[step] = getFormDevice[`step${step}`] ? getFormDevice[`step${step}`](props) : []
  dispatch(setRules({ rules: newRules }))
}

export const setBackStepTypeFile = () => (dispatch, getState) => {
  const {
    layout: { step }, layout, data,
  } = getState()._mydataCreate

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
  } = getState()._mydataCreate

  dispatch(setLayout({
    layout: {
      ...layout, step: step - 1, allowNext: true, isBack: true,
    },
  }))
}

export const setNextStep = () => (dispatch, getState) => {
  const {
    layout: { step }, rules, data: { step0 }, data, type, layout,
  } = getState()._mydataCreate

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
  } else if (step === 0 && type === CREATE_TYPE.file) {
    const isCsv = step0.fileType === 'CSV'
    nextFieldProps.isLocal = step0.uploadType === 'local'
    nextFieldProps.isCsv = isCsv

    if (isCsv) {
      newData.step1 = {
        delimiter: ',',
        encoding: 'utf8',
        quoteCharacter: '\'',
        escapeCharacter: '/',
      }
    }
  } else if (step === 1) {
    // if (type === CREATE_TYPE.device) {
    // await this.handleCreateSensor()
    // const { createConnector: { createSensorState  } } = this.props

    // if (createSensorState === stateStatus.failed) nowError = true
    // }
    newLayout.allowNext = true
  }

  if (newData[`step${newLayout.step}`]) {
    const required = newRules[newLayout.step] ? newRules[newLayout.step].required : []
    newLayout.allowNext = !checkRequired(newData[`step${newLayout.step}`], required || [])
  }
  dispatch(setLayout({ layout: { ...newLayout, allowNext: false, isBack: false } }))
  dispatch(setData({ data: newData }))
  dispatch(setRulePerStep({ step: step + 1, type, props: nextFieldProps }))
  // window.document.getElementById('child-scroll').scrollTop = 0
}
export const setInput = ({
  key, value, replacer = '', valueReplacer = '',
}) => (dispatch, getState) => {
  const {
    _mydataCreate: {
      layout: { step }, data, rules, layout,
    },
  } = getState()

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
    [CREATE_TYPE.file]: {
      layout: {
        progressIndicatorText: ['Choose File', 'Upload File'],
        allowNext: false,
        step: 0,
        isBack: false,
        buttonText: BUTTON_ADD[CREATE_TYPE.file],
      },
      maxStep: 1,
      title: 'New File',
    },
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

export const postUpload = ({ files }) => (dispatch, getState) => {
  const {
    authCookie,
    userInfo: userInfoName,
    data,
  } = getState()._mydataCreate

  const UUID = uuidv4()
  const userInfo = getCookie({ cookieName: userInfoName })
  const accessToken = getCookie({ cookieName: authCookie })

  const location = window.localStorage.getItem('MYDATA.location') || ''
  const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb')
  const jBreadcrumb = !!breadcrumb && `${breadcrumb}`.trim() !== ''
    ? JSON.parse(breadcrumb)
    : []
  const currBreadcrumb = jBreadcrumb.pop() || {}
  const locationExist = `${location}`.trim() !== ''

  const headers = {
    'V-DRIVEID': userInfo.owner_id,
    'V-CREATORNAME': userInfo.name,
    'V-CREATORID': userInfo.id,
    'V-PARENTID': locationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
    'V-PATH': currBreadcrumb.path || '',
    'V-NAME': data.step1.fileName || '',
  }

  const tusUploader = new tus.Upload(files[0], {
    canStoreURLs: false,
    resume: false,
    endpoint: 'http://staging-iq-app.volantis.io:18000/file/',
    chunkSize: 5 * 1024 * 1024,
    retryDelays: [0, 1000, 3000, 5000],
    headers: {
      ...headers,
      access_token: accessToken,
      'Owner-Id': userInfo.owner_id,
      UUID,
    },
    metadata: {
      filename: files[0].name,
      filetype: files[0].type,
    },
    onError: () => dispatch(setFileChange({ status: 'FAILED' })),
    onProgress: (bytesUploaded, bytesTotal) => {
      const currPercentage = Number((bytesUploaded / bytesTotal * 100).toFixed(2))
      dispatch(setFileUploading({ currPercentage }))
    },
    onSuccess: async () => {
      dispatch(setInput({ key: 'filePath', value: UUID }))
      dispatch(setInput({ key: 'fileType', value: files[0].type }))
      dispatch(setFileSuccess({ UUID }))
    },
  })

  // Start the upload
  tusUploader.start()
  dispatch(setFileChange({ showTableUpload: true }))
}
