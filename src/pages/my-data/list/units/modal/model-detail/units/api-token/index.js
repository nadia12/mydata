import { connect } from 'react-redux'
import ApiToken from './units'
import { getAccessToken } from '../../function'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => ({
  getAccessToken: () => dispatch(getAccessToken()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiToken)
