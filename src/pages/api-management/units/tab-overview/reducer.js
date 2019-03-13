import { createReducer } from '../../../../redux/initializer'

import {
  PUT_APP_REQUEST,
  PUT_APP_SUCCESS,
  PUT_APP_ERROR,
  GET_PREVIEW_DATASET_REQUEST,
  GET_PREVIEW_DATASET_SUCCESS,
  GET_PREVIEW_DATASET_ERROR,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  preview: {},
  datasets: []
}

export default createReducer(initialState, {
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