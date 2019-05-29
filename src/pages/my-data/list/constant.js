export const DEFAULT_TYPE_LABEL = 'type'

export const DATASOURCE_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SYNC_FAILED: 'SYNC FAILED',
  SYNC_SUCCESS: 'SYNC SUCCESS',
  SYNCRONIZING: 'SYNCRONIZING',
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
    primaryButton: 'OK',
  },
  sync: {
    title: 'Synchronizing your database',
    subtitle: 'Initiating synchronization. You can see the sync update in Status column of your database.',
    primaryButton: 'OK',
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
  moveToTrash: {
    title: 'Cant move to trash',
    subtitle: 'This entity cannot be moved, only items with ERROR or SUCCESS status will be moved',
    primaryButton: 'I Understand',
  },
}

export const THEAD = [ // THEAD FOR MYDATA
  {
    name: 'Name', width: '25.84%', origName: 'name', isSortAble: true,
  },
  {
    name: 'Owner', width: '15.94%', origName: 'creatorName', isSortAble: true,
  },
  {
    name: 'Type', width: '15.94%', origName: 'uiEntityType', isSortAble: true,
  },
  {
    name: 'Size', width: '7.9%', origName: 'size', isSortAble: true,
  },
  {
    name: 'Last Updated', width: '15.94%', origName: 'updatedAt', isSortAble: true,
  },
  {
    name: 'Status', width: '18.34%', origName: 'status', isSortAble: true,
  },
]

// *** selected: {
//   sensorgroup: [],
//   sensor: [],
//   datasource: [],
//   folder: [],
//   asset: [],
//   dashboard: [],
//   connector: [],
//   pipeline: [],
//   parquet: [],
// },
export const SELECTED_TYPES = entityType => {
  let type = ''
  const types = {
    datasource: [
      'FILE', 'FILE_CSV', 'FILE_XLS', 'FILE_XLSX', 'FILE_IMAGE', 'SQL',
      'SQL_PSQL', 'SQL_MYSQL', 'SQL_ORACLE_SID',
      'SQL_ORACLE_SRV', 'SQL_DB2', 'SQL_MSSQL', 'SQL Table', 'CSV File',
      'XLS File', 'XLSX File', 'Image File', '',
    ],
    sensor: ['DEVICE', 'DEVICE_SENSOR', 'IoT Device'],
    sensorgroup: ['DEVICE_GROUP_SENSOR', 'Sensor Group'],
    folder: [null, 'COLLECTION', 'FILE_GROUP_IMAGE', 'SQL Database', 'Folder', 'Image Group', 'ITEM_GROUP'],
    asset: ['MODEL_PRETRAINED', 'Model', 'Dataset', 'Pretrained Model'],
    dashboard: ['Dashboard'],
    connector: ['Connector'],
    pipeline: ['Pipeline'],
    parquet: ['Parquet File'],
  }
  Object.entries(types).forEach(([key, values]) => {
    if (values.includes(entityType)) type = key
  })

  return type
}
