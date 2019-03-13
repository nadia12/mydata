import { replacer } from 'Config/constants';

export const initialState = {
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

export const INPUT_MAX_LENGTH = {
  dataSourceName: 260
};

export const DEFAULT_FIELDS = {
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

export const CONFIRMATION_CONTENT = {
  addToSensorGroup: {
    title: 'Are you sure you want to move selected devices?',
    subTitle: 'Only sensor that has Mapping Required status that can be added to your Sensor Group. If you select sensor with other status, it won’t be added to your Sensor Group',
    confirmText: 'Move Device',
    hasSubmit: true
  },
  addToPipeline: {
    title: 'Are you sure you want to create pipeline using these selected data sources?',
    subTitle: 'If you select sensor/sensor group that haven\'t received any data after mapping, it won\'t be added to your pipeline. The rest of selected items are good to go.',
    confirmText: 'Add To Pipeline',
    hasSubmit: true
  },
  addToPipelineEmpty: {
    title: 'Your datasource is error!',
    subTitle: 'Datasource with error status could not be proceed to pipeline.',
    cancelText: 'OK'
  },
  sync: {
    title: 'Synchronizing your database',
    subTitle: 'Initiating synchronization. You can see the sync update in Status column of your database.',
    cancelText: 'OK'
  },
  failedToMoveDirectory: {
    title: 'Failed to move directory',
    subtitle: '',
    cancelText: 'OK'
  },
  failedCreateEntity: {
    title: 'Failed to create entity',
    subtitle: 'Failed to create entity',
    cancelText: 'OK'
  },
  failedSaveData: {
    title: 'Oops! There is unexpected error!',
    subTitle: 'Something wrong happen in Volantis',
    confirmText: 'Refresh',
    cancelText: 'Cancel'
  },
  successMoveToTrash: {
    title: 'Move To Trash Success',
    subTitle: 'Your data source success to move trash.',
    cancelText: 'OK'
  },
  failedMoveToTrash: {
    title: 'Move To Trash Failed',
    subTitle: 'Your data source failed to move trash.',
    cancelText: 'OK'
  },
  successRestore: {
    title: 'Restore Success',
    subTitle: 'Your data source has been put back on their location',
    cancelText: 'OK'
  },
  failedRestore: {
    title: 'Restore Failed',
    subTitle: 'Your data source failed to be put back.',
    cancelText: 'OK'
  }
};

export const SENSOR_STATUS = {
  mappingRequired: 'MAPPING_REQUIRED',
  waitingForData: 'WAITING_FOR_DATA'
};

export const ASSET_STATUS = {
  PENDING: 'PENDING',
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

export const TYPE_LIST_OPTIONS = ['Type', 'MySQL', 'PostgreSQL', 'MSSQL', 'DB2', 'Oracle', 'CSV', 'XLS/XLSX'];
export const TYPE_LIST_SEARCH = {
  MySQL: ['SQL_MYSQL'],
  PostgreSQL: ['SQL_PSQL'],
  MSSQL: ['SQL_MSSQL'],
  DB2: ['SQL_DB2'],
  Oracle: ['SQL_ORACLE_SID', 'SQL_ORACLE_SRV'],
  OracleSID: ['SQL_ORACLE_SID'],
  OracleSRV: ['SQL_ORACLE_SRV'],
  Device: ['DEVICE'],
  CSV: ['CSV'],
  XLS: ['XLS'],
  XLSX: ['XLSX'],
  'XLS/XLSX': ['XLS', 'XLSX']
};

// taredit
// masukin semua tipe2nya
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

export const LOCATIONS = {
  MODEL: 'Model',
  DATASET: 'Dataset',
  TRASH: 'Trash',
  SENSOR_GROUP: 'Sensor Group',
  ROOT: 'ROOT'
};

export const FILE_TYPES = {
  COLLECTION: 'COLLECTION',
  ITEM: 'ITEM',
  MODEL: 'Model',
  DATASET: 'Dataset'
};

export const ENTITY_ICON = {
  DEVICE_GROUP_SENSOR: 'sensorgroup',
  DEVICE_SENSOR: 'iotdevice',
  SQL_MYSQL: 'sql',
  COLLECTION: 'folder',
  FOLDER: 'folder',
  'My Dataset': 'dataset',
  'My Model': 'model',
  'Trash': 'trash'
};

export const MODEL_ACCURACY = {
  accuracy: {
    metric_name: 'Accuracy',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of statistical bias, as these cause a difference between a "prediction" value and a "true" value.'
  },
  f1: {
    metric_name: 'F1',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure that combines precision and recall is the harmonic mean of precision and recall.'
  },
  weightedPrecision: {
    metric_name: 'Weighted Prediction',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also called precision or positive predictive value) is the fraction of relevant instances among the retrieved instances.'
  },
  weightedRecall: {
    metric_name: 'Weighted Recall',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also known as sensitivity) is the fraction of relevant instances that have been retrieved over the total amount of relevant instances.'
  },
  silhouette: {
    metric_name: 'Silhouette',
    bottom_limit: -1,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of how similar an object is to its own cluster (cohesion) compared to other clusters (separation).'
  },
  rmse: {
    metric_name: 'RMSE (Root Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a frequently used measure of the differences between values (sample or population values) predicted by a model or an estimator and the values observed.'
  },
  mse: {
    metric_name: 'MSE (Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average of the squares of the errors—that is, the average squared difference between the estimated values and what is estimated.'
  },
  mae: {
    metric_name: 'MAE (Mean Absolute Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average magnitude of the errors in a set of predictions, without considering their direction.'
  },
  areaUnderROC: {
    metric_name: 'AreaUnderROC',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Receiver Operating Characteristic Area Under Curve (ROC AUC) is plotting True Positive Rate (TPR) against False Positive Rate (FPR)'
  },
  areaUnderPR: {
    metric_name: 'AreaUnderPR',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Precision Recall Area Under Curve (PR AUC) is plotting Precision against Recall.'
  }
};
