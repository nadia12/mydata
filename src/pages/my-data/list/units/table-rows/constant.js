import React from 'react'
import colors from 'Asset/css/colors'
import { 
  TrashFolderIcon,
  DatasetIcon,
  MyModelIcon,
} from 'volantis-icon'

const DEFAULT_ENTITY = { 
  creatorName: '-', 
  type: 'System Folder', 
  size: '-', 
  updatedAt: '-', 
  status: '-' 
};

export const systemFolders = [
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my dataset',
      name: 'My Dataset',
    },
    icon: <DatasetIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'my model',
      name: 'My Model'
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY, 
      idx: 'pretrained model',
      name: 'Pre-Trained Model',
    },
    icon: <MyModelIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  },
  {
    en: { 
      ...DEFAULT_ENTITY,
      idx: 'my trash',
      name: 'Trash'
    },
    icon: <TrashFolderIcon color={colors.gold} />,
    isSelected: false,
    handleClick: () => null,
    handleDoubleClick: () => null
  }
]

export const ENTITY_TYPE_LABEL = {
  DEVICE_GROUP_SENSOR: 'Sensor Group',
  DEVICE_SENSOR: 'IoT Device',
  SQL_MYSQL: 'MySQL',
  SQL_PSQL: 'Postgres',
  SQL_MSSQL: 'MSSQL',
  SQL_DB2: 'DB2',
  SQL_ORACLE_SID: 'Oracle SID',
  SQL_ORACLE_SRV: 'Oracle SRV',
  COLLECTION: 'Folder',
  FILE_XLS: 'XLS File',
  FILE_XLSX: 'XLSX File',
  FILE_CSV: 'CSV File'
};

export const DEFAULT_TYPE_LABEL = 'Type';

export const ENTITY_TYPES = {
  DEVICE_GROUP_SENSOR: 'DEVICE_GROUP_SENSOR',
  DEVICE_SENSOR: 'DEVICE_SENSOR',
  FILE_IMAGE: 'FILE_IMAGE'
};

export const NTYPES = {
  SENSOR: 'sensor',
  SENSORGROUP: 'sensorgroup',
  DATASOURCE: 'datasource',
  FOLDER: 'folder',
  ASSET: 'asset'
};

