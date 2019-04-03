import {
  combineReducers,
} from 'redux'

import mydataList from 'Pages/my-data/list/reducer'
import amList from 'Pages/api-management/units/list/reducer'
import amGlobal from 'Pages/api-management/reducer'
// import apiManagementCreate from 'Pages/api-management/modal-new/reducer'
import amOverview from 'Pages/api-management/units/tab-overview/reducer'
// import apiManagementUsage from 'Pages/api-management/tab-usage/reducer'
// import apiManagementUser from 'Pages/api-management/tab-users/reducer'
import mydataCreate from 'Pages/my-data/create/reducer'

const reducer = {
  _mydataList: mydataList,
  _mydataCreate: mydataCreate,
  _apiManagementList: amList,
  _apiManagementGlobal: amGlobal,
  // _apiManagementCreate: apiManagementCreate,
  _apiManagementOverview: amOverview,
  // _apiManagementUsage: apiManagementUsage,
  // _apiManagementUser: apiManagementUser
}

export default combineReducers(reducer)
