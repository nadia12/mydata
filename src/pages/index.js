import React from 'react'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import MyData from './my-data'
import ApiManagement from './api-management'
import ErrorBoundary from '../components/error-boundary'

const store = configStore()

export const MyDataApp = () => (
  <Provider store={store}>
    <MyData authCookie='SID_IQ' />
  </Provider>
)

export const ApiManagementApp = () => (
  <Provider store={store}>
    <ApiManagement authCookie='SID_IQ' />
  </Provider>
)