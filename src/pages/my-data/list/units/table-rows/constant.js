import React from 'react'
import colors from 'Asset/css/colors'
import { LOCATIONS } from '../../constant'
import { handleChangeLocation } from '../../function'

import { 
  TrashFolderIcon,
  FolderIcon,
  DatasetIcon,
  MyModelIcon,
  FileIcon,
  DatabaseIcon,
  DeviceIcon,
  SensorGroupIcon,
} from 'volantis-icon'

const DEFAULT_ENTITY = { 
  creatorName: '-', 
  type: 'System Folder',
  size: '-', 
  updatedAt: '-', 
  status: '-' 
};

export const SYSTEM_FOLDERS = () => (dispatch, getState) => {
  return [
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my dataset',
      name: 'My Dataset',
    },
    iconSvg: <DatasetIcon color={colors.gold} />,
    isSelected: false,
    oneClick: {isActive: false, action: () => null},
    doubleClick: {isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.DATASET))},
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my model',
      name: 'My Model'
    },
    iconSvg: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    oneClick: {isActive: false, action: () => null},
    doubleClick: {isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.MODEL))},
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'pretrained model',
      name: 'Pre-Trained Model',
    },
    iconSvg: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    oneClick: {isActive: false, action: () => null},
    doubleClick: {isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.PRETRAINED_MODEL))},
  },
  {
    en: { 
      ...DEFAULT_ENTITY,
      idx: 'my trash',
      name: 'Trash'
    },
    iconSvg: <TrashFolderIcon color={colors.gold} />,
    isSelected: false,
    oneClick: {isActive: false, action: () => null},
    doubleClick: {isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.TRASH))},
  }
  ]
}

export const THEAD = [ // THEAD FOR MYDATA
  { name: 'Name', width: '25.84%', origName: 'name', isSortAble: true },
  { name: 'Owner', width: '15.94%', origName: 'creatorName', isSortAble: true },
  { name: 'Type', width: '15.94%', origName: 'labelType', isSortAble: true },
  { name: 'Size', width: '7.9%', origName: 'origSize', isSortAble: true },
  { name: 'Last Updated', width: '15.94%', origName: 'origUpdatedAt', isSortAble: true },
  { name: 'Status', width: '18.34%', origName: 'status', isSortAble: false }
]

export const ENTITY_TYPE_LABEL = {
  DEVICE_GROUP_SENSOR: 'Sensor Group',
  DEVICE_SENSOR: 'IoT Device',
  SQL_MYSQL: 'MySQL',
  SQL_PSQL: 'Postgres',
  SQL_MSSQL: 'MSSQL',
  SQL_DB2: 'DB2',
  SQL_ORACLE_SID: 'Oracle SID',
  SQL_ORACLE_SRV: 'Oracle SRV',
  COLLECTION: 'Folder',
  FILE_XLS: 'XLS File',
  FILE_XLSX: 'XLSX File',
  FILE_CSV: 'CSV File'
};

export const DEFAULT_TYPE_LABEL = 'Type';

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE'
};

export const NTYPES = {
  SENSOR: 'sensor',
  SENSORGROUP: 'sensorgroup',
  DATASOURCE: 'datasource',
  FOLDER: 'folder',
  ASSET: 'asset'
};

export const ENTITY_ICON = {
  DEVICE_GROUP_SENSOR: 'sensorgroup',
  DEVICE_SENSOR: 'iotdevice',
  SQL_MYSQL: 'sql',
  COLLECTION: 'folder',
  FOLDER: 'folder',
  'My Dataset': 'dataset',
  'My Model': 'model',
  'Pre-Trained Model': 'pretrained_model',
  'Trash': 'trash'
};

export const SET_ICON = (iconName, isSelected) => {

  const icons = {
    Model:   <MyModelIcon color={colors.gold} />,
    pretrained_model: <MyModelIcon color={colors.gold} />,
    Dataset: <DatasetIcon color={colors.gold} />,
    Trash:   <TrashFolderIcon color={colors.gold} />,
    sensorgroup: <SensorGroupIcon color={isSelected ? colors.black : colors.gold} />,
    folder:  <FolderIcon color={isSelected ? colors.black : colors.gold} />,
    dataset: <DatasetIcon color={isSelected ? colors.black : colors.gold} />,
    iotdevice: <DeviceIcon color={isSelected ? colors.black : colors.gray} />,
    sql:       <DatabaseIcon color={isSelected ? colors.black : colors.gray} />,
    default: <FileIcon color={isSelected ? colors.black : colors.gray} />,
  }

  return icons[iconName] || icons.default
};

export const SENSOR_STATUS = {
  mappingRequired: 'MAPPING_REQUIRED',
  waitingForData: 'WAITING_FOR_DATA'
};

export const ASSET_STATUS = {
  PENDING: 'PENDING',
  QUEUED: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  WAITING: 'WAITING',
  OK: 'SUCCESS',
  ERROR: 'ERROR',
  DONE: 'DONE',
  FAIL: 'FAIL',
  'IN PROGRESS': 'IN PROGRESS'
};

export const DATASOURCE_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SYNC_FAILED: 'SYNC FAILED',
  SYNC_SUCCESS: 'SYNC SUCCESS',
  SYNCRONIZING: 'SYNCRONIZING'
};