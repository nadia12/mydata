import {
  REPLACER,
} from 'Config/constants'

export const INPUT_MAX_LENGTH = {
  dataSourceName: 260,
}

export const DEFAULT_FIELDS = {
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
      { name: 'Description', key: 'description', replacer: REPLACER.specialAlphaNumeric },
      {
        name: 'Sensor', key: 'sensors', replacer: REPLACER.default, type: 'checkgroup',
      },
    ],
  },
}

