import { isInSystemFolder, jLocation, getLocation } from '../local-helper'

const componentDidMount = props => {
  props.setAuthCookie({ authCookie: props.authCookie })
  props.setUserInfo({ userInfo: props.userInfo })
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
