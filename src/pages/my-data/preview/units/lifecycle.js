import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  props.resetState()
  const id = getUrlId()
  if (!props.infoData.id) props.getInfoEntity(id)
}

const componentDidUpdate = () => {
}

export default {
  componentDidMount,
  componentDidUpdate,
}
