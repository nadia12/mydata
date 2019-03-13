import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
} from './action-type'
import Method from '../../config/constants/request-method'
import Hostname from '../../config/constants/hostname'

export const getDatasetList = ({ authCookie = 'SID_IQ' }) => {
  return {
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
  }
}

