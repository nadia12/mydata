import QueryString from 'query-string'

function componentDidMount(props) {
  if (!!window) {
    const parsed = QueryString.parse(window.location.search) || {}
    const type = parsed.type || 'default'
    props.setType({ type })
  }
}

export default {
  componentDidMount,
}
