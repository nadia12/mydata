import {
  getCurrentWindow,
  extendedData,
} from 'Config/lib/url-helper'

const componentDidMount = props => {
  props.setHeaders()
  props.handleResetSelectList()
}

const componentDidUpdate = (props, prevProps) => {
  if (prevProps.lastChangeLocation !== props.lastChangeLocation) {
    props.resetState()
    props.setHeaders()
    props.setEntitiesByHref()
  }

  if (props.prev.href !== getCurrentWindow('href')) {
    const decodedExtendedData = extendedData('decode')
    const { searchName, orderName, orderType } = decodedExtendedData

    props.setCurrentLocation({
      href: getCurrentWindow('href'),
      path: getCurrentWindow('path'),
      querystring: getCurrentWindow('querystring'),
      extendedData: decodedExtendedData,
    })

    props.setFilterPagination({
      searchName: (searchName || ''),
      orderName: (orderName || ''),
      orderType: (orderType || ''),
    })

    props.setHeaders()
    props.setEmptyEntities()
    props.setEntitiesByHref()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
