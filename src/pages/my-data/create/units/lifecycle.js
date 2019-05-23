import QueryString from 'query-string'

function componentDidMount(props) {
  if (typeof window !== 'undefined' && window !== null) {
    const parsed = QueryString.parse(window.location.search) || {}
    const type = parsed.type || 'default'

    console.log('componentDidMount')
    props.resetFields()
    props.setType({ type })
    props.handleChangeInput({ key: 'uploadType', value: type })
  }
}

export default {
  componentDidMount,
}
