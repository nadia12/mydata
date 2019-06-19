import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  const id = getUrlId()
  props.postPreviewData(id)
  props.getInfoEntity(id)
}

const componentDidUpdate = (props, prevProps) => {
  if (!prevProps.previewData.result.length && props.previewData.result.length && prevProps.previewData.result !== props.previewData.result) {
    props.setTableHeaders()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
