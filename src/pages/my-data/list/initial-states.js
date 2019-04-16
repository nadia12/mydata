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
  menuList: {},
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
    activeField: 'origUpdatedAt', // See for thead Mydata => name, creatorName, updatedAt, size, type, status(notsortable)
    isAsc: false,
  },

  show: {
    menubar: false,
    newFolder: false,
    newSensorGroup: false,
    confirmationModal: false,
    modelDetail: false,
    datasetDetail: false,
    infoDrawer: false,
    entityContent: false,
    menubarRight: false,
  },
  isValid: { newFolder: false, newSensorGroup: false },
  fields: {
    newFolder: {},
    newSensorGroup: {},
  },
  search: {
    newSensorGroup: '',
    list: '',
    listType: 'Type',
    inFilteredResult: false,
    searchListText: '',
  },
  selected: {
    sensorgroup: [],
    sensor: [],
    datasource: [],
    folder: [],
    asset: [],
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
}

export const initialStates = {
  ...DEFAULT_STATE,
}
