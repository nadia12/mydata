import React from 'react'
import {
  permission,
  CREATE_TYPE,
} from 'Config/constants'

import {
  FileIcon,
  SensorGroupIcon,
  FolderIcon,
  DatabaseIcon,
  DeviceIcon,
  ImageIcon,
} from 'volantis-icon'

export const MENU_LIST = [
  {
    permission: permission.createFolder, icon: (<FolderIcon />), name: 'Folder', value: CREATE_TYPE.folder, hasBottom: false, child: [],
  },
  {
    permission: permission.createIot, icon: (<SensorGroupIcon />), name: 'Sensor Group', value: CREATE_TYPE.sensorgroup, hasBottom: true, child: [],
  },
  // { icon: (<CollectionIcon />), name: 'Collection', value: 'collection', hasBottom: true, child: [
  // { icon: (<ImageIcon />), name: 'Image collection', value: 'imagecollection ', hasBottom: false, child: [] },
  // { icon: (<SensorGroupIcon />), name: 'Sensor Group', value: 'sensorgroup', hasBottom: false, child: [] }
  // ] },
  {
    permission: permission.createFile,
    icon: (<FileIcon />),
    name: 'File',
    value: '',
    hasBottom: false,
    child: [
      {
        icon: (<FileIcon />), name: 'CSV or XLS', value: CREATE_TYPE.file, hasBottom: false, child: [],
      },
      {
        icon: (<ImageIcon />), name: 'Image or Video', value: CREATE_TYPE.media, hasBottom: false, child: [],
      },
    ],
  },
  {
    permission: permission.createDatabase, icon: (<DatabaseIcon />), name: 'SQL', value: CREATE_TYPE.sql, hasBottom: false, child: [],
  },
  {
    permission: permission.createIot, icon: (<DeviceIcon />), name: 'IoT device', value: CREATE_TYPE.device, hasBottom: false, child: [],
  },
]
