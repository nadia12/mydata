import { combineReducers } from 'redux'
import { constant } from 'volantis-module'
import { reducer as myDataReducer } from 'volantis-mydata'
import { authorization } from '../components/auth'

import { routes } from '../config/constants'

const rootReducer = combineReducers({
  volantisConstant: constant({
    routes: {
      ...routes,
      mlStudio: {
        root: process.env.ML_STUDIO_URL || 'http://staging-iq-mlstudio.volantis.io/create',
      },
    },
    topLevelDomain: process.env.TOP_LEVEL_DOMAIN || '',
  }),
  volantisMyData: combineReducers(myDataReducer),
  authorization,
})

export default rootReducer
