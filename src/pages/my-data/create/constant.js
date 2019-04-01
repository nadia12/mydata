import { stateStatus } from 'Config/constants'

export const TITLE = {
  sql: 'Database',
  device: 'IOT',
  file: 'File'
};

export const CREATE_TYPE = {
  sql: 'sql',
  device: 'device',
  file: 'file',
  media: 'media',
  folder: 'folder',
  sensor: 'sensor',
  sensorgroup: 'sensorgroup'
}

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
export const TITLE_NAME = {
  sql: 'New Database',
  device: 'New IoT Device',
  file: 'New File',
  media: 'New file: Image or Video'
};

export const BUTTON_ADD = {
  sql: 'Add Database',
  device: 'Add IoT Device',
  file: 'Add File',
  media: 'Upload'
};

export const LOADING_TEXT = {
  addDatasourceState: 'Checking your configuration',
  getSampleTableConnectorState: 'Synchronizing',
  getSampleDataConnectorState: 'Synchronizing'
};

export const createConnector = {
  sensorType: [],
  sensorProperties: [],
  sampleData: {},
  sampleDataOptions: {},
  tableList: [],
  token: '',
  PK: {},
  filePath: '',
  fileSize: 0,
  getFilePathState: stateStatus.idle,
  getSampleDataConnectorState: stateStatus.idle,
  getSampleTableConnectorState: stateStatus.idle,
  getSensorTypeState: stateStatus.idle,
  getSensorPropertiesState: stateStatus.idle,
  createSensorState: stateStatus.idle,
  addDatasourceState: stateStatus.idle,
  errorMsg: '',
  errorTitle: ''
};

export const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: '',
  layout: { allowNext: this.type || '' === CREATE_TYPE.device, step: 0, isBack: false },
  data: {
    step0: {}, step1: {}, step2: [], step3: {}
  },
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {
    errorModal: false
  },
  files: { status: 0, file: '' },
  name: '',
  headers: {},
  createConnector: { ...createConnector }
}
