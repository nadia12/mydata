import React from 'react'
import PropTypes from 'prop-types'
import {
  Provider
} from 'react-redux'

import ErrorBoundary from 'GlobalComponent/error-boundary'
import ApiManagement from 'Pages/api-management'
import List from 'Pages/my-data/list'
import Create from 'Pages/my-data/create'
import configStore from 'Redux/store'

const store = configStore()

const MyDataListApp = props => (
  <Provider store={store}>
    <List authCookie={props.authCookie} userInfo={props.userInfo} />
  </Provider>
)

const ApiManagementApp = props => (
  <ErrorBoundary>
    <Provider store={store}>
      <ApiManagement authCookie={props.authCookie} userInfo={props.userInfo} />
    </Provider>
  </ErrorBoundary>
)

const MyDataCreateApp = props => (
  <ErrorBoundary>
    <Provider store={store}>
      <Create authCookie={props.authCookie} userInfo={props.userInfo} />
    </Provider>
  </ErrorBoundary>
)

MyDataListApp.propTypes = {
  authCookie: PropTypes.string,
  userInfo: PropTypes.string
}

MyDataListApp.defaultProps = {
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ'
}

ApiManagementApp.propTypes = {
  authCookie: PropTypes.string,
  userInfo: PropTypes.string
}

ApiManagementApp.defaultProps = {
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ'
}

MyDataCreateApp.propTypes = {
  authCookie: PropTypes.string,
  userInfo: PropTypes.string
}

MyDataCreateApp.defaultProps = {
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ'
}

export {
  MyDataCreateApp,
  MyDataListApp,
  ApiManagementApp
}
