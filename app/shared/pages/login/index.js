import { connect } from 'react-redux'
import Login from './units'

import { actionTypes } from '../../components/auth'

const mapStateToProps = ({ volantisConstant, authorization }) => ({
  service: {
    host: volantisConstant.service.host,
    webAPI: volantisConstant.service.endpoint.webAPI,
  },
  cookies: {
    auth: volantisConstant.cookie.auth,
    user: volantisConstant.cookie.user,
  },
  isAuthenticated: authorization.isAuthenticated,
})

const mapDispatchToProps = ({
  setIsAuthenticated: isAuthenticated => ({
    type: actionTypes.setIsAuthenticated,
    isAuthenticated,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
