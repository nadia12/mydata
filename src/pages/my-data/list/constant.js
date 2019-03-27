import React from 'react'
import { replacer } from '../../../config/constants';


export const INPUT_MAX_LENGTH = {
  dataSourceName: 260
}; 

export const FILE_TYPES = {
  COLLECTION: 'COLLECTION',
  ITEM: 'ITEM',
  MODEL: 'Model',
  DATASET: 'Dataset'
};

const DEFAULT_FIELDS = {
  newFolder: {
    touched: {},
    required: ['folderName'],
    fields: [
      { name: 'Folder Name', key: 'folderName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName }
    ]
  },
  newSensorGroup: {
    touched: {},
    required: ['sensorGroupName'],
    fields: [
      { name: 'Sensor Group Name', key: 'sensorGroupName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
      { name: 'Description', key: 'description', replacer: replacer.specialAlphaNumeric },
      { name: 'Sensor', key: 'sensors', replacer: replacer.default, type: 'checkgroup' }
    ]
  }
};

export const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  entities: [],
  apiKey: '',
  sensors: [],
  sensorsgroup: [],
  connectorsData: [],

  show: {
    menubar: false,
    newFolder: false,
    newSensorGroup: false,
    confirmationModal: false,
    assetDetail: false,
    infoDrawer: false,
    entityContent: false,
    menubarRight: false
  },
  isValid: { newFolder: false, newSensorGroup: false },
  fields: {
    newFolder: {},
    newSensorGroup: {}
  },
  search: {
    newSensorGroup: '',
    list: '',
    listType: 'Type',
    inFilteredResult: false
  },
  selected: {
    sensorgroup: [],
    sensor: [],
    datasource: [],
    folder: [],
    asset: []
  },
  filteredAsset: [],
  rules: { ...DEFAULT_FIELDS },
  modalData: {
    type: '',
    menu: '',
    status: 'warning' // ['success', 'failed', 'warning']
  },
  location: '' // Model, Dataset, other
};

export const initialStates = {
  ...DEFAULT_STATE
};

export const LOCATIONS = {
  PRETRAINED_MODEL: 'Pretrained Model',
  MODEL: 'Model',
  DATASET: 'Dataset',
  TRASH: 'Trash',
  SENSOR_GROUP: 'Sensor Group',
  ROOT: 'ROOT'
};
