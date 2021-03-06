import Method from 'Config/constants/request-method'
import {
  createReducer,
} from 'Redux/initializer'
import {
  initialStates,
} from './initial-states'
import {
  POST_PREVIEW_DATA_REQUEST,
  POST_PREVIEW_DATA_SUCCESS,
  POST_PREVIEW_DATA_ERROR,

  POST_TABLE_HEADER_REQUEST,
  POST_TABLE_HEADER_SUCCESS,
  POST_TABLE_HEADER_ERROR,

  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  SET_VALUE,
  SET_VALUES,
  RESET_STATE,
  SET_ENTITY_PREVIEW,

  SET_ERROR_MEDIA_PREVIEW,
} from './action-type'

export default createReducer(initialStates, {
  [RESET_STATE]: state => ({
    ...initialStates,
    info: { ...state.info },
  }),
  [SET_VALUES]: (state, payload) => ({
    ...state,
    ...payload.keyValues,
  }),
  [SET_VALUE]: (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }),
  [SET_ERROR_MEDIA_PREVIEW]: (state, payload) => ({
    ...state,
    media: {
      errorMessage: `Cannot Load ${payload.mediaType}`,
    },
  }),
  [SET_ENTITY_PREVIEW]: (state, payload) => ({
    ...state,
    info: {
      ...state.info,
      data: payload.data,
      isLoading: false,
    },
  }),
  [POST_PREVIEW_DATA_REQUEST]: state => ({
    ...state,
    preview: {
      ...state.preview,
      isLoading: true,
      status: 'loading',
    },
  }),
  [POST_PREVIEW_DATA_SUCCESS]: (state, payload) => ({
    ...state,
    preview: {
      ...state.preview,
      isLoading: false,
      data: payload,
      status: 'success',
    },
  }),
  [POST_PREVIEW_DATA_ERROR]: (state, payload) => ({
    ...state,
    preview: {
      ...state.preview,
      isLoading: false,
      errorMessage: payload,
      status: 'error',
    },
  }),
  [POST_TABLE_HEADER_REQUEST]: state => ({
    ...state,
    tableHeaders: {
      ...state.tableHeaders,
      isLoading: true,
      status: 'request',
    },
  }),
  [POST_TABLE_HEADER_SUCCESS]: (state, payload) => ({
    ...state,
    tableHeaders: {
      ...state.tableHeaders,
      isLoading: false,
      data: (!!payload.schema.tables.length && !!payload.schema.tables[0])
        ? payload.schema.tables[0].columns : state.tableHeaders.data,
      status: 'success',
    },
  }),
  [POST_TABLE_HEADER_ERROR]: (state, payload) => ({
    ...state,
    tableHeaders: {
      ...state.tableHeaders,
      isLoading: false,
      errorMessage: payload,
      status: 'error',
    },
  }),
  [GET_ENTITY_SUCCESS]: (state, payload) => ({
    ...state,
    info: {
      ...state.info,
      data: payload,
    },
  }),
})

export function resetState(entityId) {
  return {
    type: [RESET_STATE],
    payload: {
      entityId,
    },
  }
}

export function setValues(keyValues) {
  return {
    type: [SET_VALUES],
    payload: {
      keyValues,
    },
  }
}
export function setValue(key, value) {
  return {
    type: [SET_VALUE],
    payload: {
      key, value,
    },
  }
}

export function setEntityPreview(data) {
  return {
    type: [SET_ENTITY_PREVIEW],
    payload: {
      data,
    },
  }
}

export function postPreviewTabularData(pathPreview, reqData, authCookie) {
  return {
    type: [
      POST_PREVIEW_DATA_REQUEST,
      POST_PREVIEW_DATA_SUCCESS,
      POST_PREVIEW_DATA_ERROR,
    ],
    shuttle: {
      path: pathPreview,
      method: Method.post,
      payloads: reqData,
    },
    authCookie,
  }
}

export function postTableHeaderReducer(pathSchema, reqData, authCookie) {
  return {
    type: [
      POST_TABLE_HEADER_REQUEST,
      POST_TABLE_HEADER_SUCCESS,
      POST_TABLE_HEADER_ERROR,
    ],
    shuttle: {
      path: pathSchema,
      method: Method.post,
      payloads: reqData,
    },
    authCookie,
  }
}

export function getEntity(pathEntity, authCookie) {
  return {
    type: [
      GET_ENTITY_REQUEST,
      GET_ENTITY_SUCCESS,
      GET_ENTITY_ERROR,
    ],
    shuttle: {
      path: pathEntity,
      method: Method.get,
    },
    authCookie,
  }
}

export function setErrorMediaPreview(mediaType) {
  return {
    type: [SET_ERROR_MEDIA_PREVIEW],
    payload: {
      mediaType,
    },
  }
}
