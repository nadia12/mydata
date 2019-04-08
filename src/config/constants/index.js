export const replacer = {
  specialAlphaNumeric: 'specialAlphaNumeric',
  alphaNumeric: 'aplhaNumeric',
  numeric: 'numeric',
  default: ''
};

export const stateStatus = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  failed: 'failed'
};

export const userRoles = {
  '100': 'Admin',
  '200': 'Manager',
  '300': 'Staff'
};

export const colors = {
  gold: '#ffd77b',
  white: '#ffffff',
  gray: '#9ea1b4',
  grayBlack: '#1b1c21',
  grayLight: '#454958'
};

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
  DEVICE_GROUP_SENSOR: 'datasource-sensor'
};

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
  addNewData: 'addNewData'
};

export const ALPHABET = 'ABCDEFGHJIKLMNOPQRSTUVWXYZ';
export const HOSTNAME = 'hostname endpoint';

export const MYDATA_CREATE = {
  INPUT_MAX_LENGTH: {
    dataSourceName: 260
  },
  CSV_PARSER_OPTIONS: {
    delimiter: [
      { name: 'delimiter', value: ',', label: 'Comma (,)' },
      { name: 'delimiter', value: ';', label: 'Semicolon (;)' },
      { name: 'delimiter', value: '\t', label: 'Tab (\t)' },
      { name: 'delimiter', value: ' ', label: 'Space (" ")' },
      { name: 'delimiter', value: '|', label: 'Pipe (|)' }
    ],
    quoteCharacter: [
      { name: 'quoteCharacter', value: '\'', label: 'Single Quotation (\')' },
      { name: 'quoteCharacter', value: '"', label: 'Double Quotation (")' }
    ],
    escapeCharacter: [
      { name: 'escapeCharacter', value: '/', label: 'Slash (/)' }
    ],
    encoding: [
      { name: 'encoding', value: 'utf8', label: 'UTF-8' }
    ]
  },
  getFormDevice: {
    step0: () => ({ touched: {}, required: ['deviceType'] }),
    step1: () => ({
      fields: [
        { name: 'Sensor Name', key: 'sensorname', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
        { name: 'Sensor Type', key: 'sensortype', type: 'select', isMultiSelect: true, replacer: replacer.default, options: [] },
        { name: 'Description', key: 'sensordesc', replacer: replacer.specialAlphaNumeric }
      ],
      touched: {},
      required: ['sensorname', 'sensortype', 'sensordesc']
    })
  },
  getFormFile: {
    step0: () => ({ touched: {}, required: ['uploadType', 'fileType'] }),
    step1: ({ isLocal, isCsv }) => {
      const LOCAL_FIELDS = {
        required: ['fileName', 'filePath'],
        fields: [{ name: 'File Name', key: 'fileName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName }]
      };
      const NOT_LOCAL_FIELDS = {
        required: ['fileName', 'fileUrl'],
        fields: [
          { name: 'File Name', key: 'fileName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
          { name: 'Your File Link', key: 'fileUrl', replacer: replacer.specialAlphaNumeric }
        ]
      };
      const CSV_FIELDS = {
        required: ['encoding', 'quoteCharacter', 'escapeCharacter'],
        fields: [
          { name: 'Delimiter', key: 'delimiter', type: 'select', options: CSV_PARSER_OPTIONS.delimiter },
          { name: 'Encoding', key: 'encoding', type: 'select', options: CSV_PARSER_OPTIONS.encoding },
          { name: 'Quote Character', key: 'quoteCharacter', type: 'select', options: CSV_PARSER_OPTIONS.quoteCharacter },
          { name: 'Escape Character', key: 'escapeCharacter', type: 'select', options: CSV_PARSER_OPTIONS.escapeCharacter }
        ]
      };
      const DEFAULT_FIELDS = { required: [], fields: [] };
      const { required: localRequired, fields: localFields } = isLocal ? LOCAL_FIELDS : NOT_LOCAL_FIELDS;
      const { required: csvRequired, fields: csvFields } = isCsv ? CSV_FIELDS : DEFAULT_FIELDS;
      return {
        touched: {},
        required: [...localRequired, ...csvRequired],
        fields: [...localFields, ...csvFields]
      };
    }
  },
  getFormSql: {
    step0: () => ({ touched: {}, required: ['dbType'] }),
    step1: ({ type }) => {
      const sqlRules = {
        oracle: {
          fields: [
            { name: 'Dataset Name', key: 'datasetName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
            { name: 'Host', key: 'hostName', replacer: replacer.aplhaNumeric },
            { name: 'Port', key: 'port', replacer: replacer.numeric },
            [
              { name: 'SID / Service Name', key: 'oracleType', replacer: replacer.default, type: 'select', options: [{ label: 'SID', value: 'SID' }, { label: 'Service Name', value: 'Service Name' }] },
              { name: '', key: 'sidservicename', replacer: replacer.default }
            ],
            { name: 'Username', key: 'username', replacer: replacer.specialAlphaNumeric },
            { name: 'Password', key: 'password', type: 'password', replacer: replacer.specialAlphaNumeric }
          ],
          touched: {},
          required: ['datasetName', 'hostName', 'port', 'oracleType', 'sidservicename', 'username', 'password']
        },
        db2: {
          fields: [
            { name: 'Dataset Name', key: 'datasetName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
            { name: 'Host', key: 'hostName', replacer: replacer.aplhaNumeric },
            { name: 'Port', key: 'port', replacer: replacer.numeric },
            { name: 'Creator Name', key: 'creator', replacer: replacer.specialAlphaNumeric },
            { name: 'Database Name', key: 'databaseName', replacer: replacer.specialAlphaNumeric },
            { name: 'Username', key: 'username', replacer: replacer.specialAlphaNumeric },
            { name: 'Password', key: 'password', type: 'password', replacer: replacer.specialAlphaNumeric }
          ],
          touched: {},
          required: ['datasetName', 'hostName', 'port', 'creator', 'databaseName', 'username', 'password']
        },
        default: {
          fields: [
            { name: 'Dataset Name', key: 'datasetName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
            { name: 'Host', key: 'hostName', replacer: replacer.aplhaNumeric },
            { name: 'Port', key: 'port', replacer: replacer.numeric },
            { name: 'Database Name', key: 'databaseName', replacer: replacer.specialAlphaNumeric },
            { name: 'Username', key: 'username', replacer: replacer.specialAlphaNumeric },
            { name: 'Password', key: 'password', type: 'password', replacer: replacer.specialAlphaNumeric }
          ],
          touched: {},
          required: ['datasetName', 'hostName', 'port', 'databaseName', 'username', 'password']
        }
      };
      return sqlRules[type] || sqlRules.default;
    },
    step2: () => ({
      fields: [
        { name: 'Incrementing Column', key: 'increamentingColumn', replacer: replacer.default },
        { name: 'Time Stamp Column', key: 'timeStampColumn', replacer: replacer.default }
      ],
      touched: {},
      required: [['increamentingColumn', 'timeStampColumn']]
    })
  },
  getFormMedia: {
    step0: () => ({
      touched: {},
      required: ['fileName', 'fileSize', 'UUID'],
      fields: [
        { name: 'File Name', key: 'fileName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName }
      ]
    })
  },
  TITLE: {
    sql: 'Database',
    device: 'IOT',
    file: 'File'
  },
  MAX_STEP: {
    sql: 3,
    file: 2,
    device: 2,
    media: 0,
    default: 0
  },
  UPLOAD_ACCEPT_TYPE: {
    media: '.avi, .flv, .mp4, .wmv, .mov, .jpg, .jpeg, .png, .tiff, .svg, .bmp',
    csv: '.csv, text/csv, application/csv, text/comma-separated-values',
    xls: '.xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    default: ''
  },
  UPLOAD_DESCRIPTION: {
    media: 'You can upload any image or video from local storage by browsing your folder or simply drag the file here. Only 1 (one) file can be uploaded at a time.',
    file: 'You can upload your file from local storage by browsing your folder or simply drag the file here.',
    default: ''
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
    'XLS/XLSX': ['XLS', 'XLSX']
  },
  DATA_TYPE: {
    Date: {
      value: 'Date',
      label: 'Date',
      asterik: '*'
    },
    String: {
      value: 'String',
      label: 'String',
      asterik: ''
    },
    Double: {
      value: 'Double',
      label: 'Double',
      asterik: ''
    },
    Float: {
      value: 'Float',
      label: 'Float',
      asterik: ''
    },
    UUID: {
      value: 'UUID',
      label: 'UUID',
      asterik: ''
    },
    Geoshape: {
      value: 'Geoshape',
      label: 'Geoshape',
      asterik: ''
    },
    Character: {
      value: 'Character',
      label: 'Character',
      asterik: ''
    },
    Byte: {
      value: 'Byte',
      label: 'Byte',
      asterik: ''
    },
    Short: {
      value: 'Short',
      label: 'Short',
      asterik: ''
    },
    Integer: {
      value: 'Integer',
      label: 'Integer',
      asterik: ''
    },
    Long: {
      value: 'Long',
      label: 'Long',
      asterik: ''
    },
    Boolean: {
      value: 'Boolean',
      label: 'Boolean',
      asterik: ''
    }
  },
  CREATE_TYPE: {
    sql: 'sql',
    device: 'device',
    file: 'file',
    media: 'media',
    folder: 'folder',
    sensor: 'sensor',
    sensorgroup: 'sensorgroup'
  }
}
