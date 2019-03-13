import {
  PUT_APP_REQUEST,
  PUT_APP_SUCCESS,
  PUT_APP_ERROR,
  GET_PREVIEW_DATASET_REQUEST,
  GET_PREVIEW_DATASET_SUCCESS,
  GET_PREVIEW_DATASET_ERROR,
} from './action-type'
import Method from '../../../../config/constants/request-method'
import Hostname from '../../../../config/constants/hostname'

export const getPreview = ({ authCookie = 'SID_IQ', datasetId = '' }) => {
  return {
    type: [
      GET_PREVIEW_DATASET_REQUEST,
      GET_PREVIEW_DATASET_SUCCESS,
      GET_PREVIEW_DATASET_ERROR
    ],
    shuttle: {
      path: `/v1/app/${id}`,
      method: Method.get
    },
    endpoint: Hostname.apiManagement,
    authCookie
  }
}

export const putApp = ({ authCookie = 'SID_IQ', data = {}, id = '' }) => {
  return {
    type: [
      PUT_APP_REQUEST,
      PUT_APP_SUCCESS,
      PUT_APP_ERROR
    ],
    shuttle: {
      path: `/v1/app/${id}`,
      method: Method.put,
      data
    },
    endpoint: Hostname.apiManagement,
    authCookie
  }
}

