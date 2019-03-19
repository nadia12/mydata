import React from 'react'
import { initialStates } from './constant'
import { createReducer } from '../../../redux/initializer'

export const SET_VALUE = 'my-data/list/SET_VALUE'
export const SET_VALUES = 'my-data/list/SET_VALUES'
export const SET_TOGGLE_MODAL = 'my-data/list/SET_TOGGLE_MODAL'

export default createReducer(initialStates, {
  [SET_VALUE]: (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }),
  [SET_VALUES]: (state, payload) => ({
    ...state,
    ...payload.value,
  }),
  [SET_TOGGLE_MODAL]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: !state.show[payload.key] },
  }),
})

export function setToggleModal(key) {
  console.log("setToggleModal key===>", key)
  return {
    type: [SET_TOGGLE_MODAL],
    payload: {
      key
    },
  }
}

export function setValues(value) {
  console.log("setValues==>", value);
  return {
    type: [SET_VALUES],
    payload: {
      value,
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

export const createNewEntity = (reqData) => async (dispatch, getState) => {
  dispatch(doLoading(CREATE_NEW_ENTITY, 'createNewEntityState'));
  try {
    const { listMyData: { entity }, service: { root: rootAPI } } = getState();
    const newEntity = await otherRequest({
      headers: { 'Content-Type': 'application/json' },
      url: `${rootAPI}/v1/directory/${reqData.driveId}/collection`,
      data: reqData
    }, 'POST');
    const data = typeof newEntity.data !== 'undefined' && newEntity.data !== null ? [...entity, newEntity.data] : entity;
    return dispatch(doSuccess(CREATE_NEW_ENTITY, 'createNewEntityState', 'entity', data));
  } catch(ex) {
    console.log(ex);
    return dispatch(doError(CREATE_NEW_ENTITY, 'createNewEntityState', 'entity', [], 'Failed to save data'));
  }
};
