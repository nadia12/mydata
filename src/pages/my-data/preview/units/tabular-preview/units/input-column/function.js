import {
  setColumnInput,
} from 'MyData/preview/reducer'

import {
  postPreviewData,
} from 'MyData/preview/units/tabular-preview/function'

export const handleColumnEnter = ({ key, value }) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { info: { data: infoData } },
    },
  } = getState()

  const params = {
    queryType: 'TEXT_SEARCH',
    property: key || '',
    querySpec: {
      querySpecType: 'CONTAINS',
      value: value || '',
    },
  }
  dispatch(postPreviewData(infoData.id, params))
}
