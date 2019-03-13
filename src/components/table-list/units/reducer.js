import { createReducer } from 'Redux/initializer'
import { stateStatus } from 'Config/constants';


import {
  PUT_APP_REQUEST,
  PUT_APP_SUCCESS,
  PUT_APP_ERROR,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  preview: {},
  datasets: []
}

export const listMyData = {
    isLoading: false,
    isError: false,
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
    errorMessage: ''
  };

export default createReducer(initialState, {
  [PUT_APP_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [PUT_APP_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
    isError: false,
    errorMessage: ''
  }),
  [PUT_APP_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
})