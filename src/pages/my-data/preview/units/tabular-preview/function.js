import {
  postPreviewTabularData,
  setValues,
} from 'MyData/preview/reducer'

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
    limit: 100,
    ...params,
  }

  dispatch(postPreviewTabularData(pathPreview, reqData, authCookie))
}
