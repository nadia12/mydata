import { createReducer } from '../../../../redux/initializer'

import {
  GET_APP_LIST_REQUEST,
  GET_APP_LIST_SUCCESS,
  GET_APP_LIST_ERROR,
  GET_APP_DETAIL_REQUEST,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,
  SET_SELECTED_APP,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  apps: [],
  detail: {},
  selectedApp: ''
}

export default createReducer(initialState, {
  [SET_SELECTED_APP]: (state, payload) => ({
    ...state,
    selectedApp: payload
  }),
  [GET_APP_DETAIL_REQUEST]: state => ({
    ...state,
    isLoading: true,
    detail: {}
  }),
  [GET_APP_DETAIL_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    detail: payload
  }),
  [GET_APP_DETAIL_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch detail'
  }),
  [GET_APP_LIST_REQUEST]: state => ({
    ...state,
    isLoading: true,
    apps: []
  }),
  [GET_APP_LIST_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    apps: payload
  }),
  [GET_APP_LIST_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
  [GET_FILTERED_APP_LIST_REQUEST]: state => ({
    ...state,
    isLoading: true,
    apps: []
  }),
  [GET_FILTERED_APP_LIST_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    apps: payload
  }),
  [GET_FILTERED_APP_LIST_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  })
})