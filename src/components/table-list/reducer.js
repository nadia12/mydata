import { createReducer } from 'Redux/initializer'
import { stateStatus } from 'Config/constants';


import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
} from './action-type'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  preview: {},
  datasets: []
}

// const initialState = {
//     isLoading: false,
//     isError: false,
//     entities: [],
//     apiKey: '',
//     sensors: [],
//     sensorsgroup: [],
//     connectorsData: [],
//     getSortedEntitesState: stateStatus.idle,
//     getEntityListState: stateStatus.idle,
//     getConnectorsDataState: stateStatus.idle,
//     getSensorListState: stateStatus.idle,
//     getSensorGroupListState: stateStatus.idle,
//     createNewEntityState: stateStatus.idle,
//     moveDirectoryState: stateStatus.idle,
//     moveToTrashState: stateStatus.idle,
//     restoreFromTrashState: stateStatus.idle,
//     createNewSensorGroupState: stateStatus.idle,
//     addToSensorGroupState: stateStatus.idle,
//     syncDatasourceState: stateStatus.idle,
//     starredDatasourceState: stateStatus.idle,
//     createPipelineState: stateStatus.idle,
//     errorMessage: ''
//   };

export default createReducer(initialState, {
  [GET_DATASET_REQUEST]: state => ({
    ...state,
    isLoading: true
  }),
  [GET_DATASET_SUCCESS]: (state, payload) => {
    console.log('=========> masuk sini cuy', payload)
    return {
      ...state,
      datasets: [...payload],
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  },
  [GET_DATASET_ERROR]: (state, payload) => ({
    ...state,
    isLoading: false,
    isError: true,
    errorMessage: payload.message || 'Failed to fetch apps'
  }),
})