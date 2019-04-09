import uuidv4 from 'uuid/v4'
import {
  MYDATA_CREATE,
  FILE_TYPES,
  ENTITY_TYPES
} from 'Config/constants'

// const createMappingSchemeDefault = ({ dataSourceType, mapping, PK }) => {
//   const scheme = mapping.length === 0 ? [] : mapping.map(mp => {
//     const { tableName, ...data } = mp
//     const props = Object.keys(mp)
//     const ids = PK[tableName] ? PK[tableName].filter(pk => props.includes(pk)) : []

//     const properties = Object.entries(data).reduce((carry, [key, value]) => {
//       const newCarry = { ...carry }
//       newCarry[key] = { type: value }

//       return newCarry
//     }, {})

//     return {
//       name: tableName,
//       properties,
//       _id: ids
//     }
//   })

//   return {
//     data_source_type: dataSourceType,
//     scheme
//   }
// }

const createMappingSchemeSensor = ({ name }) => {
  const properties = {}

  return {
    mappingScheme: {
      data_source_type: 'SENSOR',
      scheme: {
        name,
        properties
      }
    }
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
  creatorId: headers['V-CREATORID'] || ''
})

const createDataSourceConfig = ({
  type, step0, step1, step2, mapping
}) => {
  let dataSourceType
  let serviceName
  let sid
  const allData = {
    ...step1, ...step2, ...step0, ...mapping
  }

  const {
    TYPE_LIST_CONNECTOR: {
      OracleSID, OracleSRV, Device
    },
    TYPE_LIST_CONNECTOR,
    CREATE_TYPE
  } = MYDATA_CREATE

  switch (type) {
    case CREATE_TYPE.sql: {
      if (['MySQL', 'PostgreSQL', 'MSSQL', 'DB2'].includes(step0.dbType)) {
        dataSourceType = TYPE_LIST_CONNECTOR[step0.dbType] ? TYPE_LIST_CONNECTOR[step0.dbType][0] : ''
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
  }
}

const createMappingConfig = ({
  type, step1, mapping = {}, step2, step0
  // , PK = {}
}) => {
  const connectorId = uuidv4()
  const dataIntegrationMetaType = 'CONNECTOR_DATA_META'
  // const mappingType = 'DATA_TYPE_MAPPING'
  // const autoUpdate = false

  let dataSourceType
  let serviceName
  let sid
  // let mappingScheme
  const {
    TYPE_LIST_CONNECTOR,
    CREATE_TYPE
  } = MYDATA_CREATE

  const timestampColumn = CREATE_TYPE.sql ? step2.timestampColumn : null
  const increamentingColumn = CREATE_TYPE.sql ? step2.increamentingColumn : null
  const allData = {
    ...step1, ...step2, ...mapping, ...step0
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
      // mappingScheme = createMappingSchemeDefault({ dataSourceType, mapping, PK })
      break
    }
    case CREATE_TYPE.device: {
      [dataSourceType] = TYPE_LIST_CONNECTOR.Device
      // mappingScheme = createMappingSchemeSensor({ name: step1.sensorname, mapping: step1.properties })
      break
    }
    case CREATE_TYPE.file: {
      if (step0.fileType) [dataSourceType] = TYPE_LIST_CONNECTOR[`${step1.fileType || step0.fileType}`]
      // mappingScheme = createMappingSchemeDefault({ dataSourceType, step2, PK })
      break
    }
    default: break
  }

  // const strMappingScheme = mappingScheme ? JSON.stringify(mappingScheme) : null

  return {
    connectorId,
    currentDataFlow: {
      dataIntegrationMeta: {
        type: dataIntegrationMetaType,
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
          query: allData.query || null
        }
      //   ,
      //   mappingConfig: {
      //     id: null,
      //     dataSourceType: dataSourceType || null,
      //     dataSourceConfigId: null,
      //     mappingScheme: strMappingScheme,
      //     mappingType: mappingType || null
      //   }
      }
    }
  //   ,
  //   scheduledJob: {
  //     connectorId,
  //     dataIntegrationMetaTypes: dataIntegrationMetaType,
  //     period: allData.period || null,
  //     periodUnit: allData.periodUnit || null,
  //     autoUpdate
  //   }
  }
}

export {
  createMappingConfig,
  createDataSourceConfig,
  createMappingSchemeSensor
}
