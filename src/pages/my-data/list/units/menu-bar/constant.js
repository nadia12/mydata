import React from 'react'
import {
  permission,
  CREATE_TYPE,
} from 'Config/constants'

import {
  FileIcon,
  FolderIcon,
  DatabaseIcon,
  DeviceIcon,
  ExplorerIcon,
} from 'volantis-icon'

export const MENU_LIST = [
  {
    permission: permission.createFolder, icon: (<FolderIcon />), name: 'Folder', value: CREATE_TYPE.folder, hasBottom: false, child: [],
  },
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
    ],
  },
  {
    permission: permission.createDatabase, icon: (<DatabaseIcon />), name: 'SQL', value: CREATE_TYPE.sql, hasBottom: false, child: [],
  },
  {
    permission: permission.createIot, icon: (<DeviceIcon />), name: 'IoT device', value: CREATE_TYPE.device, hasBottom: false, child: [],
  },
  {
    permission: permission.createDashboard, icon: (<ExplorerIcon />), name: 'Dashboard', value: CREATE_TYPE.dashboard, hasBottom: false, child: [],
  },
]
