import { createReducer } from '../../redux/initializer'

import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
  SET_AUTH_COOKIE,
  SET_SHOW_MODAL,
} from './action-type'

import {
  DEFAULT_MODAL, CONFIRMATION_CONTENT
} from './constant'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  datasets: [],
  authCookie: 'SID_IQ',
  showModal: { ...DEFAULT_MODAL },
  modalData: { ...CONFIRMATION_CONTENT.default }
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
  [SET_SHOW_MODAL]: (state, payload) => {
    const modal = !state.showModal[payload]
    const modalData = !modal ?  { ...CONFIRMATION_CONTENT.default } : { ...CONFIRMATION_CONTENT[payload ]}
    
    return {
      ...state,
      showModal: {
        ...state.showModal,
        [payload]: modal
      },
      modalData
    }
  },
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload
  }),
})

