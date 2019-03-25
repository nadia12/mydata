import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
  SET_AUTH_COOKIE,
} from './action-type'
import Method from '../../config/constants/request-method'
import Hostname from '../../config/constants/hostname'

export const getDatasetList = () => (dispatch, getState) => {
  const { authCookie } = getState()._apiManagementGlobal
  return dispatch ({
    type: [
      GET_DATASET_REQUEST,
      GET_DATASET_SUCCESS,
      GET_DATASET_ERROR
    ],
    shuttle: {
      path: `/v1/dataset`,
      method: Method.get
    },
    endpoint: Hostname.root,
    authCookie
  })
}

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})
