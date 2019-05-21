import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Sidebar from './units'
import { actionTypes } from '../auth'
import { routes } from '../../config/constants'

const superagent = require('superagent')

const mapStateToProps = ({ volantisConstant }) => ({
  mlStudioUrl: volantisConstant.routes.mlStudio.root,
})

const mapDispatchToProps = (dispatch, props) => ({
  handleChangeLocation: type => {
    const locationRoutes = {
      myData: routes.myData.root,
      xplorer: routes.xplorer.root + routes.xplorer.dashboard,
      apiManagement: routes.apiManagement.root,
      userManagement: routes.userManagement.root,
    }

    if (typeof window !== 'undefined' && window !== null) {
      window.localStorage.removeItem('MYDATA.location')
      window.localStorage.removeItem('MYDATA.breadcrumb')
    }

    props.history.push({ pathname: locationRoutes[type], state: { lastChangeLocation: new Date() } })
  },
  logout: () => dispatch(
    async (dispatch, getState) => {
      try {
        const cookie = new Cookies()
        const {
          cookie: { user, auth },
          topLevelDomain,
          service: { host, endpoint },
        } = getState().volantisConstant
        await superagent
          .delete(`${host + endpoint.webAPI}/sessions/logout/?access_token=${cookie.get(auth)}`)
        cookie.remove(auth, { path: '/', domain: topLevelDomain })
        cookie.remove(user, { path: '/', domain: topLevelDomain })
        dispatch({ type: actionTypes.setIsAuthenticated, isAuthenticated: false })
        props.history.replace(routes.login)
      } catch (err) {
        alert('failed to logout, please try again..') // eslint-disable-line
      }
    }
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
