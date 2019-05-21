import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { promiseMiddleware, shuttleMiddleware, apiCall } from 'volantis-module'
import { configureStore } from '../shared/store'
import App from '../shared/App'

const preloadedState = window.__PRELOADED_STATE__

const promise = promiseMiddleware(
  apiCall(preloadedState.volantisConstant.cookie.auth)
)
const shuttle = shuttleMiddleware(preloadedState.volantisConstant.service.host)

const store = window.store || configureStore({
  initialState: preloadedState,
  middleware: [shuttle, promise],
})

hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }

  if (!window.store) {
    window.store = store
  }
}
