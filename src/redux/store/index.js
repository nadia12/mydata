import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import promiseMiddleware from '../middleware/promiseMiddleware'
import shuttleMiddleware from '../middleware/shuttleMiddleware'
import rootReducers from '../reducer'

import config from '../../config'
import ApiCall from '../../utils/ApiCall'

const enabledCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const composeEnhancers = (config.env !== 'production') ? enabledCompose : compose

const promise = promiseMiddleware(ApiCall)
const shuttle = shuttleMiddleware()

console.log('ini TOKEN ==>', promise)

const middlewares = [
  thunk,
  shuttle,
  promise
]
if (config.env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

export default initialState => (
  createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
)

