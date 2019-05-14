import uuidv4 from 'uuid/v4'
import {
  MYDATA_CREATE,
  FILE_TYPES,
  ENTITY_TYPES,
  CREATE_TYPE,
} from 'Config/constants'

const createMappingSchemeSensor = ({ name }) => {
  const properties = {}

  return {
    mappingScheme: {
      data_source_type: 'SENSOR',
      scheme: {
        name,
        properties,
      },
    },
  }
}

export const createImageFile = ({ step0, headers }) => ({
  type: FILE_TYPES.ITEM,
  name: step0.fileName || '',
  size: step0.fileSize || 0,
  id: step0.UUID || '',
  entityType: ENTITY_TYPES.FILE_IMAGE,
  additionalData: null,
  parentId: headers['V-PARENTID'] || '',
  creatorName: headers['V-CREATORNAME'] || '',
  creatorId: headers['V-CREATORID'] || '',
})

const createDataSourceConfig = ({
  type, step0, step1, step2,
}) => {
  let dataSourceType
  let serviceName
  let sid
  const allData = {
    ...step1, ...step2, ...step0,
  }

  const {
    TYPE_LIST_CONNECTOR: {
      OracleSID, OracleSRV, Device, File,
    },
    TYPE_LIST_CONNECTOR,
  } = MYDATA_CREATE

  switch (type) {
    case CREATE_TYPE.sql: {
      if (['MySQL', 'PostgreSQL', 'MSSQL', 'DB2'].includes(step0.dbType)) {
        [dataSourceType] = TYPE_LIST_CONNECTOR[step0.dbType]
      }
      if (step0.dbType === 'Oracle' && step1 && step1.oracleType && step1.oracleType.value && step1.oracleType.value === 'SID') {
        [dataSourceType] = OracleSID
        sid = step1.sidservicename
      }
      if (step0.dbType === 'Oracle' && step1 && step1.oracleType && step1.oracleType.value && step1.oracleType.value !== 'SID') {
        [dataSourceType] = OracleSRV
        serviceName = step1.sidservicename
      }
      break
    }
    case CREATE_TYPE.device: {
      [dataSourceType] = Device
      break
    }
    case CREATE_TYPE.file: {
      if (step1.fileType || step0.fileType) {
        [dataSourceType] = TYPE_LIST_CONNECTOR[step1.fileType || step0.fileType]
      }
      break
    }
    case CREATE_TYPE.fileUrl: {
      [dataSourceType] = File
      break
    }
    default: break
  }

  return {
    dataSourceType,
    id: null,
    hostName: allData.hostName || null,
    port: typeof allData.port === 'undefined' || allData.port === null ? null : +allData.port,
    username: allData.username || null,
    password: allData.password || null,
    databaseName: allData.databaseName || null,
    sid,
    serviceName,
    creator: allData.creator || null,
    filePath: allData.filePath || null,
    fileUrl: allData.fileUrl || null,
    delimiter: allData.delimiter || null,
    quoteCharacter: allData.quoteCharacter || null,
    escapeCharacter: allData.escapeCharacter || null,
    encoding: allData.encoding || null,
    fileSource: typeof allData.filePath !== 'undefined' && allData.filePath !== null ? 'MY_FILES' : null,
  }
}

const createMappingConfig = ({
  type, step1, step2, step0,
}) => {
  const connectorId = uuidv4()
  const dataIntegrationMetaType = 'CONNECTOR_DATA_META'

  let dataSourceType
  let serviceName
  let sid

  const {
    TYPE_LIST_CONNECTOR,
  } = MYDATA_CREATE

  const timestampColumn = CREATE_TYPE.sql ? step2.timestampColumn : null
  const increamentingColumn = CREATE_TYPE.sql ? step2.increamentingColumn : null
  const allData = {
    ...step1, ...step2, ...step0,
  }

  switch (type) {
    case CREATE_TYPE.sql: {
      if (['MySQL', 'PostgreSQL', 'MSSQL', 'DB2'].includes(step0.dbType)) {
        [dataSourceType] = TYPE_LIST_CONNECTOR[step0.dbType]
      }
      if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType === 'SID') {
        [dataSourceType] = TYPE_LIST_CONNECTOR.OracleSID
        sid = step1.sidservicename
      }
      if (step0.dbType === 'Oracle' && step1.oracleType && step1.oracleType !== 'SID') {
        [dataSourceType] = TYPE_LIST_CONNECTOR.OracleSRV
        serviceName = step1.sidservicename
      }
      break
    }
    case CREATE_TYPE.device: {
      [dataSourceType] = TYPE_LIST_CONNECTOR.Device
      break
    }
    case CREATE_TYPE.file: {
      if (step0.fileType) [dataSourceType] = TYPE_LIST_CONNECTOR[`${step0.fileType}`]
      break
    }
    case CREATE_TYPE.fileUrl: {
      [dataSourceType] = TYPE_LIST_CONNECTOR.File
      break
    }
    default: break
  }

  return {
    id: connectorId,
    currentDataFlow: {
      dataIntegrationMeta: {
        type: dataIntegrationMetaType,
        size: allData.fileSize || null,
        dataSourceConfig: {
          dataSourceType: dataSourceType || null,
          id: null,
          hostName: allData.hostName || null,
          port: !allData.port ? null : +allData.port,
          username: allData.username || null,
          password: allData.password || null,
          databaseName: allData.databaseName || null,
          filePath: allData.filePath || null,
          fileUrl: allData.fileUrl || null,
          delimiter: allData.delimiter || null,
          quoteCharacter: allData.quoteCharacter || null,
          escapeCharacter: allData.escapeCharacter || null,
          encoding: allData.encoding || null,
          fileSource: allData.filePath ? 'MY_FILES' : null,
          serviceName: serviceName || null,
          sid: sid || null,
          creator: allData.creator || null,
          increamentingColumn: increamentingColumn || null,
          timestampColumn: timestampColumn || null,
          query: allData.query || null,
          tableName: allData.query || null,
        },
      },
    },
  }
}

export {
  createMappingConfig,
  createDataSourceConfig,
  createMappingSchemeSensor,
}
