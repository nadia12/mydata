
import { extendedData, isWindowExist } from 'Config/lib/url-helper'
import {
  LOCATIONS,
} from 'Config/constants'
import QueryString from 'query-string'
import {
  getEntity,
  setValues,
} from './reducer'

export const getInfoEntity = id => (dispatch, getState) => {
  const {
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const pathEntity = `${emmaDirectory}/entity/${id}`

  dispatch(getEntity(pathEntity, authCookie))
}

export const toogleShowInfo = () => (dispatch, getState) => {
  const { volantisMyData: { _mydataPreview: { show } } } = getState()

  dispatch(setValues({ show: { ...show, info: !show.info } }))
}

export const setSelectActionValue = value => (dispatch, getState) => {
  const { volantisMyData: { _mydataPreview: { selectAction } } } = getState()

  dispatch(setValues({ selectAction: { ...selectAction, value } }))
}

const handleCreatePipeline = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataPreview: { info: { data: { id, name } } } },
    volantisConstant: { routes: { pipeline: { root: pipelineRoot } } },
  } = getState()
  if (!!id && !!name) {
    const qs = `${QueryString.stringify({ ids: [id] })}&${QueryString.stringify({ name: [name] })}`
    linkTo(`${pipelineRoot}?${qs}`)
  }
}

export const handleSelectAction = (type, linkTo = () => {}) => dispatch => {
  const action = {
    openPipeline: handleCreatePipeline(linkTo),
    default: null,
  }

  return dispatch(action[type]) || action.default
}

export const linkToMyDataRoot = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisConstant: { routes: { myData: { root: myDataRoot } } },
  } = getState()

  const prev = isWindowExist && window.localStorage.getItem('MYDATA.prev')
  const jPrev = prev ? JSON.parse(prev) : { decodedData: {} }

  const qs = {
    locationType: LOCATIONS.ROOT,
    ...jPrev.decodedData,
  }

  linkTo(`${myDataRoot}?q=${extendedData('encode', qs)}`)
}
