
import { extendedData, isWindowExist } from 'Config/lib/url-helper'
import {
  LOCATIONS,
} from 'Config/constants'
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

export const linkToMyDataRoot = (linkTo = () => {}) => (dispatch, getState) => {
  const {
    volantisConstant: { routes: { myData: { root: myDataRoot } } },
  } = getState()

  const prev = isWindowExist && window.localStorage.getItem('MYDATA.prev')
  const jPrev = prev ? JSON.parse(prev) : { decodedData: {} }

  console.log('linkToMyDataRoot', linkTo)

  const qs = {
    locationType: LOCATIONS.ROOT,
    ...jPrev.decodedData,
    orderType: 'DESC',
    orderName: 'updatedAt',
  }

  linkTo(`${myDataRoot}?q=${extendedData('encode', qs)}`)
}
