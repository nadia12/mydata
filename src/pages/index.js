import React from 'react'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import MyDataList from './my-data/list'
import MyDataCreate from './my-data/create'

const store = configStore()

export const MyDataListApp = () => (
  <Provider store={store}>
    <MyDataList />
  </Provider>
)

MyDataListApp.propTypes = {

}
MyDataListApp.defaultProps = {
}

export const MyDataCreateApp = () => (
  <Provider store={store}>
    <MyDataCreate />
  </Provider>
)

MyDataCreateApp.propTypes = {

}
MyDataCreateApp.defaultProps = {
}
