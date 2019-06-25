import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  const id = getUrlId()
  props.resetState(id)
  props.getInfoEntity(id)
}

const componentDidUpdate = () => {
}

export default {
  componentDidMount,
  componentDidUpdate,
}
