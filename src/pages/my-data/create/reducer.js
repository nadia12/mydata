import { createReducer } from 'Redux/initializer'
import { createConnector } from './constant'
import {
  SET_FILES,
  POST_SENSOR_REQUEST,
  POST_SENSOR_SUCCESS,
  POST_SENSOR_ERROR,
} from './action-type'
import { DEFAULT_STATE } from './constant'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: 'file',
  layout: { allowNext: false, step: 0, isBack: false },
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
  files: { status: 0, file: '' },
  name: '',
  headers: {},
  createConnector: { ...createConnector }
}

export default createReducer(initialState, {
  [SET_FILES]: (state, payload) => ({
    ...state,
    ...payload,
    layout: { allowNext: state.type === CREATE_TYPE.device, step: 0, isBack: false },
  }),
})