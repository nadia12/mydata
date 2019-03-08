import { combineReducers } from 'redux'

import mydata from '../pages/my-data/reducer'

const reducer = {
  _mydata: mydata
}

export default combineReducers(reducer)

