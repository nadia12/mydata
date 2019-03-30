import { createReducer } from 'Redux/initializer'
import { SET_FILES } from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: 'file',
  layout: '',
  data: {
    step0: {}, step1: {}, step2: [], step3: {}
  },
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {
    errorModal: false
  },
  files: { status: 0, file: '' }
}

export default createReducer(initialState, {
  [SET_FILES]: (state, payload) => ({
    ...state,
    ...payload
  })
})