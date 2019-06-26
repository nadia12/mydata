import {
  connect,
} from 'react-redux'
import InputColumn from './units'
import {
  handleColumnEnter,
  saveValueColumn,
} from './function'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({
  handleColumnEnter: params => dispatch(handleColumnEnter(params)),
  saveValueColumn: params => dispatch(saveValueColumn(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InputColumn)
