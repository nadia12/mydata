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

const heightWidth = { width: '20px', height: '20px' }

export const SET_ICON = (iconName, isSelected) => {
  const icons = {
    sensorgroup: <SensorGroupIcon color={isSelected ? colors.black : colors.gold} {...heightWidth} />,
    folder: <FolderIcon color={isSelected ? colors.black : colors.gold} {...heightWidth} />,
    model: <ModelIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    pretrained_model: <ModelIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    dataset: <DatasetIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    image: <ImageIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    iotdevice: <DeviceIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    sql: <DatabaseIcon color={isSelected ? colors.black : colors.gold} {...heightWidth} />,
    csv: <FileCsvIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    xls: <FileXlsIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    dashboard: <DashboardIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    pipeline: <PipelineIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
    default: <FileIcon color={isSelected ? colors.black : colors.gray} {...heightWidth} />,
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
