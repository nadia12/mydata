import {
  PUT_APP_REQUEST,
  PUT_APP_SUCCESS,
  PUT_APP_ERROR,
  GET_PREVIEW_DATASET_REQUEST,
  GET_PREVIEW_DATASET_SUCCESS,
  GET_PREVIEW_DATASET_ERROR,
  GET_APP_DETAIL_REQUEST,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
  SET_FIELDS,
  SET_RULES,
  SET_FIELDS_ERROR,
  SET_OPT_FIELDS,
  SET_IS_VALID
} from './action-type'
import Method from '../../../../config/constants/request-method'
import Hostname from '../../../../config/constants/hostname'
import inputReplacer from '../../../../helpers/input-replacer'
import checkRequired from '../../../../helpers/input-check-required'
import { getErrorMessage, } from './constant'
import { setShowModal, } from '../../function'

export const getAppDetail = ({ id = '' }) => (dispatch, getState) => {
  const { authCookie } = getState()._apiManagementGlobal
  return dispatch({
    type: [
      GET_APP_DETAIL_REQUEST,
      GET_APP_DETAIL_SUCCESS,
      GET_APP_DETAIL_ERROR
    ],
    shuttle: {
      path: `/v1/app/${id}`,
      method: Method.get
    },
    endpoint: Hostname.apiManagement,
    authCookie
  })
}

export const getPreview = ({ datasetId = '' }) => (dispatch, getState) => {
  const { authCookie } = getState()._apiManagementGlobal

  return dispatch({
    type: [
      GET_PREVIEW_DATASET_REQUEST,
      GET_PREVIEW_DATASET_SUCCESS,
      GET_PREVIEW_DATASET_ERROR,
    ],
    shuttle: {
      path: `/v1/app/${id}`,
      method: Method.get
    },
    endpoint: Hostname.apiManagement,
    authCookie
  })
}

export const putApp = () => (dispatch, getState) => {
  const {
    _apiManagementOverview: { fields },
    _apiManagementGlobal: { authCookie },
  } = getState()


  const { id, ...data } = fields
  return dispatch({
    type: [
      PUT_APP_REQUEST,
      PUT_APP_SUCCESS,
      PUT_APP_ERROR
    ],
    shuttle: {
      path: `/v1/app/${id || ''}`,
      method: Method.put,
      payloads: data
    },
    endpoint: Hostname.apiManagement,
    authCookie
  })
}

export const setRules = (rules) => ({
  type: SET_RULES,
  payload: rules
})

export const setIsValid = (isValid) => ({
  type: SET_IS_VALID,
  payload: isValid
})

export const setFieldsError = (fieldsError) => ({
  type: SET_FIELDS_ERROR,
  payload: fieldsError
})

export const setFields = (fields) => ({
  type: SET_FIELDS,
  payload: fields
})

export const setInput = ({ key, value, replacer = '', valueReplacer = '' }) => (dispatch, getState) => {
  const { fields, rules } = getState()._apiManagementOverview
  const currentData = { ...fields, [key]: replacer === '' ? value : inputReplacer({ replacer, value, valueReplacer }) }
  const currentRules = {
    ...rules,
    touched: { ...rules.touched, [key]: true }
  }
  const { isValid, errMessage } = getErrorMessage({ fields: currentData, rules: currentRules })
  dispatch(setFields(currentData))
  dispatch(setRules(currentRules))
  dispatch(setFieldsError(errMessage))
  dispatch(setIsValid(isValid))
}

export const setToggle = ({ key = '' }) => (dispatch, getState) => {
  const { fields } = getState()._apiManagementOverview
  if (key === 'isEnabled' && fields[key]) {
    dispatch(setShowModal({ key }))
  } else {
    dispatch(setFields({ ...fields, [key]: !fields[key] }))
  }
}