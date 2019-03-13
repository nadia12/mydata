import { connect } from 'react-redux'
import MyData from './units'

const mapStateToProps = state => ({
  myData: state._myData
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
