import { combineReducers } from 'redux'

import mydataList from '../pages/my-data/list/reducer'

const reducer = {
  _mydataList: mydataList,
}

export default combineReducers(reducer)

