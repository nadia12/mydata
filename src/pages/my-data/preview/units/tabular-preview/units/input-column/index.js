import {
  connect,
} from 'react-redux'
import InputColumn from './units'
import {
  handleColumnEnter,
} from './function'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({
  handleColumnEnter: params => dispatch(handleColumnEnter(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputColumn)
