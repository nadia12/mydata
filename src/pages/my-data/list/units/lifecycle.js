import {
  getCurrentWindow,
} from '../url-helper'

const componentDidMount = props => {
  props.setHeaders()
  props.handleResetSelectList()
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

    const { searchName, orderName, orderType } = getCurrentWindow('querystring')

    props.setFilterPagination({
      searchName: (searchName || ''),
      orderName: (orderName || ''),
      orderType: (orderType || ''),
    })

    props.setEmptyEntities()
    props.setEntitiesByHref()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
