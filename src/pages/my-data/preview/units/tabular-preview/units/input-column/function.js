import {
  postPreviewData,
} from 'MyData/preview/units/tabular-preview/function'

import {
  setValue,
} from 'MyData/preview/reducer'

export const handleColumnEnter = ({ key, value }) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { info: { data: infoData }, searchColumns },
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

  const fields = Object.entries(searchColumns)
    .filter(obj => !!obj[1])
    .map(objMap => (
      { type: 'EQUAL', property: objMap[0], value: objMap[1] }
    ))

  if (fields.length > 1) {
    params.filter = {
      type: 'AND',
      fields,
    }
  }

  dispatch(postPreviewData(infoData.id, params))
}

export const saveValueColumn = ({ key, value }) => (dispatch, getState) => {
  const {
    volantisMyData: {
      _mydataPreview: { searchColumns },
    },
  } = getState()

  const columns = {
    ...searchColumns,
    [key]: value,
  }

  dispatch(setValue('searchColumns', columns))
}
