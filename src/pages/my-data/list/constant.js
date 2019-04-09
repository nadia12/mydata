export const FILE_TYPES = {
  COLLECTION: 'COLLECTION',
  ITEM: 'ITEM',
  MODEL: 'Model',
  DATASET: 'Dataset',
}

export const DEFAULT_TYPE_LABEL = 'type'

export const LOCATIONS = {
  PRETRAINED_MODEL: 'Pretrained Model',
  MODEL: 'Model',
  DATASET: 'Dataset',
  TRASH: 'Trash',
  SENSOR_GROUP: 'Sensor Group',
  ROOT: 'ROOT',
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

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE',
}

export const CONFIRMATION_CONTENT = {
  addToSensorGroup: {
    title: 'Are you sure you want to move selected devices?',
    subtitle: 'Only sensor that has Mapping Required status that can be added to your Sensor Group. If you select sensor with other status, it won’t be added to your Sensor Group',
    primaryButton: 'Move Device',
    hasSubmit: true,
  },
  addToPipeline: {
    title: 'Are you sure you want to create pipeline using these selected data sources?',
    subtitle: 'If you select sensor/sensor group that haven\'t received any data after mapping, it won\'t be added to your pipeline. The rest of selected items are good to go.',
    primaryButton: 'Add To Pipeline',
    hasSubmit: true,
  },
  addToPipelineEmpty: {
    title: 'Your datasource is error!',
    subtitle: 'Datasource with error status could not be proceed to pipeline.',
    secondaryButton: 'OK',
  },
  sync: {
    title: 'Synchronizing your database',
    subtitle: 'Initiating synchronization. You can see the sync update in Status column of your database.',
    secondaryButton: 'OK',
  },
  failedToMoveDirectory: {
    title: 'Failed to move directory',
    subtitle: '',
    secondaryButton: 'OK',
  },
  failedCreateEntity: {
    title: 'Failed to create entity',
    subtitle: 'Failed to create entity',
    secondaryButton: 'OK',
  },
  failedSaveData: {
    title: 'Oops! There is unexpected error!',
    subtitle: 'Something wrong happen in Volantis',
    primaryButton: 'Refresh',
    secondaryButton: 'Cancel',
  },
  successMoveToTrash: {
    title: 'Move To Trash Success',
    subtitle: 'Your data source success to move trash.',
    secondaryButton: 'OK',
  },
  failedMoveToTrash: {
    title: 'Move To Trash Failed',
    subtitle: 'Your data source failed to move trash.',
    secondaryButton: 'OK',
  },
  successRestore: {
    title: 'Restore Success',
    subtitle: 'Your data source has been put back on their location',
    secondaryButton: 'OK',
  },
  failedRestore: {
    title: 'Restore Failed',
    subtitle: 'Your data source failed to be put back.',
    secondaryButton: 'OK',
  },
}

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
  FILE_CSV: 'CSV File',
}
