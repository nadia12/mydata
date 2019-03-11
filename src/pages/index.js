import React from 'react'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import MyData from './my-data'
import ErrorBoundary from '../components/error-boundary'

const store = configStore()

export default () => (
  <ErrorBoundary>
    <Provider store={store}>
      <MyData />
    </Provider>
  </ErrorBoundary>
)