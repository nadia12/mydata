import {
  postPreviewTabularData,
  getEntity,
  setValues,
} from './reducer'

export const setTableHeaders = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { preview: previewState },
    },
  } = getState()

  const { data: { result } } = previewState
  const th = Object.keys(result[0])

  dispatch(setValues({ preview: { ...previewState, tableHeaders: th } }))
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
    limit: 20,
    ...params,
  }

  dispatch(postPreviewTabularData(pathPreview, reqData, authCookie))
}

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

// params: {label, value}
export const handleColumnChangeInput = params => dispatch => {
  dispatch(setValues({ searchColumns: { [params.key]: params.value } }))
}

export const handleColumnEnter = () => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { info: { data: infoData }, searchColumns },
    },
  } = getState()

  const params = {
    queryType: 'TEXT_SEARCH',
    property: Object.keys(searchColumns)[0] || '',
    querySpec: {
      querySpecType: 'CONTAINS',
      value: Object.values(searchColumns)[0] || '',
    },
  }
  dispatch(postPreviewData(infoData.id, params))
}
