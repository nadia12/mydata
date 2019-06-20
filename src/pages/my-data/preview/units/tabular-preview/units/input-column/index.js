import {
  connect,
} from 'react-redux'
import InputColumn from './units'
import {
  handleColumnChangeInput,
  handleColumnEnter,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  searchColumns: _mydataPreview.searchColumns,
})

const mapDispatchToProps = dispatch => ({
  handleColumnEnter: () => dispatch(handleColumnEnter()),
  onDebounceInput: params => {
    if (!!params.value) return dispatch(handleColumnChangeInput(params))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InputColumn)
