import { createReducer } from 'Redux/initializer'
import { initialStates } from './initial-states'
import {
  SET_VALUE,
  SET_VALUES,
  SET_TOGGLE_MODAL,
  SET_TOGGLE_MODAL_CLOSE,
  SET_TOGGLE_MODAL_OPEN,
  SET_PREVIEW_ASSET,
  SET_AUTH_COOKIE,
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
  [SET_PREVIEW_ASSET]: (state, payload) => ({
    ...state,
    accuracy: payload.accuracy,
    show: { ...state.show, [payload.modalValue]: !state.show[payload.modalValue] },
  }),
  [SET_AUTH_COOKIE]: (state, payload) => ({
    ...state,
    authCookie: payload
  }),
})

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export function setToggleModal(key,cb) {
  return {
    type: [SET_TOGGLE_MODAL],
    payload: {
      key
    },
    nextAction: cb,
  }
}

export function setToggleModalClose(key) {
  return {
    type: [SET_TOGGLE_MODAL_CLOSE],
    payload: {
      key
    },
  }
}

export function setToggleModalOpen(key) {
  return {
    type: [SET_TOGGLE_MODAL_OPEN],
    payload: {
      key
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
      key,
      value,
    },
  }
}

export function setPreviewAsset(accuracy, modalValue) {
  return {
    type: [SET_PREVIEW_ASSET],
    payload: {
      accuracy,
      modalValue,
    },
  }
}


// export function postNewFolder(params, cb) {
//   return {
//     type: [
//       POST_NEW_FOLDER_REQUEST,
//       POST_NEW_FOLDER_SUCCESS,
//       POST_NEW_FOLDER_ERROR,
//     ],
//     shuttle: {
//       method: 'POST',
//       path: `/v1/directory/${params.driveId}/collection`
//     },
//     nextAction: res => cb(res),
//   }
// }
// export const createNewEntity = (reqData) => async (dispatch, getState) => {
//   dispatch(doLoading(CREATE_NEW_ENTITY, 'createNewEntityState'));
//   try {
//     const { listMyData: { entity }, service: { root: rootAPI } } = getState();
//     const newEntity = await otherRequest({
//       headers: { 'Content-Type': 'application/json' },
//       url: `${rootAPI}/v1/directory/${reqData.driveId}/collection`,
//       data: reqData
//     }, 'POST');
//     const data = typeof newEntity.data !== 'undefined' && newEntity.data !== null ? [...entity, newEntity.data] : entity;
//     return dispatch(doSuccess(CREATE_NEW_ENTITY, 'createNewEntityState', 'entity', data));
//   } catch(ex) {
//     console.log(ex);
//     return dispatch(doError(CREATE_NEW_ENTITY, 'createNewEntityState', 'entity', [], 'Failed to save data'));
//   }
// };

