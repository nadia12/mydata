import {
  REPLACER,
  CSV_PARSER_OPTIONS,
} from 'Config/constants'
import {
  INPUT_MAX_LENGTH,
} from './constant'

export const getFormDevice = {
  step0: () => ({ touched: {}, required: ['deviceType'] }),
  step1: () => ({
    fields: [
      {
        name: 'Sensor Name', key: 'sensorname', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
      {
        name: 'Sensor Type', key: 'sensortype', type: 'select', isMultiSelect: true, replacer: REPLACER.default, options: [],
      },
      { name: 'Description', key: 'sensordesc', replacer: REPLACER.specialAlphaNumeric },
    ],
    touched: {},
    required: ['sensorname', 'sensortype', 'sensordesc'],
  }),
}

export const getFormFile = {
  step0: () => ({ touched: {}, required: ['uploadType', 'fileType'] }),
  step1: ({ isLocal, isCsv }) => {
    const LOCAL_FIELDS = {
      required: ['fileName', 'filePath'],
      fields: [{
        name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      }],
    }
    const NOT_LOCAL_FIELDS = {
      required: ['fileName', 'fileUrl'],
      fields: [
        {
          name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
        },
        { name: 'Your File Link', key: 'fileUrl', replacer: REPLACER.specialAlphaNumeric },
      ],
    }
    const CSV_FIELDS = {
      required: ['encoding', 'quoteCharacter', 'escapeCharacter'],
      fields: [
        {
          name: 'Delimiter', key: 'delimiter', type: 'select', options: CSV_PARSER_OPTIONS.delimiter,
        },
        {
          name: 'Encoding', key: 'encoding', type: 'select', options: CSV_PARSER_OPTIONS.encoding,
        },
        {
          name: 'Quote Character', key: 'quoteCharacter', type: 'select', options: CSV_PARSER_OPTIONS.quoteCharacter,
        },
        {
          name: 'Escape Character', key: 'escapeCharacter', type: 'select', options: CSV_PARSER_OPTIONS.escapeCharacter,
        },
      ],
    }
    const DEFAULT_FIELDS = { required: [], fields: [] }
    const { required: localRequired, fields: localFields } = isLocal ? LOCAL_FIELDS : NOT_LOCAL_FIELDS
    const { required: csvRequired, fields: csvFields } = isCsv ? CSV_FIELDS : DEFAULT_FIELDS

    return {
      touched: {},
      required: [...localRequired, ...csvRequired],
      fields: [...localFields, ...csvFields],
    }
  },
}
export const getFormSql = {
  step0: () => ({ touched: {}, required: ['dbType'] }),
  step1: ({ type }) => {
    const sqlRules = {
      oracle: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          [
            {
              name: 'SID / Service Name', key: 'oracleType', replacer: REPLACER.default, type: 'select', options: [{ label: 'SID', value: 'SID' }, { label: 'Service Name', value: 'Service Name' }],
            },
            { name: '', key: 'sidservicename', replacer: REPLACER.default },
          ],
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'oracleType', 'sidservicename', 'username', 'password'],
      },
      db2: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          { name: 'Creator Name', key: 'creator', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Database Name', key: 'databaseName', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'creator', 'databaseName', 'username', 'password'],
      },
      default: {
        fields: [
          {
            name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
          },
          { name: 'Host', key: 'hostName', replacer: REPLACER.aplhaNumeric },
          { name: 'Port', key: 'port', replacer: REPLACER.numeric },
          { name: 'Database Name', key: 'databaseName', replacer: REPLACER.specialAlphaNumeric },
          { name: 'Username', key: 'username', replacer: REPLACER.specialAlphaNumeric },
          {
            name: 'Password', key: 'password', type: 'password', replacer: REPLACER.specialAlphaNumeric,
          },
        ],
        touched: {},
        required: ['datasetName', 'hostName', 'port', 'databaseName', 'username', 'password'],
      },
    }

    return sqlRules[type] || sqlRules.default
  },
  step2: () => ({
    fields: [
      { name: 'Incrementing Column', key: 'increamentingColumn', replacer: REPLACER.default },
      { name: 'Time Stamp Column', key: 'timeStampColumn', replacer: REPLACER.default },
    ],
    touched: {},
    required: [['increamentingColumn', 'timeStampColumn']],
  }),
}

export const getFormMedia = {
  step0: () => ({
    touched: {},
    required: ['fileName', 'fileSize', 'UUID'],
    fields: [
      {
        name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName,
      },
    ],
  }),
}
