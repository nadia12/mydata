import {
  getUrlId,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  props.resetState()
  const id = getUrlId()
  props.getInfoEntity(id)
}

const componentDidUpdate = () => {
}

export default {
  componentDidMount,
  componentDidUpdate,
}
