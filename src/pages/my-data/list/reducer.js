import Method from 'Config/constants/request-method'

import {
  createReducer,
} from 'Redux/initializer'
import {
  initialStates,
} from './initial-states'
import {
  SET_VALUE,
  SET_VALUES,
  SET_TOGGLE_MODAL,
  SET_TOGGLE_MODAL_CLOSE,
  SET_TOGGLE_MODAL_OPEN,
  SET_TOGGLE_MODAL_CONFIRMATION_CLOSE,
  SET_TOGGLE_MODAL_CONFIRMATION_OPEN,
  SET_PREVIEW_MODEL,
  SET_DOUBLE_CLICK,
  SET_EMPTY_ENTITIES,
  SET_ENTITIES_PAGE,

  POST_MOVE_TRASH_REQUEST,
  POST_MOVE_TRASH_SUCCESS,
  POST_MOVE_TRASH_ERROR,

  POST_RESTORE_TRASH_REQUEST,
  POST_RESTORE_TRASH_SUCCESS,
  POST_RESTORE_TRASH_ERROR,

  GET_TRASH_LIST_REQUEST,
  GET_TRASH_LIST_SUCCESS,
  GET_TRASH_LIST_ERROR,

  PUT_MOVE_DIRECTORY_REQUEST,
  PUT_MOVE_DIRECTORY_SUCCESS,
  PUT_MOVE_DIRECTORY_ERROR,

  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  PUT_SYNC_DATASOURCE_REQUEST,
  PUT_SYNC_DATASOURCE_SUCCESS,
  PUT_SYNC_DATASOURCE_ERROR,

  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,

  GET_ACCURACY_DETAIL_REQUEST,
  GET_ACCURACY_DETAIL_SUCCESS,
  GET_ACCURACY_DETAIL_ERROR,

  POST_NEW_FOLDER_REQUEST,
  POST_NEW_FOLDER_SUCCESS,
  POST_NEW_FOLDER_ERROR,
  RESET_STATE,

  GET_ENTITY_CONNECTOR_REQUEST,
  GET_ENTITY_CONNECTOR_SUCCESS,
  GET_ENTITY_CONNECTOR_ERROR,

  SET_FIELDS,

  POST_CHECK_SQL_CREDENTIAL_REQUEST,
  POST_CHECK_SQL_CREDENTIAL_SUCCESS,
  POST_CHECK_SQL_CREDENTIAL_ERROR,

  PUT_CONNECTOR_CONFIGURATION_REQUEST,
  PUT_CONNECTOR_CONFIGURATION_SUCCESS,
  PUT_CONNECTOR_CONFIGURATION_ERROR,

} from './action-type'

export default createReducer(initialStates, {
  [PUT_CONNECTOR_CONFIGURATION_REQUEST]: state => ({
    ...state,
    isLoading: true,
    isError: false,
    errorMessage: '',
  }),
  [PUT_CONNECTOR_CONFIGURATION_SUCCESS]: state => ({
    ...state,
    isLoading: false,
    isError: true,
  }),
  [PUT_CONNECTOR_CONFIGURATION_ERROR]: (state, payload) => ({
    ...state,
    show: {
      ...state.show,
      errorToast: true,
    },
    errorMessage: (((payload || {}).response || {}).body || {}).message || 'Service cannot be reached. Please try again',
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
  [SET_FIELDS]: (state, payload) => ({
    ...state,
    fields: {
      ...state.fields,
      [payload.key]: payload.value,
    },
  }),
  [RESET_STATE]: () => ({
    ...initialStates,
  }),
  [SET_VALUE]: (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }),
  [SET_VALUES]: (state, payload) => ({
    ...state,
    ...payload.keyValues,
  }),
  [SET_EMPTY_ENTITIES]: state => ({
    ...state,
    entities: [],
  }),
  [SET_ENTITIES_PAGE]: (state, payload) => ({
    ...state,
    entities: payload.entities,
    pagination: {
      page: payload.page,
    },
    lastEntitiesLength: payload.lastEntitiesLength,
    show: { ...state.show, entityContent: true },
  }),
  [SET_TOGGLE_MODAL]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: !state.show[payload.key] },
  }),
  [SET_TOGGLE_MODAL_CLOSE]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: false },
  }),
  [SET_TOGGLE_MODAL_OPEN]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: true },
  }),
  [SET_TOGGLE_MODAL_CONFIRMATION_CLOSE]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: false },
    modalData: payload.modalData,
  }),
  [SET_TOGGLE_MODAL_CONFIRMATION_OPEN]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: true },
    modalData: payload.modalData,
  }),
  [SET_PREVIEW_MODEL]: (state, payload) => ({
    ...state,
    functionDoc: payload.functionDoc,
    accuracy: payload.accuracy,
    show: { ...state.show, [payload.modalValue]: !state.show[payload.modalValue] },
  }),
  [SET_DOUBLE_CLICK]: (state, payload) => ({
    ...state,
    selected: payload.selected,
    headers: payload.headers,
  }),
})

export function setFields(key, value) {
  return {
    type: [SET_FIELDS],
    payload: { key, value },
  }
}

export function resetState() {
  return {
    type: [RESET_STATE],
  }
}

export function setToggleModal(key, cb = () => {}) {
  return {
    type: [SET_TOGGLE_MODAL],
    payload: { key },
    nextAction: cb,
  }
}

export function setConfirmationModalClose() {
  return {
    type: [SET_TOGGLE_MODAL_CONFIRMATION_CLOSE],
    payload: {
      key: 'confirmationModal',
      modalData: { type: '', menu: '', status: '' },
    },
  }
}

export function setConfirmationModalOpen({ type = '', status = 'warning' }) {
  return {
    type: [SET_TOGGLE_MODAL_CONFIRMATION_OPEN],
    payload: {
      key: 'confirmationModal',
      modalData: { type, menu: '', status },
    },
  }
}

export function setToggleModalClose(key) {
  return {
    type: [SET_TOGGLE_MODAL_CLOSE],
    payload: { key },
  }
}

export function setToggleModalOpen(key) {
  return {
    type: [SET_TOGGLE_MODAL_OPEN],
    payload: { key },
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
      key,
      value,
    },
  }
}

// set entities and set show.entityContent to true
export function setEntitiesPage(entities, page, lastEntitiesLength) {
  return {
    type: [SET_ENTITIES_PAGE],
    payload: {
      entities,
      page,
      lastEntitiesLength,
    },
  }
}

export function setEmptyEntities() {
  return {
    type: [SET_EMPTY_ENTITIES],
  }
}

export function setPreviewModel(functionDoc, accuracy, modalValue) {
  return {
    type: [SET_PREVIEW_MODEL],
    payload: {
      functionDoc,
      accuracy,
      modalValue,
    },
  }
}

export function setDoubleClick(values) {
  return {
    type: [SET_DOUBLE_CLICK],
    payload: {
      ...values,
    },
  }
}

export function postRestoreFromTrash(pathRestore, ids, params = { isParentExist: false }, authCookie, cb = () => {}) {
  return {
    type: [
      POST_RESTORE_TRASH_REQUEST,
      POST_RESTORE_TRASH_SUCCESS,
      POST_RESTORE_TRASH_ERROR,
    ],
    shuttle: {
      path: pathRestore,
      method: Method.post,
      payloads: ids,
      qs: { isParentExist: params.isParentExist },
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function postMoveToTrash(pathTrash, ids, authCookie, cb = () => {}) {
  return {
    type: [
      POST_MOVE_TRASH_REQUEST,
      POST_MOVE_TRASH_SUCCESS,
      POST_MOVE_TRASH_ERROR,
    ],
    shuttle: {
      path: pathTrash,
      method: Method.post,
      payloads: ids,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function putSyncDatasource(pathSync, headers, authCookie, cb = () => {}) {
  return {
    type: [
      PUT_SYNC_DATASOURCE_REQUEST,
      PUT_SYNC_DATASOURCE_SUCCESS,
      PUT_SYNC_DATASOURCE_ERROR,
    ],
    shuttle: {
      path: pathSync,
      method: Method.put,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    },
    authCookie,
    nextAction: () => cb(),
  }
}

export function putMoveDirectory(putMoveDirectory, authCookie, cb = () => {}) {
  return {
    type: [
      PUT_MOVE_DIRECTORY_REQUEST,
      PUT_MOVE_DIRECTORY_SUCCESS,
      PUT_MOVE_DIRECTORY_ERROR,
    ],
    shuttle: {
      path: putMoveDirectory,
      method: Method.put,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getTrashList(pathTrash, params, authCookie, cb = () => {}) {
  return {
    type: [
      GET_TRASH_LIST_REQUEST,
      GET_TRASH_LIST_SUCCESS,
      GET_TRASH_LIST_ERROR,
    ],
    shuttle: {
      path: pathTrash,
      method: Method.get,
      qs: { ...params.query },
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

/** Available query string:
 * name
 * parentId
 * entityType
 * orderName
 * orderType
 * pathPrefix
 * page
 * size
 * serviceData */
export function getEntityList(pathEntity, params, authCookie, cb = () => {}) {
  return {
    type: [
      GET_ENTITY_REQUEST,
      GET_ENTITY_SUCCESS,
      GET_ENTITY_ERROR,
    ],
    shuttle: {
      path: pathEntity,
      method: Method.get,
      qs: { ...params.query },
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

// dataset details
export function getFilteredAppByAsset({ pathSearch, assetId = '', name = '' }, authCookie, cb = () => {}) {
  return {
    type: [
      GET_FILTERED_APP_LIST_REQUEST,
      GET_FILTERED_APP_LIST_SUCCESS,
      GET_FILTERED_APP_LIST_ERROR,
    ],
    shuttle: {
      path: pathSearch,
      method: Method.get,
      qs: { assetId, name },
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export const getEntityConnector = (pathEntityConnector, authCookie, cb) => ({
  type: [
    GET_ENTITY_CONNECTOR_REQUEST,
    GET_ENTITY_CONNECTOR_SUCCESS,
    GET_ENTITY_CONNECTOR_ERROR,
  ],
  shuttle: {
    path: pathEntityConnector,
    method: Method.get,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})

// === ADD ENTITY ON MODAL [NEW FOLDER]
export const postNewFolder = (pathNewFolder, reqData, authCookie, cb) => dispatch => dispatch({
  type: [
    POST_NEW_FOLDER_REQUEST,
    POST_NEW_FOLDER_SUCCESS,
    POST_NEW_FOLDER_ERROR,
  ],
  shuttle: {
    path: pathNewFolder,
    method: Method.post,
    payloads: reqData,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})

export function getAccuracyDetail(pathAccuracyDetail, authCookie, cb) {
  return {
    type: [
      GET_ACCURACY_DETAIL_REQUEST,
      GET_ACCURACY_DETAIL_SUCCESS,
      GET_ACCURACY_DETAIL_ERROR,
    ],
    shuttle: {
      path: pathAccuracyDetail,
      method: Method.get,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

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
    method: Method.post,
    payloads,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})

export const putConnectorConfiguration = ({
  payloads,
  authCookie,
  path,
  headers,
  cb,
}) => ({
  type: [
    PUT_CONNECTOR_CONFIGURATION_REQUEST,
    PUT_CONNECTOR_CONFIGURATION_SUCCESS,
    PUT_CONNECTOR_CONFIGURATION_ERROR,
  ],
  shuttle: {
    path,
    method: Method.put,
    payloads,
    headers,
  },
  authCookie,
  nextAction: (res, err) => cb(res, err),
})
