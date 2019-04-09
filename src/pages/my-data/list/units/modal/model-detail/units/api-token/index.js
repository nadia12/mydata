import { connect } from 'react-redux'
import ApiToken from './units'
import { getAccessToken } from '../../function'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  getAccessToken: () => dispatch(getAccessToken()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiToken)
