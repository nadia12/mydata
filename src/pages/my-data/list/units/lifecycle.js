import { isInSystemFolder, jLocation, getLocation } from '../local-helper'

const componentDidMount = props => {
  props.setHeaders()
  if (!getLocation()) props.setRootLocation() // set default if location not exist

  if (isInSystemFolder()) props.handleChangeLocation(jLocation().name)
  else props.setEntityList()
}

const componentDidUpdate = (props, prevProps) => {
  if (prevProps.lastChangeLocation !== props.lastChangeLocation) {
    props.resetState()
    props.setEntityList()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
