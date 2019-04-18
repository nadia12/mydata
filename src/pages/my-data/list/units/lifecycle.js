import { isInSystemFolder, jLocation } from '../local-helper'

const componentDidMount = props => {
  props.setRootLocation() // set default if location not exist
  props.setHeaders()

  if (isInSystemFolder()) props.handleChangeLocation(jLocation().name)
  else props.setEntityList()
}

const componentDidUpdate = () => {
}

export default {
  componentDidMount,
  componentDidUpdate,
}
