// import React from 'react'
// import PropTypes from 'prop-types'
// import {
//   Provider,
// } from 'react-redux'

// import ErrorBoundary from 'GlobalComponent/error-boundary'
import MyDataList from 'Pages/my-data/list'
import MyDataCreate from 'Pages/my-data/create'
// import configStore from 'Redux/store'

// const store = configStore()

// const MyDataListApp = props => (
//   <Provider store={store}>
//     <List authCookie={props.authCookie} userInfo={props.userInfo} />
//   </Provider>
// )

// const MyDataCreateApp = props => (
//   <ErrorBoundary>
//     <Provider store={store}>
//       <Create authCookie={props.authCookie} userInfo={props.userInfo} />
//     </Provider>
//   </ErrorBoundary>
// )

// MyDataListApp.propTypes = {
//   authCookie: PropTypes.string,
//   userInfo: PropTypes.string,
// }

// MyDataListApp.defaultProps = {
//   authCookie: 'SID_IQ',
//   userInfo: 'DIS_IQ',
// }

// MyDataCreateApp.propTypes = {
//   authCookie: PropTypes.string,
//   userInfo: PropTypes.string,
// }

// MyDataCreateApp.defaultProps = {
//   authCookie: 'SID_IQ',
//   userInfo: 'DIS_IQ',
// }

export {
  MyDataCreate,
  MyDataList,
}
