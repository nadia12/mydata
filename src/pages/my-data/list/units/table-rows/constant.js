import React from 'react'
import colors from 'Asset/css/colors'
import {
  TrashFolderIcon,
  FolderIcon,
  DatasetIcon,
  MyModelIcon,
  FileIcon,
  DatabaseIcon,
  DeviceIcon,
  SensorGroupIcon,
  ImageIcon,
  FileCsvIcon,
  FileXlsIcon,
  DashboardIcon,
} from 'volantis-icon'

// *** HARUS DIHAPUS SETELAH MIGRASI LIBRA SELESAI */
// import { LOCATIONS } from '../../constant'
// import { handleChangeLocation } from '../../function'

const DEFAULT_ENTITY = {
  creatorName: '-',
  type: 'System Folder',
  size: '-',
  updatedAt: '-',
  status: '-',
}

export const SYSTEM_FOLDERS = () => () => [
  {
    en: {
      ...DEFAULT_ENTITY,
      idx: 'my dataset',
      name: 'My Dataset',
    },
    icon: <DatasetIcon color={colors.gold} />,
    isSelected: false,
    oneClick: { isActive: false, action: () => null },
    // doubleClick: { isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.DATASET)) },
  },
  {
    en: {
      ...DEFAULT_ENTITY,
      idx: 'my model',
      name: 'My Model',
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    oneClick: { isActive: false, action: () => null },
    // doubleClick: { isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.MODEL)) },
  },
  {
    en: {
      ...DEFAULT_ENTITY,
      idx: 'pretrained model',
      name: 'Pre-Trained Model',
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    oneClick: { isActive: false, action: () => null },
    // doubleClick: { isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.PRETRAINED_MODEL)) },
  },
  {
    en: {
      ...DEFAULT_ENTITY,
      idx: 'my trash',
      name: 'Trash',
    },
    icon: <TrashFolderIcon color={colors.gold} />,
    isSelected: false,
    oneClick: { isActive: false, action: () => null },
    // doubleClick: { isActive: true, action: () => dispatch(handleChangeLocation(LOCATIONS.TRASH)) },
  },
]

// *** === */

export const DEFAULT_TYPE_LABEL = 'Type'

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE',
}

export const NTYPES = {
  SENSOR: 'sensor',
  SENSORGROUP: 'sensorgroup',
  DATASOURCE: 'datasource',
  FOLDER: 'folder',
  ASSET: 'asset',
}

export const ENTITY_ICON = {
  XPLORER: 'xplorer',
  FILE_CSV: 'csv',
  FILE_XLS: 'xls',
  FILE_IMAGE: 'image',
  DEVICE_GROUP_SENSOR: 'sensorgroup',
  DEVICE_SENSOR: 'iotdevice',
  SQL_MYSQL: 'sql',
  COLLECTION: 'folder',
  FOLDER: 'folder',
  'My Dataset': 'dataset',
  'My Model': 'model',
  'Pre-Trained Model': 'pretrained_model',
  Trash: 'trash',
}

export const SET_ICON = (iconName, isSelected) => {
  const icons = {
    Model: <MyModelIcon color={colors.gold} />,
    pretrained_model: <MyModelIcon color={colors.gold} />,
    Dataset: <DatasetIcon color={colors.gold} />,
    trash: <TrashFolderIcon color={colors.gold} />,
    sensorgroup: <SensorGroupIcon color={isSelected ? colors.black : colors.gold} />,
    folder: <FolderIcon color={isSelected ? colors.black : colors.gold} />,
    dataset: <DatasetIcon color={isSelected ? colors.black : colors.gold} />,
    image: <ImageIcon color={isSelected ? colors.black : colors.gold} />,
    iotdevice: <DeviceIcon color={isSelected ? colors.black : colors.gray} />,
    sql: <DatabaseIcon color={isSelected ? colors.black : colors.gray} />,
    csv: <FileCsvIcon color={isSelected ? colors.black : colors.gray} />,
    xls: <FileXlsIcon color={isSelected ? colors.black : colors.gray} />,
    xplorer: <DashboardIcon color={isSelected ? colors.black : colors.gray} />,
    default: <FileIcon color={isSelected ? colors.black : colors.gray} />,
  }

  return icons[iconName] || icons.default
}

export const SENSOR_STATUS = {
  mappingRequired: 'MAPPING_REQUIRED',
  waitingForData: 'WAITING_FOR_DATA',
}

export const DATASOURCE_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SYNC_FAILED: 'SYNC FAILED',
  SYNC_SUCCESS: 'SYNC SUCCESS',
  SYNCRONIZING: 'SYNCRONIZING',
}
