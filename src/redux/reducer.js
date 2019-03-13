import { combineReducers } from 'redux'

import mydata from '../pages/my-data/reducer'
import amList from '../pages/api-management/units/list/reducer'
import amGlobal from '../pages/api-management/reducer'
// import apiManagementCreate from '../pages/api-management/modal-new/reducer'
import amOverview from '../pages/api-management/units/tab-overview/reducer'
// import apiManagementUsage from '../pages/api-management/tab-usage/reducer'
// import apiManagementUser from '../pages/api-management/tab-users/reducer'

const reducer = {
  _mydata: mydata,
  _apiManagementList: amList,
  _apiManagementGlobal: amGlobal,
  // _apiManagementCreate: apiManagementCreate,
  _apiManagementOverview: amOverview,
  // _apiManagementUsage: apiManagementUsage,
  // _apiManagementUser: apiManagementUser
}

export default combineReducers(reducer)

