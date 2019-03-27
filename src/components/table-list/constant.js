// import { replacer } from 'Config/constants';

// export const NTYPES = {
//     SENSOR: 'sensor',
//     SENSORGROUP: 'sensorgroup',
//     DATASOURCE: 'datasource',
//     FOLDER: 'folder',
//     ASSET: 'asset'
//   };
  
//   export const LOCATIONS = {
//     MODEL: 'Model',
//     DATASET: 'Dataset',
//     TRASH: 'Trash',
//     SENSOR_GROUP: 'Sensor Group',
//     ROOT: 'ROOT'
//   };
  
//   export const FILE_TYPES = {
//     COLLECTION: 'COLLECTION',
//     ITEM: 'ITEM',
//     MODEL: 'Model',
//     DATASET: 'Dataset'
//   };

//   export const ENTITY_TYPES = {
//     DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
//     DEVICE_SENSOR: 'DEVICE_SENSOR',
//     FILE_IMAGE: 'FILE_IMAGE'
//   };

//   export const ENTITY_TYPE_LABEL = {
//     DEVICE_GROUP_SENSOR: 'Sensor Group',
//     DEVICE_SENSOR: 'IoT Device',
//     SQL_MYSQL: 'MySQL',
//     SQL_PSQL: 'Postgres',
//     SQL_MSSQL: 'MSSQL',
//     SQL_DB2: 'DB2',
//     SQL_ORACLE_SID: 'Oracle SID',
//     SQL_ORACLE_SRV: 'Oracle SRV',
//     COLLECTION: 'Folder',
//     FILE_XLS: 'XLS File',
//     FILE_XLSX: 'XLSX File',
//     FILE_CSV: 'CSV File'
//   };

//   export const INPUT_MAX_LENGTH = {
//     dataSourceName: 260
//   };
  
//   export const DEFAULT_FIELDS = {
//     newFolder: {
//       touched: {},
//       required: ['folderName'],
//       fields: [
//         { name: 'Folder Name', key: 'folderName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName }
//       ]
//     },
//     newSensorGroup: {
//       touched: {},
//       required: ['sensorGroupName'],
//       fields: [
//         { name: 'Sensor Group Name', key: 'sensorGroupName', replacer: replacer.specialAlphaNumeric, maxLength: INPUT_MAX_LENGTH.dataSourceName },
//         { name: 'Description', key: 'description', replacer: replacer.specialAlphaNumeric },
//         { name: 'Sensor', key: 'sensors', replacer: replacer.default, type: 'checkgroup' }
//       ]
//     }
//   };

  