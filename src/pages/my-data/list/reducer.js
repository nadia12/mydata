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