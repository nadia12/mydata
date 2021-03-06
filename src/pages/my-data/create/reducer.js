import {
  createReducer,
} from 'Redux/initializer'
import {
  RESET_FIELDS,
  SET_MODAL_CONFIRMATION,
  SET_CREATE_TYPE,
  SET_FILES,
  RESET_FILES,
  SET_FILE_CHANGE,
  SET_RULES,
  SET_LAYOUT,
  SET_DATA,
  POST_CREATE_CONNECTOR_REQUEST,
  POST_CREATE_CONNECTOR_SUCCESS,
  POST_CREATE_CONNECTOR_ERROR,
  POST_CHECK_SQL_CREDENTIAL_REQUEST,
  POST_CHECK_SQL_CREDENTIAL_SUCCESS,
  POST_CHECK_SQL_CREDENTIAL_ERROR,
  SET_TOAST_CLOSE,
  SET_TOAST_OPEN,
  SET_TUS_CONFIGURATION,
  SET_TABLE_LIST,
  GET_TABLE_LIST_REQUEST,
  GET_TABLE_LIST_SUCCESS,
  GET_TABLE_LIST_ERROR,
} from 'Pages/my-data/create/action-type'
import METHOD from 'Config/constants/request-method'
import {
  CONFIRMATION_CONTENT,
  CREATE_CONNECTOR,
} from './constant'

const initialState = {
  loadingText: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: 'default',
  hideStep: false,
  layout: {
    // allowNext: false, step: 0, isBack: false, hideStep: false,
  },
  data: {
    step0: {},
    step1: {},
    step2: {},
    step3: {},
  },
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {
    errorModal: false,
    errorToast: false,
  },
  files: [],
  filesData: {
    status: '',
    percentage: 0,
    size: 0,
    file: '',
    showTableUpload: false,
    isUpload: false,
  },
  name: '',
  headers: {},
  createConnector: { ...CREATE_CONNECTOR },
  modalData: {},
  showModalConfirmation: false,
  fieldsError: {},
  tusConfiguration: {},
  tableList: [],
}

export default createReducer(initialState, {
  [SET_TUS_CONFIGURATION]: (state, payload) => ({
    ...state,
    tusConfiguration: payload,
  }),
  [SET_TOAST_OPEN]: (state, payload) => ({
    ...state,
    show: {
      ...state.show,
      errorToast: true,
    },
    errorMessage: payload.message || 'Service cannot be reached. Please try again',
  }),
  [SET_TOAST_CLOSE]: state => ({
    ...state,
    show: {
      ...state.show,
      errorToast: false,
    },
  }),
  [RESET_FIELDS]: () => ({
    ...initialState,
  }),
  [SET_MODAL_CONFIRMATION]: (state, payload) => ({
    ...state,
    modalData: {
      ...(CONFIRMATION_CONTENT[payload] || CONFIRMATION_CONTENT.default),
      type: payload,
    },
    showModalConfirmation: !state.showModalConfirmation,
  }),
  [POST_CHECK_SQL_CREDENTIAL_REQUEST]: state => ({
    ...state,
    isLoading: true,
    isError: false,
    errorMessage: '',
  }),
  [POST_CHECK_SQL_CREDENTIAL_SUCCESS]: state => ({
    ...state,
    isLoading: false,
    isError: true,
  }),
  [POST_CHECK_SQL_CREDENTIAL_ERROR]: (state, payload) => ({
    ...state,
    show: {
      ...state.show,
      errorToast: true,
    },
    errorMessage: (((payload || {}).response || {}).body || {}).message || 'Service cannot be reached. Please try again',
  }),
  [POST_CREATE_CONNECTOR_REQUEST]: state => ({
    ...state,
    isLoading: true,
    tableList: [],
    loadingText: 'Checking your configuration',
  }),
  [POST_CREATE_CONNECTOR_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: '',
    data: {
      step0: {},
      step1: {},
      step2: {},
    },
    loadingText: '',
    connector: payload,
  }),
  [POST_CREATE_CONNECTOR_ERROR]: (state, payload) => ({
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
  [SET_RULES]: (state, payload) => ({
    ...state,
    rules: payload,
  }),
  [SET_DATA]: (state, payload) => ({
    ...state,
    data: payload,
  }),
  [GET_TABLE_LIST_REQUEST]: state => ({
    ...state,
    isLoading: true,
    isError: false,
  }),
  [GET_TABLE_LIST_SUCCESS]: (state, payload) => ({
    ...state,
    isLoading: false,
    tableList: payload,
  }),
  [GET_TABLE_LIST_ERROR]: state => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: 'Failed to get table list',
    loadingText: '',
  }),
})

export const resetFields = () => ({
  type: RESET_FIELDS,
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

export const setModalErrorUpload = () => ({
  type: SET_MODAL_CONFIRMATION,
  payload: 'failedUploadData',
})

export const setToastClose = () => ({
  type: SET_TOAST_CLOSE,
})

export const setToastOpen = ({ message }) => ({
  type: SET_TOAST_OPEN,
  payload: message,
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
    POST_CREATE_CONNECTOR_REQUEST,
    POST_CREATE_CONNECTOR_SUCCESS,
    POST_CREATE_CONNECTOR_ERROR,
  ],
  shuttle: {
    path,
    method: METHOD.post,
    payloads,
    headers,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})

export const postCheckSqlCredential = ({
  payloads,
  authCookie,
  path,
  cb,
}) => ({
  type: [
    POST_CHECK_SQL_CREDENTIAL_REQUEST,
    POST_CHECK_SQL_CREDENTIAL_SUCCESS,
    POST_CHECK_SQL_CREDENTIAL_ERROR,
  ],
  shuttle: {
    path,
    method: METHOD.post,
    payloads,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})

export const setTusConfiguration = ({ tusConfiguration }) => ({
  type: SET_TUS_CONFIGURATION,
  payload: tusConfiguration,
})

export const setTableList = payload => ({
  type: SET_TABLE_LIST,
  payload,
})

export const getTableList = payload => (dispatch, getState) => {
  const {
    volantisConstant: {
      service: {
        endpoint: {
          emmaDatasource,
        },
      },
    },
  } = getState()

  return dispatch({
    type: [
      GET_TABLE_LIST_REQUEST,
      GET_TABLE_LIST_SUCCESS,
      GET_TABLE_LIST_ERROR,
    ],
    shuttle: {
      path: `${emmaDatasource}/check/tables`,
      method: METHOD.post,
      payloads: payload,
    },
  })
}
