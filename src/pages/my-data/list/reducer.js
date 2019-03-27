import { createReducer } from 'Redux/initializer'
import { stateStatus } from 'Config/constants';
import { initialStates } from './constant'

export const SET_VALUE = 'my-data/list/SET_VALUE'
export const SET_VALUES = 'my-data/list/SET_VALUES'
export const SET_TOGGLE_MODAL = 'my-data/list/SET_TOGGLE_MODAL'

import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,
  GET_CONNECTOR_REQUEST,
  GET_CONNECTOR_SUCCESS,
  GET_CONNECTOR_ERROR
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
})

export function setToggleModal(key) {
  return {
    type: [SET_TOGGLE_MODAL],
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
  console.log("setValue==> ", key, value);
  return {
    type: [SET_VALUE],
    payload: {
      key,
      value,
    },
  }
}

export function postNewFolder(params, cb) {
  return {
    type: [
      POST_NEW_FOLDER_REQUEST,
      POST_NEW_FOLDER_SUCCESS,
      POST_NEW_FOLDER_ERROR,
    ],
    shuttle: {
      method: 'POST',
      path: `/v1/directory/${reqData.driveId}/collection`
    },
    nextAction: res => cb(res),
  }
}

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

