import {
  postPreviewTabularData,
  postTableHeaderReducer,
  setValues,
} from 'MyData/preview/reducer'

export const setTableHeaders = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { preview: previewState, tableHeaders },
    },
  } = getState()

  const { data: { result } } = previewState

  const ths = Object.keys(result[0]).reduce((carry, name) => {
    let newCarry = carry
    newCarry = [...newCarry, { name, type: null }]

    return newCarry
  }, [])

  dispatch(setValues({ tableHeaders: { ...tableHeaders, data: ths } }))
}
// Table Preview
export const postPreviewData = (id, params = { queryType: 'FILTER' }) => (dispatch, getState) => {
  const {
    volantisConstant: {
      cookie: { auth: authCookie },
    },
  } = getState()

  const pathPreview = `/dataset/query/${id}`

  const reqData = {
    queryType: 'FILTER',
    objectType: 'VERTEX',
    limit: 100,
    ...params,
  }

  dispatch(postPreviewTabularData(pathPreview, reqData, authCookie))
}

// Table Preview
export const postTableHeaders = () => (dispatch, getState) => {
  const {
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { sherlockSchema, hdfsStorage } },
    },
    volantisMyData: {
      _mydataPreview: { info: { data: { id, mime } } },
    },
  } = getState()

  const reqData = {
    type: mime,
    path: `${hdfsStorage || '/volantis/storage'}/${id}`,
  }

  dispatch(postTableHeaderReducer(sherlockSchema, reqData, authCookie))
}
