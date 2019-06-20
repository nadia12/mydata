import {
  setColumnInput,
} from 'MyData/preview/reducer'

import {
  postPreviewData,
} from 'MyData/preview/units/tabular-preview/function'

// params: {label, value}
export const handleColumnChangeInput = params => dispatch => {
  dispatch(setColumnInput({ [params.key]: params.value }))
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
