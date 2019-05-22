import React from 'react'
import colors from 'Asset/css/mydata-colors'
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
  PipelineIcon,
} from 'volantis-icon'

export const DEFAULT_TYPE_LABEL = 'Type'

export const ENTITY_ICON = {
  'SQL Database': 'sql',
  'CSV File': 'csv',
  'XLS File': 'xls',
  'XLSX File': 'xls',
  'Image File': 'image',
  'Image Group': 'image_group',
  'IoT Device': 'iotdevice',
  'Sensor Group': 'sensorgroup',
  'Pretrained Model': 'pretrained_model',
  'Parquet File': 'parquet',
  Folder: 'folder',
  Dashboard: 'dashboard',
  Model: 'model',
  Dataset: 'dataset',
  Connector: 'connector',
  Pipeline: 'pipeline',
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
    dashboard: <DashboardIcon color={isSelected ? colors.black : colors.gray} />,
    pipeline: <PipelineIcon color={isSelected ? colors.black : colors.gray} />,
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
