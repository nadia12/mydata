export const REPLACER = {
  specialAlphaNumeric: 'specialAlphaNumeric',
  alphaNumeric: 'aplhaNumeric',
  numeric: 'numeric',
  default: '',
}

export const LOCATIONS = {
  PRETRAINED_MODEL: 'Pretrained Model',
  MODEL: 'Model',
  DATASET: 'Dataset',
  TRASH: 'Trash',
  SENSOR_GROUP: 'Sensor Group',
  ROOT: 'ROOT',
  FOLDER: 'Folder',
}

export const FILE_TYPES = {
  COLLECTION: 'COLLECTION',
  ITEM: 'ITEM',
  MODEL: 'Model',
  DATASET: 'Dataset',
}

export const CREATE_TYPE = {
  sql: 'sql',
  device: 'device',
  file: 'file',
  media: 'media',
  folder: 'folder',
  sensor: 'sensor',
  sensorgroup: 'sensorgroup',
  dashboard: 'dashboard',
  fileLocal: 'filelocal',
  fileUrl: 'fileurl',
}

export const ASSET_STATUS = {
  PENDING: 'PENDING',
  QUEUED: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  WAITING: 'WAITING',
  OK: 'SUCCESS',
  ERROR: 'ERROR',
  DONE: 'DONE',
  FAIL: 'FAIL',
  'IN PROGRESS': 'IN PROGRESS',
  UPDATE_SUCCESS: 'UPDATE SUCCESS',
}

export const CSV_PARSER_OPTIONS = {
  delimiter: [
    { name: 'delimiter', value: ',', label: 'Comma (,)' },
    { name: 'delimiter', value: ';', label: 'Semicolon (;)' },
    { name: 'delimiter', value: '\\t', label: 'Tab (\\t)' },
    { name: 'delimiter', value: ' ', label: 'Space (" ")' },
    { name: 'delimiter', value: '|', label: 'Pipe (|)' },
  ],
  quoteCharacter: [
    { name: 'quoteCharacter', value: '\'', label: 'Single Quotation (\')' },
    { name: 'quoteCharacter', value: '"', label: 'Double Quotation (")' },
  ],
  escapeCharacter: [
    { name: 'escapeCharacter', value: '/', label: 'Slash (/)' },
  ],
  encoding: [
    { name: 'encoding', value: 'utf8', label: 'UTF-8' },
  ],
}

export const UI_ENTITY_TYPES = {
  FOLDER: 'Folder',
  SQL_TABLE: 'SQL Table',
  SQL_DATABASE: 'SQL Database',
  CSV: 'CSV File',
  XLS: 'XLS File',
  XLSX: 'XLSX File',
  IMAGE_FILE: 'Image File',
  IMAGE_GROUP: 'Image Group',
  VIDEO_FILE: 'Video FIle',
  IOT_DEVICE: 'IoT Device',
  SENSOR_GROUP: 'Sensor Group',
  MODEL: 'Model',
  DATASET: 'Dataset',
  PRETRAINED_MODEL: 'Pretrained Model',
  DASHBOARD: 'Dashboard',
  CONNECTOR: 'Connector',
  PARQUET_FILE: 'Parquet File',
}

export const stateStatus = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  failed: 'failed',
}

export const userRoles = {
  100: 'Admin',
  200: 'Manager',
  300: 'Staff',
}

export const COLORS = {
  gold: '#ffd77b',
  white: '#ffffff',
  gray: '#9ea1b4',
  grayBlack: '#1b1c21',
  grayLight: '#454958',
}

export const forType = {
  SQL: 'datasource-database',
  SQL_PSQL: 'datasource-database',
  SQL_MYSQL: 'datasource-database',
  SQL_ORACLE_SID: 'datasource-database',
  SQL_ORACLE_SRV: 'datasource-database',
  SQL_DB2: 'datasource-database',
  SQL_MSSQL: 'datasource-database',
  FILE: 'datasource-file',
  FILE_CSV: 'datasource-file',
  FILE_XLS: 'datasource-file',
  FILE_XLSX: 'datasource-file',
  CSV: 'datasource-file',
  XLS: 'datasource-file',
  XLSX: 'datasource-file',
  DEVICE: 'datasource-device',
  DEVICE_SENSOR: 'datasource-device',
  DEVICE_GROUP_SENSOR: 'datasource-sensor',
}

export const permission = {
  addToPipeline: 'addToPipeline',
  viewDataset: 'viewDataset',
  updateDataset: 'updateDataset',
  removeDataset: 'removeDataset',
  createModel: 'createModel',
  viewModel: 'viewModel',
  updateModel: 'updateModel',
  removeModel: 'removeModel',
  createDatabase: 'createDatabase',
  createFile: 'createFile',
  createFolder: 'createFolder',
  createIot: 'createIot',
  createUser: 'createUser',
  viewUser: 'viewUser',
  removeDatabase: 'removeDatabase',
  removeUser: 'removeUser',
  removeFolder: 'removeFolder',
  removeIot: 'removeIot',
  updateDashboard: 'updateDashboard',
  deleteDashboard: 'deleteDashboard',
  createDashboard: 'createDashboard',
  addNewData: 'addNewData',
}

export const ALPHABET = 'ABCDEFGHJIKLMNOPQRSTUVWXYZ'
export const HOSTNAME = 'hostname endpoint'

export const MYDATA_CREATE = {
  INPUT_MAX_LENGTH: {
    dataSourceName: 260,
  },
  getFormDevice: {
    step0: () => ({ touched: {}, required: ['deviceType'] }),
    step1: () => ({
      fields: [
        {
          name: 'Sensor Name', key: 'sensorname', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
        },
        {
          name: 'Sensor Type', key: 'sensortype', type: 'select', isMultiSelect: true, replacer: REPLACER.default, options: [],
        },
        { name: 'Description', key: 'sensordesc', replacer: REPLACER.specialAlphaNumeric },
      ],
      touched: {},
      required: ['sensorname', 'sensortype', 'sensordesc'],
    }),
  },
  getFormFile: {
    step0: () => ({ touched: {}, required: ['uploadType'] }),
    step1: ({ isLocal, isCsv }) => {
      const LOCAL_FIELDS = {
        required: ['fileName', 'filePath', 'fileSize'],
        fields: [{
          name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
        }],
      }
      const NOT_LOCAL_FIELDS = {
        required: ['fileName', 'fileUrl'],
        fields: [
          {
            name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
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
  },
  getFormSql: {
    step0: () => ({ touched: {}, required: ['dbType'] }),
    step1: ({ type }) => {
      const sqlRules = {
        oracle: {
          fields: [
            {
              name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
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
              name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
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
              name: 'Dataset Name', key: 'datasetName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
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
        {
          name: 'Table Name', key: 'tableName', replacer: REPLACER.default, type: 'select',
        },
      ],
      touched: {},
      required: ['tableName'],
    }),
    step3: () => ({
      fields: [
        { name: 'Incrementing Column', key: 'increamentingColumn', replacer: REPLACER.default },
        { name: 'Time Stamp Column', key: 'timeStampColumn', replacer: REPLACER.default },
      ],
      touched: {},
      required: [['increamentingColumn', 'timeStampColumn']],
    }),
  },
  getFormMedia: {
    step0: () => ({
      touched: {},
      required: ['fileName', 'fileSize', 'UUID'],
      fields: [
        {
          name: 'File Name', key: 'fileName', replacer: REPLACER.specialAlphaNumeric, maxLength: 260,
        },
      ],
    }),
  },
  TITLE: {
    sql: 'Database',
    device: 'IOT',
    file: 'File',
  },
  MAX_STEP: {
    sql: 3,
    file: 2,
    device: 2,
    media: 0,
    default: 0,
  },
  UPLOAD_ACCEPT_TYPE: {
    media: '.avi, .flv, .mp4, .wmv, .mov, .jpg, .jpeg, .png, .tiff, .svg, .bmp',
    csv: '.csv, text/csv, application/csv, text/comma-separated-values',
    xls: '.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    supportedFile: '.avi, .flv, .mp4, .wmv, .mov, .jpg, .jpeg, .png, .tiff, .svg, .bmp, .csv, text/csv, application/csv, text/comma-separated-values, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    default: '',
  },
  UPLOAD_DESCRIPTION: {
    media: 'You can upload any image or video from local storage by browsing your folder or simply drag the file here. Only 1 (one) file can be uploaded at a time.',
    file: 'You can upload your file from local storage by browsing your folder or simply drag the file here.',
    default: '',
  },
  TYPE_LIST_CONNECTOR: {
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
    File: ['FILE'],
    'XLS/XLSX': ['XLS', 'XLSX'],
  },
  DATA_TYPE: {
    Date: {
      value: 'Date',
      label: 'Date',
      asterik: '*',
    },
    String: {
      value: 'String',
      label: 'String',
      asterik: '',
    },
    Double: {
      value: 'Double',
      label: 'Double',
      asterik: '',
    },
    Float: {
      value: 'Float',
      label: 'Float',
      asterik: '',
    },
    UUID: {
      value: 'UUID',
      label: 'UUID',
      asterik: '',
    },
    Geoshape: {
      value: 'Geoshape',
      label: 'Geoshape',
      asterik: '',
    },
    Character: {
      value: 'Character',
      label: 'Character',
      asterik: '',
    },
    Byte: {
      value: 'Byte',
      label: 'Byte',
      asterik: '',
    },
    Short: {
      value: 'Short',
      label: 'Short',
      asterik: '',
    },
    Integer: {
      value: 'Integer',
      label: 'Integer',
      asterik: '',
    },
    Long: {
      value: 'Long',
      label: 'Long',
      asterik: '',
    },
    Boolean: {
      value: 'Boolean',
      label: 'Boolean',
      asterik: '',
    },
  },
}

export const DATASOURCE_STATUS = {
  PENDING: 'PENDING',
  RUNNING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  SYNC_FAILED: 'SYNC FAILED',
  SYNC_SUCCESS: 'SYNC SUCCESS',
  SYNCRONIZING: 'SYNCRONIZING',
}

export const DATASOURCE_TYPE = {
  SQL_MYSQL: 'SQL_MYSQL',
  FILE: 'FILE',
}

export const TYPE_LIST_CONNECTOR = {
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
  File: ['FILE'],
  'XLS/XLSX': ['XLS', 'XLSX'],
}
