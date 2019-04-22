import {
  REPLACER,
} from 'Config/constants'

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE',
}

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

