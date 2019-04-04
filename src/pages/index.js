import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import configStore from 'Redux/store'
import ApiManagement from 'Pages/api-management'
import ErrorBoundary from 'GlobalComponent/error-boundary'
import List from 'Pages/my-data/list'

const store = configStore()

const COOKIE_PROPS = {
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ',
}

export const MyDataListApp = () => (
  <Provider store={store}>
    <List {...COOKIE_PROPS} />
  </Provider>
)

export const ApiManagementApp = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ApiManagement {...COOKIE_PROPS} />
    </Provider>
  </ErrorBoundary>
)

MyDataListApp.propTypes = {
  authCookie: PropTypes.string,
}

MyDataListApp.defaultProps = {
  authCookie: '',
}

ApiManagementApp.propTypes = {
  authCookie: PropTypes.string,
}

ApiManagementApp.defaultProps = {
  authCookie: '',
}
