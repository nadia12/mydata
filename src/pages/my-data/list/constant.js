import React from 'react'
import { replacer } from '../../../config/constants';
import colors from 'Asset/css/colors'
import { 
  TrashFolderIcon,
  DatasetIcon,
  MyModelIcon,
} from 'volantis-icon'

export const INPUT_MAX_LENGTH = {
  dataSourceName: 260
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

export const FILE_TYPES = {
  COLLECTION: 'COLLECTION',
  ITEM: 'ITEM',
  MODEL: 'Model',
  DATASET: 'Dataset'
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

const DEFAULT_ENTITY = { 
  creatorName: '-', 
  type: 'System Folder', 
  size: '-', 
  updatedAt: '-', 
  status: '-' 
};

export const staticFolders = [
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my dataset',
      name: 'My Dataset',
    },
    icon: <DatasetIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my model',
      name: 'My Model'
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'pretrained model',
      name: 'Pre-Trained Model',
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY,
      idx: 'my trash',
      name: 'Trash'
    },
    icon: <TrashFolderIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  }
]
