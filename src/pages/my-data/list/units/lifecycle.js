import {
  getCurrentWindow,
} from '../url-helper'

const componentDidMount = props => {
  props.setHeaders()
}

const componentDidUpdate = (props, prevProps) => {
  if (prevProps.lastChangeLocation !== props.lastChangeLocation) {
    props.resetState()
    props.setHeaders()
    props.setEntityList()
  }

  if (props.prev.href !== getCurrentWindow('href')) {
    props.setCurrentLocation({
      href: getCurrentWindow('href'),
      path: getCurrentWindow('path'),
      querystring: getCurrentWindow('querystring'),
    })
    props.resetFilterPagination()
    props.setEmptyEntities()
    props.setEntitiesByHref()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
