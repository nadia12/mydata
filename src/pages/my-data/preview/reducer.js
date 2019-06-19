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
} from './action-type'

export default createReducer(initialStates, {
  [SET_VALUES]: (state, payload) => ({
    ...state,
    ...payload.keyValues,
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

export function setValues(keyValues) {
  return {
    type: [SET_VALUES],
    payload: {
      keyValues,
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
