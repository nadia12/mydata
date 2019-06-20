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
