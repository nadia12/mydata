import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { reducer } from 'volantis-mydata'
import promiseMiddleware from '../middleware/promiseMiddleware'
import shuttleMiddleware from '../middleware/shuttleMiddleware'

import config from '../../config'
import ApiCall from '../../utils/ApiCall'

const enabledCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers = (config.env !== 'production') ? enabledCompose : compose
console.log('ini reducer lalalalalala')
const promise = promiseMiddleware(ApiCall)
const shuttle = shuttleMiddleware()

const middlewares = [
  thunk,
  shuttle,
  promise,
]
// if (config.env === 'development') {
//   const { logger } = require('redux-logger')
//   middlewares.push(logger)
// }

const rootReducers = combineReducers({ volantis_mydata: combineReducers(reducer) })

export default initialState => (
  createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
)
