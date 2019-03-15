import { combineReducers } from 'redux'

import mydataList from '../pages/my-data/list/reducer'
import mydataTableList from '../components/table-list/reducer'

const reducer = {
  _mydataList: mydataList,
  _mydataTableList: mydataTableList
}

export default combineReducers(reducer)

