import {
  jLocation,
  getLocation,
  jBreadcrumb,
  isInTrash,
} from '../local-helper'

const componentDidMount = props => {
  props.setHeaders()
  if (!getLocation()) props.setRootLocation() // set default if location not exist

  if (isInTrash()) props.handleChangeLocation(jLocation().name)
  else props.setEntityList()

  props.setLastLocation({ location: jLocation(), breadcrumb: jBreadcrumb() })
}

const componentDidUpdate = (props, prevProps) => {
  if (prevProps.lastChangeLocation !== props.lastChangeLocation) {
    props.resetState()
    props.setHeaders()
    props.setEntityList()
  }

  if (props.last.location.name !== jLocation().name) {
    props.setLastLocation({ location: jLocation(), breadcrumb: jBreadcrumb() })
    props.resetPagination()
    props.setEmptyEntities()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
