import {
  createStore, applyMiddleware, compose, combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { reducer as xplorerReducer } from 'volantis-xplorer'
import { reducer as pipelineReducer } from 'volantis-pipeline'
import { reducer as mydataReducer } from 'volantis-mydata'

import promiseMiddleware from '../middleware/promiseMiddleware'
import shuttleMiddleware from '../middleware/shuttleMiddleware'

import config from '../../config'
import ApiCall from '../../utils/ApiCall'

// const enabledCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const composeEnhancers = (config.env !== 'production') ? enabledCompose : compose

const promise = promiseMiddleware(ApiCall)
const shuttle = shuttleMiddleware()

const middlewares = [
  thunk,
  shuttle,
  promise,
]
if (config.env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const rootReducers = combineReducers({
  xplorer: combineReducers(xplorerReducer),
  volantisPipeline: combineReducers(pipelineReducer),
  volantisMyData: combineReducers(mydataReducer),
})

export default initialState => (
  createStore(
    rootReducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  )
)

