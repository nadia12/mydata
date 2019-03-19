import { createReducer } from 'Redux/initializer'
import { stateStatus } from 'Config/constants';

import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,
  GET_CONNECTOR_REQUEST,
  GET_CONNECTOR_SUCCESS,
  GET_CONNECTOR_ERROR
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  entities: [],
  apiKey: '',
  sensors: [],
  sensorsgroup: [],
  connectorsData: [],
  getSortedEntitesState: stateStatus.idle,
  getEntityListState: stateStatus.idle,
  getConnectorsDataState: stateStatus.idle,
  getSensorListState: stateStatus.idle,
  getSensorGroupListState: stateStatus.idle,
  createNewEntityState: stateStatus.idle,
  moveDirectoryState: stateStatus.idle,
  moveToTrashState: stateStatus.idle,
  restoreFromTrashState: stateStatus.idle,
  createNewSensorGroupState: stateStatus.idle,
  addToSensorGroupState: stateStatus.idle,
  syncDatasourceState: stateStatus.idle,
  starredDatasourceState: stateStatus.idle,
  createPipelineState: stateStatus.idle,
}

export default createReducer(initialState, {
  [GET_ENTITY_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [GET_ENTITY_SUCCESS]: (state, payload) => {
    return {
      ...state,
      entities: payload,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  [GET_ENTITY_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
  [GET_CONNECTOR_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [GET_CONNECTOR_SUCCESS]: (state, payload) => {
    return {
      ...state,
      connectorsData: [...payload],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  [GET_CONNECTOR_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
})
