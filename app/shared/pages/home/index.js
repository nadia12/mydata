import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { routes } from '../../config/constants'

function Home({ isAuthenticated, location }) {
  return isAuthenticated
    ? <Redirect to={routes.myData.root} />
    : <Redirect to={{ pathname: routes.login, state: { from: location.pathname } }} />
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = ({ authorization }) => ({
  isAuthenticated: authorization.isAuthenticated,
})

export default connect(mapStateToProps)(Home)
