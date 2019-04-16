import { isInSystemFolder, jLocation } from '../local-helper'

const componentDidMount = props => {
  props.setAuthCookie({ authCookie: props.authCookie })
  props.setUserInfo({ userInfo: props.userInfo })
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
