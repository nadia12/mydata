import React from 'react'
import { initialStates } from './constant'
import { createReducer } from '../../../redux/initializer'

export const SET_VALUE = 'my-data/list/SET_VALUE'
export const SET_MODAL_SHOW = 'my-data/list/SET_MODAL_SHOW'

export default createReducer(initialStates, {
  [SET_VALUE]: (state, payload) => ({
    ...state,
    [payload.key]: payload.value,
  }),
  [SET_MODAL_SHOW]: (state, payload) => ({
    ...state,
    show: { ...state.show, [payload.key]: payload.value },
  }),
})

export function setModalShow(key, value) {
  return {
    type: [SET_MODAL_SHOW],
    payload: {
      key,
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