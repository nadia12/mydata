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
  SET_DOUBLE_CLICK,
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
  [SET_DOUBLE_CLICK]: (state, payload) => ({
    ...state,
    selected: payload.selected,
    headers: payload.headers,
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

export function setDoubleClick(values, cb) {
  return {
    type: [SET_DOUBLE_CLICK],
    payload: {
      ...values
    },
    nextAction: () => cb(),
  }
}
