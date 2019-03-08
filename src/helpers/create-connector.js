import uuidv4 from 'uuid/v4';
import {
  TYPE_LIST_CONNECTOR,
  CREATE_TYPE
} from 'PageComponents/my-data/create/constants';
import {
  FILE_TYPES,
  ENTITY_TYPES
} from 'PageComponents/my-data/list/constants';

const createMappingSchemeDefault = ({ dataSourceType, mapping, PK }) => {
  const scheme = mapping.length === 0 ? [] : mapping.map((mp, idx) => {
    const { tableName } = mp;
    delete mp.tableName;
    const props = Object.keys(mp);
    const ids = PK[tableName] ? PK[tableName].filter((pk) => props.includes(pk)) : [];

    const properties = {};
    Object.entries(mp).forEach(([key, value]) => {
      properties[key] = { type: value };
    });
    return {
      name: tableName,
      properties,
      _id: ids
    };
  });

  return {
    data_source_type: dataSourceType,
    scheme
  };
};

const createMappingSchemeSensor = ({ name, mapping }) => {
  const properties = {};
  return {
    mappingScheme: {
      data_source_type: 'SENSOR',
      scheme: {
        name,
        properties
      }
    }
  };
};

export const createImageFile = ({ step0, headers }) => {
  return  {
    type: FILE_TYPES.ITEM,
    name: step0.fileName || '',
    size: step0.fileSize || 0,
    id: step0.UUID || '',
    entityType: ENTITY_TYPES.FILE_IMAGE,
    additionalData: null,
    parentId: headers['V-PARENTID'] || '',
    creatorName: headers['V-CREATORNAME'] || '',
    creatorId: headers['V-CREATORID'] || ''
  };
};

const createDataSourceConfig = ({ type, step0, step1, step2, step3 }) => {
  let dataSourceType;
  let serviceName;
  let sid;
  const allData = { ...step1, ...step2, ...step0, ...step3 };

  switch(type) {
    case CREATE_TYPE.sql: {
      if (['MySQL', 'PostgreSQL', 'MSSQL', 'DB2'].includes(step0.dbType)) dataSourceType = TYPE_LIST_CONNECTOR[step0.dbType] ? TYPE_LIST_CONNECTOR[step0.dbType][0] : '';
      else if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType.value === 'SID') {
        dataSourceType = TYPE_LIST_CONNECTOR.OracleSID[0];
        sid = step1.sidservicename;
      } else if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType.value !== 'SID') {
        dataSourceType = TYPE_LIST_CONNECTOR.OracleSRV[0];
        serviceName = step1.sidservicename;
      }
      break;
    }
    case CREATE_TYPE.device: {
      dataSourceType = TYPE_LIST_CONNECTOR.Device[0];
      break;
    }
    case CREATE_TYPE.file: {
      if (step1.fileType || step0.fileType) dataSourceType = TYPE_LIST_CONNECTOR[step1.fileType || step0.fileType][0];
      break;
    }
    default: break;
  }

  return {
    dataSourceType,
    id: null,
    hostName: allData.hostName || null,
    port: typeof allData.port === 'undefined' || allData.port === null ? null : +allData.port,
    username: allData.username || null,
    password: allData.password || null,
    databaseName: allData.databaseName || null,
    filePath: allData.filePath || null,
    fileUrl: allData.fileUrl || null,
    delimiter: allData.delimiter || null,
    quoteCharacter: allData.quoteCharacter || null,
    escapeCharacter: allData.escapeCharacter || null,
    encoding: allData.encoding || null,
    fileSource: typeof allData.filePath !== 'undefined' && allData.filePath !== null ? 'MY_FILES' : null,
    serviceName,
    sid,
    creator: allData.creator || null,
    query: allData.query || null
  };
};

const createMappingConfig = ({ type, step1, step2, step3, step0, PK = {} }) => {
  const connectorId = uuidv4();
  const dataIntegrationMetaType = 'CONNECTOR_DATA_META';
  const mappingType = 'DATA_TYPE_MAPPING';
  const autoUpdate = false;

  let dataSourceType;
  let serviceName;
  let sid;
  let mappingScheme;
  let increamentingColumn;
  let timestampColumn;
  const allData = { ...step1, ...step2, ...step3, ...step0 };
  switch(type) {
    case CREATE_TYPE.sql: {
      if (['MySQL', 'PostgreSQL', 'MSSQL', 'DB2'].includes(step0.dbType)) dataSourceType = TYPE_LIST_CONNECTOR[step0.dbType][0];
      else if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType === 'SID') {
        dataSourceType = TYPE_LIST_CONNECTOR.OracleSID[0];
        sid = step1.sidservicename;
      } else if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType !== 'SID') {
        dataSourceType = TYPE_LIST_CONNECTOR.OracleSRV[0];
        serviceName = step1.sidservicename;
      }
      mappingScheme = createMappingSchemeDefault({ dataSourceType, mapping: step2, PK });
      increamentingColumn = step3.increamentingColumn;
      timestampColumn = step3.timestampColumn;

      break;
    }
    case CREATE_TYPE.device: {
      dataSourceType = TYPE_LIST_CONNECTOR.Device[0];
      mappingScheme = createMappingSchemeSensor({ name: step1.sensorname, mapping: step1.properties });
      break;
    }
    case CREATE_TYPE.file: {
      if (step0.fileType) dataSourceType = TYPE_LIST_CONNECTOR[`${step1.fileType || step0.fileType}`][0];
      mappingScheme = createMappingSchemeDefault({ dataSourceType, mapping: step2, PK });
      break;
    }
    default: break;
  }

  const strMappingScheme = mappingScheme ? JSON.stringify(mappingScheme) : null;
  return {
    connectorId,
    dataIntegrationMeta: {
      type: dataIntegrationMetaType,
      dataSourceConfig: {
        dataSourceType: dataSourceType || null,
        id: null,
        hostName: allData.hostName || null,
        port: typeof allData.port === 'undefined' || allData.port === null ? null : +allData.port,
        username: allData.username || null,
        password: allData.password || null,
        databaseName: allData.databaseName || null,
        filePath: allData.filePath || null,
        fileUrl: allData.fileUrl || null,
        delimiter: allData.delimiter || null,
        quoteCharacter: allData.quoteCharacter || null,
        escapeCharacter: allData.escapeCharacter || null,
        encoding: allData.encoding || null,
        fileSource: typeof allData.filePath !== 'undefined' && allData.filePath !== null ? 'MY_FILES' : null,
        serviceName: serviceName || null,
        sid: sid || null,
        creator: allData.creator || null,
        increamentingColumn: increamentingColumn || null,
        timestampColumn: timestampColumn || null,
        query: allData.query || null
      },
      mappingConfig: {
        id: null,
        dataSourceType: dataSourceType || null,
        dataSourceConfigId: null,
        mappingScheme: strMappingScheme,
        mappingType: mappingType || null
      }
    },
    scheduledJob: {
      connectorId,
      dataIntegrationMetaTypes: dataIntegrationMetaType,
      period: allData.period || null,
      periodUnit: allData.periodUnit || null,
      autoUpdate
    }
  };
};

export {
  createMappingConfig,
  createDataSourceConfig,
  createMappingSchemeSensor
};
