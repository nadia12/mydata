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

  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  SET_VALUES,
  RESET_STATE,
  SET_ENTITY_PREVIEW,

  SET_ERROR_MEDIA_PREVIEW,
} from './action-type'

export default createReducer(initialStates, {
  [RESET_STATE]: state => ({
    ...initialStates,
    info: {
      ...state.info,
    },
  }),
  [SET_VALUES]: (state, payload) => ({
    ...state,
    ...payload.keyValues,
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
    },
  }),
  [POST_PREVIEW_DATA_SUCCESS]: (state, payload) => ({
    ...state,
    preview: {
      ...state.preview,
      isLoading: false,
      data: payload,
    },
  }),
  [POST_PREVIEW_DATA_ERROR]: (state, payload) => ({
    ...state,
    preview: {
      ...state.preview,
      isLoading: false,
      errorMessage: payload,
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

export function resetState() {
  return {
    type: [RESET_STATE],
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
