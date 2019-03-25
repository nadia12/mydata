import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import configStore from '../redux/store'
import List from './my-data/list'

const store = configStore()

export const MyDataListApp = ({ authCookie }) => (
  <Provider store={store}>
    <List authCookie={authCookie} />
  </Provider>
)

MyDataListApp.propTypes = {
  authCookie: PropTypes.string
}

MyDataListApp.defaultProps = {
  authCookie: ''
}
