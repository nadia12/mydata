import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'
import {
  getCookie,
} from 'Helpers/get-cookie'
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
  SET_AUTH_COOKIE,
  SET_USER_INFO,
  SET_DOUBLE_CLICK,
  SET_EMPTY_ENTITIES,

  POST_MOVE_TRASH_REQUEST,
  POST_MOVE_TRASH_SUCCESS,
  POST_MOVE_TRASH_ERROR,

  POST_RESTORE_TRASH_REQUEST,
  POST_RESTORE_TRASH_SUCCESS,
  POST_RESTORE_TRASH_ERROR,

  GET_FUNCTION_DOC_REQUEST,
  GET_FUNCTION_DOC_SUCCESS,
  GET_FUNCTION_DOC_ERROR,

  GET_ACCURACY_REQUEST,
  GET_ACCURACY_SUCCESS,
  GET_ACCURACY_ERROR,

  GET_TRASH_LIST_REQUEST,
  GET_TRASH_LIST_SUCCESS,
  GET_TRASH_LIST_ERROR,

  PUT_MOVE_DIRECTORY_REQUEST,
  PUT_MOVE_DIRECTORY_SUCCESS,
  PUT_MOVE_DIRECTORY_ERROR,

  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  POST_CONNECTOR_REQUEST,
  POST_CONNECTOR_SUCCESS,
  POST_CONNECTOR_ERROR,

  GET_FILTER_ENTITY_REQUEST,
  GET_FILTER_ENTITY_SUCCESS,
  GET_FILTER_ENTITY_ERROR,

  PUT_SYNC_DATASOURCE_REQUEST,
  PUT_SYNC_DATASOURCE_SUCCESS,
  PUT_SYNC_DATASOURCE_ERROR,

  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,

  GET_MODEL_REQUEST,
  GET_MODEL_SUCCESS,
  GET_MODEL_ERROR,

  GET_PRETRAINED_MODEL_REQUEST,
  GET_PRETRAINED_MODEL_SUCCESS,
  GET_PRETRAINED_MODEL_ERROR,

  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,

  GET_PIPELINE_REQUEST,
  GET_PIPELINE_SUCCESS,
  GET_PIPELINE_ERROR,
} from './action-type'

export default createReducer(initialStates, {
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
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload,
  }),
  [SET_USER_INFO]: (state, payload) => ({
    ...state,
    userInfo: payload,
  }),
})

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export const setUserInfo = ({ userInfo = 'DIS_IQ' }) => ({
  type: SET_USER_INFO,
  payload: getCookie({ cookieName: userInfo }),
})

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

export function postRestoreFromTrash(driveId, ids, authCookie, cb = () => {}) {
  return {
    type: [
      POST_RESTORE_TRASH_REQUEST,
      POST_RESTORE_TRASH_SUCCESS,
      POST_RESTORE_TRASH_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}/restore`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: ids,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function postMoveToTrash(driveId, ids, authCookie, cb = () => {}) {
  return {
    type: [
      POST_MOVE_TRASH_REQUEST,
      POST_MOVE_TRASH_SUCCESS,
      POST_MOVE_TRASH_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: ids,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getFunctionDoc(asset, authCookie, cb = () => {}) {
  return {
    type: [
      GET_FUNCTION_DOC_REQUEST,
      GET_FUNCTION_DOC_SUCCESS,
      GET_FUNCTION_DOC_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/function-doc/${asset[0].id}?component_type=${`${asset[0].type}`.toUpperCase()}&access_token=${authCookie}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res && typeof res.error === 'undefined' ? res : []
      cb(data, asset, err)
    },
  }
}

export function getAccuracy(assetId, authCookie, cb = () => {}) {
  return {
    type: [
      GET_ACCURACY_REQUEST,
      GET_ACCURACY_SUCCESS,
      GET_ACCURACY_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/ml-models/accuracy/${assetId}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function putSyncDatasource(connectorId, headers, authCookie, cb = () => {}) {
  return {
    type: [
      PUT_SYNC_DATASOURCE_REQUEST,
      PUT_SYNC_DATASOURCE_SUCCESS,
      PUT_SYNC_DATASOURCE_ERROR,
    ],
    shuttle: {
      path: `/v2/connector/${connectorId}/sync`,
      method: Method.put,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: () => cb(),
  }
}

export function putMoveDirectory(driveId, entityId, targetCollectionId, authCookie, cb = () => {}) {
  return {
    type: [
      PUT_MOVE_DIRECTORY_REQUEST,
      PUT_MOVE_DIRECTORY_SUCCESS,
      PUT_MOVE_DIRECTORY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${driveId}/${entityId}/into/${targetCollectionId}`,
      method: Method.put,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getTrashList(driveId, authCookie, cb = () => {}) {
  return {
    type: [
      GET_TRASH_LIST_REQUEST,
      GET_TRASH_LIST_SUCCESS,
      GET_TRASH_LIST_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/trash/${driveId}/`,
      method: Method.get,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getEntityList(params, authCookie, cb = () => {}) {
  return {
    type: [
      GET_ENTITY_REQUEST,
      GET_ENTITY_SUCCESS,
      GET_ENTITY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${params.driveId}/${params.entityId}/contents`,
      method: Method.get,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function postConnectorData(connectorIds, authCookie, cb = () => {}) {
  return {
    type: [
      POST_CONNECTOR_REQUEST,
      POST_CONNECTOR_SUCCESS,
      POST_CONNECTOR_ERROR,
    ],
    shuttle: {
      path: '/v1/connector',
      method: Method.post,
      payloads: connectorIds,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getFilterEntity(params, authCookie, cb = () => {}) {
  return {
    type: [
      GET_FILTER_ENTITY_REQUEST,
      GET_FILTER_ENTITY_SUCCESS,
      GET_FILTER_ENTITY_ERROR,
    ],
    shuttle: {
      path: `/v1/directory/${params.driveId}/search/name?name=${params.entityName}${params.parentPath}`,
      method: Method.get,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getModelList(authCookie, cb = () => {}) {
  return {
    type: [
      GET_MODEL_REQUEST,
      GET_MODEL_SUCCESS,
      GET_MODEL_ERROR,
    ],
    shuttle: {
      path: '/v1/model',
      method: Method.get,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getPretrainedModelList(authCookie, cb = () => {}) {
  return {
    type: [
      GET_PRETRAINED_MODEL_REQUEST,
      GET_PRETRAINED_MODEL_SUCCESS,
      GET_PRETRAINED_MODEL_ERROR,
    ],
    shuttle: {
      path: '/v1/model/pretrained',
      method: Method.get,
    },
    endpoint: Hostname.root,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getPipelineList(authCookie, cb = () => {}) {
  return {
    type: [
      GET_PIPELINE_REQUEST,
      GET_PIPELINE_SUCCESS,
      GET_PIPELINE_ERROR,
    ],
    shuttle: {
      path: '/manages/data-pipelines/list',
      method: Method.get,
      endpoint: Hostname.web,
      qs: {
        access_token: getCookie({ cookieName: authCookie }),
      },
    },
    endpoint: Hostname.web,
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

export function getDatasetList(authCookie, cb = () => {}) {
  return {
    type: [
      GET_DATASET_REQUEST,
      GET_DATASET_SUCCESS,
      GET_DATASET_ERROR,
    ],
    shuttle: {
      path: '/v1/dataset',
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}

// dataset details
export function getFilteredAppByDataset(dataset, authCookie, cb = () => {}) {
  return {
    type: [
      GET_FILTERED_APP_LIST_REQUEST,
      GET_FILTERED_APP_LIST_SUCCESS,
      GET_FILTERED_APP_LIST_ERROR,
    ],
    shuttle: {
      path: `/v1/app/search?datasetId=${dataset.id}&name=`,
      method: Method.get,
      endpoint: Hostname.root,
    },
    authCookie,
    nextAction: (res, err) => cb(res, err),
  }
}
