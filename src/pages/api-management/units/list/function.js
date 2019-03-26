import {
  GET_APP_LIST_REQUEST,
  GET_APP_LIST_SUCCESS,
  GET_APP_LIST_ERROR,
  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,
  SET_SELECTED_APP,
  SET_SEARCH,
} from './action-type'
import Method from '../../../../config/constants/request-method'
import Hostname from '../../../../config/constants/hostname'

export const getAppList = () => (dispatch, getState) => {
  const { authCookie } = getState()._apiManagementGlobal
  return dispatch ({
    type: [
      GET_APP_LIST_REQUEST,
      GET_APP_LIST_SUCCESS,
      GET_APP_LIST_ERROR
    ],
    shuttle: {
      path: '/v1/app/',
      method: Method.get
    },
    authCookie,
    endpoint: Hostname.apiManagement
  })
}

export const getFilteredAppList = ({ search = '' }) => (dispatch, getState) => {
  const { authCookie } = getState()._apiManagementGlobal
  const shuttle = {
    path: `/v1/app/search?name=${search || ''}`,
    method: Method.get
  }
  return dispatch ({
    type: [
      GET_FILTERED_APP_LIST_REQUEST,
      GET_FILTERED_APP_LIST_SUCCESS,
      GET_FILTERED_APP_LIST_ERROR
    ],
    shuttle: {
      path: `/v1/app/search?name=${search || ''}`,
      method: Method.get
    },
    authCookie,
    endpoint: Hostname.apiManagement
  })
}

export const setSelectedApp = ({ id = '' }) => ({
  type: SET_SELECTED_APP,
  payload: id
})

export const setSearch = ({ search = '' }) => ({
  type: SET_SEARCH,
  payload: search
}) 