import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  const id = getUrlId()
  props.resetState(id)
  props.postPreviewData(id)
  if (!!props.infoData.id) props.postTableHeaders()
}

const componentDidUpdate = (props, prevProps) => {
  if (!prevProps.previewData.result.length && !!props.previewData.result.length && prevProps.previewData.result.length !== props.previewData.result.length) {
    props.setTableHeaders()
  }
  if (!prevProps.infoData.id
    && !!props.infoData.id
    && prevProps.infoData.id !== props.infoData.id
    && !prevProps.status
  ) {
    props.postTableHeaders()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
