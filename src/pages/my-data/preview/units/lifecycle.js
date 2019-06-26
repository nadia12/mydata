import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  const id = getUrlId()
  props.resetState(id)

  if (!props.infoData.id) props.getInfoEntity(id)
}

const componentDidUpdate = (prevProps, props) => {
  if (!!prevProps.infoData.id && !!props.infoData.id && prevProps.infoData.id !== props.infoData.id) {
    const id = getUrlId()
    props.getInfoEntity(id)
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
