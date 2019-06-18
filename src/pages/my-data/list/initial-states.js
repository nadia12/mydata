import { REPLACER } from 'Config/constants'

export const INPUT_MAX_LENGTH = {
  dataSourceName: 260,
}

const DEFAULT_FIELDS = {
  newFolder: {
    touched: {},
    required: ['folderName'],
    fields: [
      {
        name: 'Folder Name', key: 'folderName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  },
  editConfigurationSQL: {
    touched: {},
    required: ['databaseName', 'host', 'port', 'username', 'password'],
    fields: [
      {
        name: 'Database Name', key: 'databaseName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Host', key: 'host', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Port', key: 'port', replacer: REPLACER.numeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Password', key: 'password', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  },
  editConfigurationFile: {
    touched: {},
    required: ['filename', 'url'],
    fields: [
      {
        name: 'File Name', key: 'filename', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'URL', key: 'url', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  },
  newSensorGroup: {
    touched: {},
    required: ['sensorGroupName'],
    fields: [
      {
        name: 'Sensor Group Name', key: 'sensorGroupName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Description', key: 'description', replacer: REPLACER.specialAlphaNumeric,
      },
      {
        name: 'Sensor', key: 'sensors', replacer: REPLACER.default, type: 'checkgroup',
      },
    ],
  },
}

export const DEFAULT_MODAL = {
  addNew: false,
  disabledApp: false,
  changeUrlDatasource: false,
  addToPipelineEmpty: false,
}

export const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  entities: [],
  models: [],
  lastSelected: '',
  apiKey: '',
  sensors: [],
  sensorsgroup: [],
  connectorsData: [],
  location: '', // Model, Dataset, other
  actionPermission: {},
  position: { left: 0, top: 0 },
  menuList: [],
  headers: {
    'V-DRIVEID': '',
    'V-CREATORNAME': '',
    'V-CREATORID': '',
    'V-PARENTID': '',
    'V-PATH': '',
  },
  entityQuery: {

  },
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ',
  sort: {
    orderName: 'updatedAt', // See for thead Mydata => name, creatorName, updatedAt, size, type, status
    orderType: 'DESC',
  },

  show: {
    menubar: false,
    newFolder: false,
    newSensorGroup: false,
    confirmationModal: false,
    assetDetail: false,
    infoDrawer: false,
    entityContent: false,
    menubarRight: false,
    snackbarUpload: false,
    editConfigurationSQL: false,
    editConfigurationFile: false,
    errorToast: false,
  },
  isValid: {
    newFolder: false,
    newSensorGroup: false,
    editConfigurationSQL: false,
    editConfigurationFile: false,
  },
  fields: {
    newFolder: {},
    newSensorGroup: {},
    editConfigurationSQL: {},
    editConfigurationFile: {},
  },
  search: {
    newSensorGroup: '',
    list: '',
    listType: 'Type',
  },
  selected: {
    sensorgroup: [],
    sensor: [],
    datasource: [],
    folder: [],
    asset: [],
    dashboard: [],
    connector: [],
    pipeline: [],
    parquet: [],
  },
  appLists: [],
  filteredAsset: [],
  functionDoc: {},
  rules: { ...DEFAULT_FIELDS },
  modalData: {
    type: '',
    menu: '',
    status: 'warning', // ['success', 'failed', 'warning']
  },
  ellipsis: {
    hasOverflowingText: false,
    text: '',
  },
  prev: {
    href: '',
    path: '',
    q: {},
    querystring: { q: '' },
  },
  pagination: {
    page: -1,
  },
  isEntitiesLoading: false,
  lastEntitiesLength: 20,
  assetDetail: {
    show: false,
    mp: {},
  },
  allFolders: [],
}

export const initialStates = {
  ...DEFAULT_STATE,
}
