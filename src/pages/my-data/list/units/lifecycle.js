import { isInSystemFolder, jLocation, getLocation } from '../local-helper'

const componentDidMount = props => {
  props.setHeaders()
  if (!getLocation()) props.setRootLocation() // set default if location not exist

  if (isInSystemFolder()) props.handleChangeLocation(jLocation().name)
  else props.setEntityList()
}

const componentDidUpdate = () => {
}

export default {
  componentDidMount,
  componentDidUpdate,
}
