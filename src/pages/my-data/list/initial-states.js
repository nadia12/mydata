
import { replacer } from 'Config/constants'

export const INPUT_MAX_LENGTH = {
  dataSourceName: 260,
}

const DEFAULT_FIELDS = {
  newFolder: {
    touched: {},
    required: ['folderName'],
    fields: [
      {
        name: 'Folder Name',
        key: 'folderName',
        replacer: replacer.specialAlphaNumeric,
        maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  },
  newSensorGroup: {
    touched: {},
    required: ['sensorGroupName'],
    fields: [
      {
        name: 'Sensor Group Name',
        key: 'sensorGroupName',
        replacer: replacer.specialAlphaNumeric,
        maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Description',
        key: 'description',
        replacer: replacer.specialAlphaNumeric,
      },
      {
        name: 'Sensor',
        key: 'sensors',
        replacer: replacer.default,
        type: 'checkgroup',
      },
    ],
  },
}

export const DEFAULT_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  entities: [],
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
  authCookie: 'SID_IQ',
  userInfo: 'DIS_IQ',
  sort: {
    activeField: 'origUpdatedAt', // See for thead above => name, creatorName, updatedAt, size, type
    isAsc: true,
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
    asset: [
      // INI SAMPLE, HARUS DIHAPUS!
      {
        name: 'tes SEM_Flight_Generic_RLSA_edit_clicks',
        endPoints: [
          {
            url: 'http://iq.volantis.io/v1/predict/async/model/778b7282-58fb-11e9-8e3d-e7e9537170ff',
            type: 'Async',
          },
          {
            url: 'http://iq.volantis.io/v1/predict/async/model/result/{requestId}',
            type: 'Async Result',
          },
          {
            url: 'http://iq.volantis.io/v1/predict/sync/model/778b7160-58fb-11e9-8e3d-e7e9537170ff',
            type: 'Sync',
          },
        ],
        type: 'Model',
        size: '-',
        origSize: null,
        updatedAt: '07 Apr 2019 13:06',
        origUpdatedAt: '2019-04-07T06:06:46.730Z',
        createdAt: 'April 7, 1:06 PM',
        status: 'DONE',
        creatorName: '',
        id: '776590d0-58fb-11e9-8e3d-e7e9537170ff',
        metricPerformance: {
          r2: 0.8173420429229736,
        },
        ntype: 'asset',
        idx: 3,
        labelType: 'Model',
      },
      // DIATAS INI SAMPLE, HARUS DIHAPUS!
    ],
  },
  filteredAsset: [],
  functionDocs: [],
  rules: { ...DEFAULT_FIELDS },
  modalData: {
    type: '', // based on const CONFIRMATION_CONTENT ['addToPipelineEmpty', addToSensorGroup, addToPipelineEmpty]
    menu: '',
    status: 'warning', // ['success', 'failed', 'warning']
  },
}

export const initialStates = {
  ...DEFAULT_STATE,
}
