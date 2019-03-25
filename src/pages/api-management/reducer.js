import { createReducer } from '../../redux/initializer'

import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
  SET_AUTH_COOKIE,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  datasets: [],
  authCookie: 'SID_IQ',
}

export default createReducer(initialState, {
  [GET_DATASET_REQUEST]: state => ({
    ...state,
    isLoading: true,
    datasets: []
  }),
  [GET_DATASET_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    datasets: payload
  }),
  [GET_DATASET_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch dataset'
  }),
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload
  }),
})

