import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import ApiManagement from './api-management'
import ErrorBoundary from '../components/error-boundary'
import List from './my-data/list'
import Create from './my-data/create'

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
  authCookie: PropTypes.string
}

MyDataListApp.defaultProps = {
  authCookie: ''
}

ApiManagementApp.propTypes = {
  authCookie: PropTypes.string
}

ApiManagementApp.defaultProps = {
  authCookie: ''
}

MyDataCreateApp.propTypes = {
  authCookie: PropTypes.string
}

MyDataCreateApp.defaultProps = {
  authCookie: ''
}
