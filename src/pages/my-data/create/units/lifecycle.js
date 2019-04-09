import QueryString from 'query-string'

function componentDidMount(props) {
  const parsed = QueryString.parse(window.location.search) || {}
  const type = parsed.type || 'default'
  props.setAuthCookie({ authCookie: props.authCookie })
  props.setUserInfo({ userInfo: props.userInfo })
  props.setType({ type })
}

export default {
  componentDidMount
}
