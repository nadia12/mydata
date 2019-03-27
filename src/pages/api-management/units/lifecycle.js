function componentDidMount(props) {
  props.setAuthCookie(props.authCookie)
  props.getDatasetList()
}

export default {
  componentDidMount
}
