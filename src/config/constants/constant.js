const getDefaultValue = (type) => {
  const defaultEnv = {
    production: {
      BASE_URL: 'http://iq.volantis.io',
      HOST_SERVICE: 'http://iq.volantis.io/api',
      API_MANAGEMENT: 'http://iq.volantis.io',
      PIPELINE: 'http://iq.volantis.io/v1/pipeline',
      TOP_LEVEL_DOMAIN: '',
      XPLORER: 'http://iq-xplorer.volantis.io',
      ML_STUDIO: 'http://iq-mlstudio.volantis.io/create',
      MARKETPLACE_API: 'https://service.volantis.io/api'
    },
    staging: {
      BASE_URL: 'http://staging-iq-app.volantis.io:18000',
      HOST_SERVICE: 'http://staging-iq-app.volantis.io:18000/api',
      API_MANAGEMENT: 'http://178.128.24.43:31097',
      PIPELINE: 'http://staging-iq-app.volantis.io/v1/pipeline',
      TOP_LEVEL_DOMAIN: '',
      XPLORER: 'http://staging-iq-xplorer.volantis.io',
      ML_STUDIO: 'http://staging-iq-mlstudio.volantis.io/create',
      MARKETPLACE_API: 'http://uat-service.volantis.io/api'
    }
  };
  return defaultEnv[type] || defaultEnv.staging;
};

export const getServicesURL = () => {
  const hostName = typeof window !== 'undefined' && !!window.location && !!window.location.hostname ? window.location.hostname : '';
  const isProduction = hostName === 'http://iq-app.volantis.io';
  const type = isProduction ? 'production' : 'staging';
  const defaultEnv = getDefaultValue(type);
  return {
    root: process.env.BASE_URL || defaultEnv.BASE_URL,
    webAPI: process.env.HOST_SERVICE || defaultEnv.HOST_SERVICE,
    apiManagementAPI: process.env.BASE_URL || defaultEnv.API_MANAGEMENT,
    pipeline: process.env.PIPELINE || defaultEnv.PIPELINE,
    topLevelDomain: process.env.TOP_LEVEL_DOMAIN || defaultEnv.TOP_LEVEL_DOMAIN,
    xplorer: process.env.XPLORER || defaultEnv.XPLORER,
    mlStudio: process.env.ML_STUDIO || defaultEnv.ML_STUDIO,
    marketplaceAPI: process.env.MARKETPLACE_API || defaultEnv.MARKETPLACE_API
  };
};

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


export const MODEL_ACCURACY = {
  accuracy: {
    metric_name: 'Accuracy',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of statistical bias, as these cause a difference between a "prediction" value and a "true" value.'
  },
  f1: {
    metric_name: 'F1',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure that combines precision and recall is the harmonic mean of precision and recall.'
  },
  weightedPrecision: {
    metric_name: 'Weighted Prediction',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also called precision or positive predictive value) is the fraction of relevant instances among the retrieved instances.'
  },
  weightedRecall: {
    metric_name: 'Weighted Recall',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: '(also known as sensitivity) is the fraction of relevant instances that have been retrieved over the total amount of relevant instances.'
  },
  silhouette: {
    metric_name: 'Silhouette',
    bottom_limit: -1,
    top_limit: 1,
    type: 'percentage',
    desc: 'a measure of how similar an object is to its own cluster (cohesion) compared to other clusters (separation).'
  },
  rmse: {
    metric_name: 'RMSE (Root Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a frequently used measure of the differences between values (sample or population values) predicted by a model or an estimator and the values observed.'
  },
  mse: {
    metric_name: 'MSE (Mean Squared Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average of the squares of the errors—that is, the average squared difference between the estimated values and what is estimated.'
  },
  mae: {
    metric_name: 'MAE (Mean Absolute Error)',
    bottom_limit: 0,
    top_limit: '∞',
    type: 'notPercentage',
    desc: 'a measures the average magnitude of the errors in a set of predictions, without considering their direction.'
  },
  areaUnderROC: {
    metric_name: 'AreaUnderROC',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Receiver Operating Characteristic Area Under Curve (ROC AUC) is plotting True Positive Rate (TPR) against False Positive Rate (FPR)'
  },
  areaUnderPR: {
    metric_name: 'AreaUnderPR',
    bottom_limit: 0,
    top_limit: 1,
    type: 'percentage',
    desc: 'Precision Recall Area Under Curve (PR AUC) is plotting Precision against Recall.'
  }
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
