import { connect } from 'react-redux'
import MyData from './units'

const mapStateToProps = state => ({
  // count: state._mydata.count
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
