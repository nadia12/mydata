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