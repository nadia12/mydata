export const INPUT_MAX_LENGTH = {
  dataSourceName: 260,
}

export const TITLE = {
  sql: 'Database',
  device: 'IOT',
  file: 'File',
}

export const CONFIRMATION_CONTENT = {
  cancelUpload: {
    title: 'Are you sure you want to cancel the upload ?',
    subtitle: 'Your upload is not complete. Would you like to cancel the upload?',
    primaryButton: 'Cancel Upload',
    secondaryButton: 'Continue Upload',
  },
  addToSensorGroup: {
    title: 'Are you sure you want to move selected devices?',
    subtitle: 'Only sensor that has Mapping Required status that can be added to your Sensor Group. If you select sensor with other status, it won’t be added to your Sensor Group',
    primaryButton: 'Move Device',
  },
  addToPipeline: {
    title: 'Are you sure you want to create pipeline using these selected data sources?',
    subtitle: 'If you select sensor/sensor group that haven\'t received any data after mapping, it won\'t be added to your pipeline. The rest of selected items are good to go.',
    primaryButton: 'Add To Pipeline',
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
  failedUploadData: {
    title: 'Failed to Upload',
    subtitle: '',
    primaryButton: 'Cancel',
  },
}
export const TITLE_NAME = {
  sql: 'New Database',
  device: 'New IoT Device',
  file: 'New File',
  media: 'New file: Image or Video',
}

export const BUTTON_ADD = {
  sql: 'Add Database',
  device: 'Add IoT Device',
  file: 'Add File',
  media: 'Upload',
}

export const LOADING_TEXT = {
  addDatasourceState: 'Checking your configuration',
  getSampleTableConnectorState: 'Synchronizing',
  getSampleDataConnectorState: 'Synchronizing',
}

export const CREATE_CONNECTOR = {
  sensorType: [],
  sensorProperties: [],
  sampleData: {},
  sampleDataOptions: {},
  tableList: [],
  token: '',
  PK: {},
  filePath: '',
  filesize: 0,
  // getFilePathState: stateStatus.idle,
  // getSampleDataConnectorState: stateStatus.idle,
  // getSampleTableConnectorState: stateStatus.idle,
  // getSensorTypeState: stateStatus.idle,
  // getSensorPropertiesState: stateStatus.idle,
  // createSensorState: stateStatus.idle,
  // addDatasourceState: stateStatus.idle,
  errorMsg: '',
  errorTitle: '',
}

export const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  services: {},
  type: '',
  layout: {},
  // layout: { allowNext: this.type || '' === CREATE_TYPE.device, step: 0, isBack: false, },
  data: {
    step0: {}, step1: {}, step2: {}, mapping: [],
  },
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {
    errorModal: false,
  },
  files: {
    status: 0,
    file: '',
  },
  name: '',
  headers: {},
  createConnector: { ...CREATE_CONNECTOR },
}
