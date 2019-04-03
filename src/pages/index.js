import React from 'react'
import PropTypes from 'prop-types'
import {
  Provider,
} from 'react-redux'

import ErrorBoundary from 'GlobalComponent/error-boundary'
import ApiManagement from 'Pages/api-management'
import List from 'Pages/my-data/list'
import Create from 'Pages/my-data/create'
import configStore from 'Redux/store'

const store = configStore()

export const MyDataListApp = () => (
  <Provider store={store}>
    <List authCookie='SID_IQ' />
  </Provider>
)

export const ApiManagementApp = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <ApiManagement authCookie='SID_IQ' />
    </Provider>
  </ErrorBoundary>
)

export const MyDataCreateApp = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Create authCookie='SID_IQ' />
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

MyDataCreateApp.propTypes = {
  authCookie: PropTypes.string,
}

MyDataCreateApp.defaultProps = {
  authCookie: '',
}
