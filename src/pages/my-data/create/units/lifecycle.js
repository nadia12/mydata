import QueryString from 'query-string'

function componentDidMount(props) {
  if (typeof window !== 'undefined' && window !== null) {
    const parsed = QueryString.parse(window.location.search) || {}
    const type = parsed.type || 'default'
    props.resetFields()
    props.setType({ type })
  }
}

export default {
  componentDidMount,
}
