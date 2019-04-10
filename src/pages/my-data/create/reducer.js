import {
  createReducer,
} from 'Redux/initializer'
import {
  SET_AUTH_COOKIE,
  SET_USER_INFO,
  SET_MODAL_CONFIRMATION,
  SET_CREATE_TYPE,
  SET_FILES,
  RESET_FILES,
  SET_FILE_CHANGE,
  SET_RULES,
  SET_LAYOUT,
  SET_DATA,
  POST_CREATECONNECTOR_REQUEST,
  POST_CREATECONNECTOR_SUCCESS,
  POST_CREATECONNECTOR_ERROR,
} from 'Pages/my-data/create/action-type'
import METHOD from 'Config/constants/request-method'
import HOSTNAME from 'Config/constants/hostname'
import {
  CONFIRMATION_CONTENT,
  CREATE_CONNECTOR,
} from './constant'

const initialState = {
  userInfo: '',
  authCookie: '',
  loadingText: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: 'default',
  hideStep: false,
  layout: { allowNext: false, step: 0, isBack: false },
  data: {
    step0: {},
    step1: {},
    step2: {},
    mapping: [],
  },
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {
    errorModal: false,
  },
  files: [],
  filesData: {
    status: '',
    percentage: 0,
    size: 0,
    file: '',
    showTableUpload: false,
  },
  name: '',
  headers: {},
  createConnector: { ...CREATE_CONNECTOR },
  modalData: {},
  showModalConfirmation: false,
  fieldsError: {},
}

export default createReducer(initialState, {
  [SET_MODAL_CONFIRMATION]: (state, payload) => ({
    ...state,
    modalData: { ...(CONFIRMATION_CONTENT[payload] || CONFIRMATION_CONTENT.default) },
    showModalConfirmation: !state.showModalConfirmation,
  }),
  [POST_CREATECONNECTOR_REQUEST]: state => ({
    ...state,
    isLoading: true,
    tableList: [],
    loadingText: 'Checking your configuration',
  }),
  [POST_CREATECONNECTOR_SUCCESS]: state => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {},
    loadingText: '',
  }),
  [POST_CREATECONNECTOR_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to create sample',
    loadingText: '',
  }),
  [SET_LAYOUT]: (state, payload) => ({
    ...state,
    layout: payload,
  }),
  [SET_CREATE_TYPE]: (state, payload) => ({
    ...state,
    ...payload,
  }),
  [SET_USER_INFO]: (state, payload) => ({
    ...state,
    userInfo: payload,
  }),
  [SET_FILES]: (state, payload) => ({
    ...state,
    files: payload,
  }),
  [RESET_FILES]: (state, payload) => ({
    ...state,
    ...payload,
  }),
  [SET_FILE_CHANGE]: (state, payload) => ({
    ...state,
    isBack: false,
    filesData: payload,
  }),
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload,
  }),
  [SET_RULES]: (state, payload) => ({
    ...state,
    rules: payload,
  }),
  [SET_DATA]: (state, payload) => ({
    ...state,
    data: payload,
  }),
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload,
  }),
})

export const setUserInfo = ({ userInfo = '' }) => ({
  type: SET_USER_INFO,
  payload: userInfo,
})

export const setAuthCookie = ({ authCookie = '' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export const setRules = ({ rules = {} }) => ({
  type: SET_RULES,
  payload: rules,
})

export const setData = ({ data }) => ({
  type: SET_DATA,
  payload: data,
})

export const setFiles = ({ accepted }) => ({
  type: SET_FILES,
  payload: accepted,
})

export const resetFiles = () => ({
  type: RESET_FILES,
  payload: {
    files: [],
    filesData: {
      status: '',
      percentage: 0,
      size: 0,
      file: '',
      showTableUpload: false,
    },
  },
})

export const setFileChange = payload => ({
  type: SET_FILE_CHANGE,
  payload,
})

export const setFileUploading = payload => ({
  type: SET_FILE_CHANGE,
  payload,
})

export const setModalErrorCreate = () => ({
  type: SET_MODAL_CONFIRMATION,
  payload: 'failedSaveData',
})

export const setLayout = ({ layout }) => ({
  type: SET_LAYOUT,
  payload: layout,
})

export const setCreateType = payload => ({
  type: SET_CREATE_TYPE,
  payload,
})

export const postDataSource = ({
  headers,
  payloads,
  authCookie,
  path,
  cb,
}) => ({
  type: [
    POST_CREATECONNECTOR_REQUEST,
    POST_CREATECONNECTOR_SUCCESS,
    POST_CREATECONNECTOR_ERROR,
  ],
  shuttle: {
    path,
    method: METHOD.post,
    payloads,
    headers,
  },
  endpoint: HOSTNAME.root,
  authCookie,
  nextAction: (res, err) => cb(res, err),
})
