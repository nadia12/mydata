import { isInSystemFolder, jLocation, getLocation } from '../local-helper'

const componentDidMount = props => {
  props.setHeaders()
  props.onOutsideClick()
  props.handleResetSelectList()
  if (!getLocation()) props.setRootLocation() // set default if location not exist

  if (isInSystemFolder()) props.handleChangeLocation(jLocation().name)
  else props.setEntityList()
}

const componentDidUpdate = (props, prevProps) => {
  if (prevProps.lastChangeLocation !== props.lastChangeLocation) {
    props.setEntityList()
  }
}

export default {
  componentDidMount,
  componentDidUpdate,
}
