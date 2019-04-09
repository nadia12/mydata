import { connect } from 'react-redux'
import FunctionDoc from './units'
import { getTrs } from './function'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  Trs: dispatch(getTrs()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FunctionDoc)
