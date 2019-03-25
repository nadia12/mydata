import { createReducer } from '../../../../redux/initializer'

import {
  GET_APP_LIST_REQUEST,
  GET_APP_LIST_SUCCESS,
  GET_APP_LIST_ERROR,
  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,
  SET_SELECTED_APP,
  SET_SEARCH,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  apps: [],
  selectedApp: '',
  search: ''
}

export default createReducer(initialState, {
  [SET_SEARCH]: (state, payload) => ({
    ...state,
    search: payload
  }),
  [SET_SELECTED_APP]: (state, payload) => ({
    ...state,
    selectedApp: payload
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