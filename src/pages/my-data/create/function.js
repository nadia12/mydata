import inputReplacer from 'Helpers/input-replacer'
import checkRequired from 'Helpers/input-check-required'
import {
  createMappingConfig
} from 'Helpers/create-connector'

import { getCookie } from 'Helpers/get-cookie'

import METHOD from 'Config/constants/request-method'
import HOSTNAME from 'Config/constants/hostname'
import {
  LOCATIONS
} from 'Config/constants'

import {
  SET_CREATE_TYPE,
  SET_USER_INFO,
  SET_AUTH_COOKIE,
  SET_LAYOUT,
  SET_RULES,
  SET_MODAL_CONFIRMATION,
  SET_DATA,
  POST_CREATECONNECTOR_REQUEST,
  POST_CREATECONNECTOR_SUCCESS,
  POST_CREATECONNECTOR_ERROR
} from './action-type'

import {
  CREATE_TYPE,
  BUTTON_ADD
} from './constant'

import {
  getFormDevice,
  getFormFile,
  getFormSql,
  getFormMedia
} from './helper'

export const setUserInfo = ({ userInfo = '' }) => ({
  type: SET_USER_INFO,
  payload: userInfo
})

export const setAuthCookie = ({ authCookie = '' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie
})

export const setRules = ({ rules = {} }) => ({
  type: SET_RULES,
  payload: rules
})

export const setData = ({ data }) => ({
  type: SET_DATA,
  payload: data
})

export const setModalErrorCreate = () => ({
  type: SET_MODAL_CONFIRMATION,
  payload: 'failedSaveData'
})

export const postDatasource = (cb = () => {}) => (dispatch, getState) => {
  const {
    authCookie,
    userInfo: userInfoName,
    data,
    type
  } = getState()._mydataCreate

  const userInfo = getCookie({ cookieName: userInfoName })

  const req = createMappingConfig({ ...data, type, PK: [] })
  const location = window.localStorage.getItem('MYDATA.location') || ''
  const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb')
  const jBreadcrumb = !!breadcrumb && `${breadcrumb}`.trim() !== ''
    ? JSON.parse(breadcrumb)
    : []
  const currBreadcrumb = jBreadcrumb.pop() || {}
  const locationExist = `${location}`.trim() !== ''
  const { connectorId } = req
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
    'V-NAME': vName
  }

  return dispatch({
    type: [
      POST_CREATECONNECTOR_REQUEST,
      POST_CREATECONNECTOR_SUCCESS,
      POST_CREATECONNECTOR_ERROR
    ],
    shuttle: {
      path: `/v2/connector/${connectorId}`,
      method: METHOD.post,
      payloads: req,
      headers
    },
    endpoint: HOSTNAME.root,
    authCookie,
    nextAction: (res, err) => cb(res, err)
  })
}

export const setRulePerStep = ({ step, type, props = {} }) => (dispatch, getState) => {
  const {
    rules
  } = getState()._mydataCreate
  const newRules = [...rules]
  if (type === CREATE_TYPE.media) newRules[step] = getFormMedia[`step${step}`] ? getFormMedia[`step${step}`](props) : []
  if (type === CREATE_TYPE.sql) newRules[step] = getFormSql[`step${step}`] ? getFormSql[`step${step}`](props) : []
  if (type === CREATE_TYPE.file) newRules[step] = getFormFile[`step${step}`] ? getFormFile[`step${step}`](props) : []
  if (type === CREATE_TYPE.device) newRules[step] = getFormDevice[`step${step}`] ? getFormDevice[`step${step}`](props) : []
  dispatch(setRules({ rules: newRules }))
}

export const setLayout = ({ layout }) => ({
  type: SET_LAYOUT,
  payload: layout
})

export const setBackStep = () => (dispatch, getState) => {
  const {
    layout: { step }, layout
  } = getState()._mydataCreate

  dispatch(setLayout({
    layout: {
      ...layout, step: step - 1, allowNext: true, isBack: true
    }
  }))
}

export const setNextStep = () => (dispatch, getState) => {
  const {
    layout: { step }, rules, data: { step0 }, data, type, layout
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
        escapeCharacter: '/'
      }
    }
  } else if (step === 1) {
    if (type === CREATE_TYPE.sql) {
      // const datasourceConfig = createDataSourceConfig({ type, ...newData })
      // dispatch(postSampleTable({ datasourceConfig }))
    } else if (type === CREATE_TYPE.file) {
      // await this.getSampleData({ req: createDataSourceConfig({ type: type, ...newData }) })
      // const { createConnector: { getSampleDataConnectorState } } = this.props

      // if (getSampleDataConnectorState === stateStatus.failed) nowError = true
    } else if (type === CREATE_TYPE.device) {
      // await this.handleCreateSensor()
      // const { createConnector: { createSensorState  } } = this.props

      // if (createSensorState === stateStatus.failed) nowError = true
    }
    newLayout.allowNext = true
  }

  if (newData[`step${newLayout.step}`]) {
    const required = newRules[newLayout.step] ? newRules[newLayout.step].required : []
    newLayout.allowNext = !checkRequired(newData[`step${newLayout.step}`], required || [])
  }
  // if (!nowError) {
  dispatch(setLayout({ layout: { ...newLayout, allowNext: false } }))
  dispatch(setData({ data: newData }))
  dispatch(setRulePerStep({ step: step + 1, type, props: nextFieldProps }))
  // }
  // window.document.getElementById('child-scroll').scrollTop = 0
}
export const setInput = ({
  key, value, replacer = '', valueReplacer = ''
}) => (dispatch, getState) => {
  const {
    _mydataCreate: {
      layout: { step }, data, rules, layout
    }
  } = getState()

  const currentData = {
    ...data[`step${step}`] || {},
    [key]: replacer === '' ? value : inputReplacer({ replacer, value, valueReplacer })
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
        buttonText: BUTTON_ADD[CREATE_TYPE.sql]
      },
      maxStep: 2,
      title: 'New Database'
    },
    [CREATE_TYPE.device]: {
      layout: {
        progressIndicatorText: ['Choose device type', 'Choose device detail', 'Get token'],
        allowNext: true,
        step: 0,
        isBack: false,
        buttonText: BUTTON_ADD[CREATE_TYPE.sql]
      },
      maxStep: 2,
      title: 'New IoT Device'
    },
    [CREATE_TYPE.file]: {
      layout: {
        progressIndicatorText: ['Choose File', 'Upload File'],
        allowNext: false,
        step: 0,
        isBack: false,
        buttonText: BUTTON_ADD[CREATE_TYPE.sql]
      },
      maxStep: 1,
      title: 'New File'
    },
    default: {
      layout: {
        progressIndicatorText: [],
        allowNext: false,
        step: 0,
        isBack: false,
        buttonText: ''
      },
      maxStep: 0
    }
  }

  dispatch({
    type: SET_CREATE_TYPE,
    payload: {
      type,
      ...(data[type] || data.default)
    }
  })

  dispatch(setRulePerStep({ step: 0, type, props: { type } }))
}

