import React from 'react'
import colors from '../../../assets/css/colors'
import { 
  TrashFolderIcon,
  DatasetIcon,
  MyModelIcon,
} from 'volantis-icon'

export const initialStates = {
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
  // rules: { ...DEFAULT_FIELDS },
  modalData: {
    type: '',
    menu: '',
    status: 'warning' // ['success', 'failed', 'warning']
  },
  location: '' // Model, Dataset, other
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