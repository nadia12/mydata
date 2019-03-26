// 
import { createReducer } from '../../../../redux/initializer'

import {
  PUT_APP_REQUEST,
  PUT_APP_SUCCESS,
  PUT_APP_ERROR,
  GET_PREVIEW_DATASET_REQUEST,
  GET_PREVIEW_DATASET_SUCCESS,
  GET_PREVIEW_DATASET_ERROR,
  SET_FIELDS,
  SET_RULES,
  SET_FIELDS_ERROR,
  SET_OPT_FIELDS,
  SET_IS_VALID,
  GET_APP_DETAIL_REQUEST,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
} from './action-type'

import {
  DEFAULT_FIELDS, // untuk fields
  DEFAULT_OPT_FIELDS, // untuk select options
  getRuleFields,
  DEFAULT_RULES,
} from './constant'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  preview: {},
  datasets: [],
  detail: {},
  fields: { ...DEFAULT_FIELDS },
  rules: { ...DEFAULT_RULES },
  isValid: true,
  optFields: { ...DEFAULT_OPT_FIELDS },
  fieldsError: []
}

export default createReducer(initialState, {
  [SET_IS_VALID]: (state, payload) => ({
    ...state,
    isValid: payload
  }),
  [SET_FIELDS_ERROR]: (state, payload) => ({
    ...state,
    fieldsError: payload
  }),
  [SET_RULES]: (state, payload) => ({
    ...state,
    rules: payload
  }),
  [SET_FIELDS]: (state, payload) => ({
    ...state,
    fields: payload
  }),
  [GET_APP_DETAIL_REQUEST]: state => ({
    ...state,
    isLoading: true,
    fields: { ...DEFAULT_FIELDS }
  }),
  [GET_APP_DETAIL_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    fields: payload,
    errorMessage: ''
  }),
  [GET_APP_DETAIL_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch detail'
  }),
  [GET_PREVIEW_DATASET_REQUEST]: state => ({
    ...state,
    isLoading: true,
    preview: {}
  }),
  [GET_PREVIEW_DATASET_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    preview: payload
  }),
  [GET_PREVIEW_DATASET_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch detail'
  }),
  [PUT_APP_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [PUT_APP_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: ''
  }),
  [PUT_APP_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
})