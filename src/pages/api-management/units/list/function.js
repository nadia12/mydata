import {
  GET_APP_LIST_REQUEST,
  GET_APP_LIST_SUCCESS,
  GET_APP_LIST_ERROR,
  GET_APP_DETAIL_REQUEST,
  GET_APP_DETAIL_SUCCESS,
  GET_APP_DETAIL_ERROR,
  GET_FILTERED_APP_LIST_REQUEST,
  GET_FILTERED_APP_LIST_SUCCESS,
  GET_FILTERED_APP_LIST_ERROR,
  SET_SELECTED_APP
} from './action-type'
import Method from '../../../../config/constants/request-method'
import Hostname from '../../../../config/constants/hostname'

export const getAppDetail = ({ authCookie = 'SID_IQ', id = '' }) => {
  return {
    type: [
      GET_APP_DETAIL_REQUEST,
      GET_APP_DETAIL_SUCCESS,
      GET_APP_DETAIL_ERROR
    ],
    shuttle: {
      path: `/v1/app/${id}`,
      method: Method.get
    },
    endpoint: Hostname.apiManagement,
    authCookie
  }
}

export const getAppList = ({ authCookie = 'SID_IQ' }) => {
  return {
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
  }
}

export const getFilteredAppList = ({ authCookie = 'SID_IQ', search = '' }) => {
  const shuttle = {
    path: `/v1/app/search?name=${search || ''}`,
    method: Method.get
  }
  return {
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
  }
}

export const setSelectedApp = ({ id = '' }) => ({
  type: SET_SELECTED_APP,
  payload: id
}) 