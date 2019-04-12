import {
  combineReducers,
} from 'redux'

import mydataList from 'Pages/my-data/list/reducer'
import mydataCreate from 'Pages/my-data/create/reducer'

const reducer = {
  _mydataList: mydataList,
  _mydataCreate: mydataCreate,
}

export default combineReducers(reducer)
