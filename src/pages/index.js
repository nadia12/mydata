import React from 'react'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import MyData from './my-data/list'

const store = configStore()

export default () => (
  <Provider store={store}>
    <MyData />
  </Provider>
)