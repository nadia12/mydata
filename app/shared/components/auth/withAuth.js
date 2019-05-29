import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { routes } from '../../config/constants'

export default function withAuth(Component) {
  function AuthComponent({ isAuthenticated, ...props }) {
    return isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{ pathname: routes.login, state: { from: props.location.pathname } }} />
  }

  AuthComponent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  }

  const mapStateToProps = ({ authorization }) => ({
    isAuthenticated: authorization.isAuthenticated,
  })

  return connect(mapStateToProps)(AuthComponent)
}
