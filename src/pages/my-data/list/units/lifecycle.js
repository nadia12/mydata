import {
  getCurrentWindow,
  extendedData,
} from 'Config/lib/url-helper'

import {
  setPrev,
} from 'Config/lib/local-helper'

const componentDidMount = props => {
  props.setEmptyEntities()
  props.resetState()
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

    if (!decodedExtendedData) props.linkTo('/my-data')

    const { searchName, orderName, orderType } = decodedExtendedData

    props.setCurrentLocation({
      href: getCurrentWindow('href'),
      path: getCurrentWindow('path'),
      querystring: getCurrentWindow('querystring'),
      q: decodedExtendedData,
    })

    setPrev({ q: getCurrentWindow('querystring').q, decodedData: decodedExtendedData })

    props.setFilterPagination({
      searchName: (searchName || ''),
      orderName: (orderName || ''),
      orderType: (orderType || ''),
    })

    props.setHeaders()
    props.resetFolders() // reset right click menus
    props.setEmptyEntities()
    props.setEntitiesByHref()
    props.getAllFolders()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
