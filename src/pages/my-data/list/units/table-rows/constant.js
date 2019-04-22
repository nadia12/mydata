import React from 'react'
import colors from 'Asset/css/colors'
import {
  FolderIcon,
  DatasetIcon,
  ModelIcon,
  FileIcon,
  DatabaseIcon,
  DeviceIcon,
  SensorGroupIcon,
  ImageIcon,
  FileCsvIcon,
  FileXlsIcon,
  DashboardIcon,
} from 'volantis-icon'

export const DEFAULT_TYPE_LABEL = 'Type'

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE',
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
  MODEL: 'model',
  DATASET: 'dataset',
  MODEL_PRETRAINED: 'pretrained_model',
}

export const SET_ICON = (iconName, isSelected) => {
  const icons = {
    sensorgroup: <SensorGroupIcon color={isSelected ? colors.black : colors.gold} />,
    folder: <FolderIcon color={isSelected ? colors.black : colors.gold} />,
    model: <ModelIcon color={isSelected ? colors.black : colors.gray} />,
    pretrained_model: <ModelIcon color={isSelected ? colors.black : colors.gray} />,
    dataset: <DatasetIcon color={isSelected ? colors.black : colors.gray} />,
    image: <ImageIcon color={isSelected ? colors.black : colors.gray} />,
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
