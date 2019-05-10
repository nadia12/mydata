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
  DashboardIcon,
  LinkIcon,
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
      {
        icon: (<FileIcon />), name: 'Browse file from local computer', value: CREATE_TYPE.fileLocal, hasBottom: false, child: [],
      },
      {
        icon: (<LinkIcon />), name: 'Insert file from link URL', value: CREATE_TYPE.fileUrl, hasBottom: false, child: [],
      },
      {
        icon: (<LinkIcon />), name: 'Testing File', value: CREATE_TYPE.testing, hasBottom: false, child: [],
      },
    ],
  },
  {
    permission: permission.createDatabase, icon: (<DatabaseIcon />), name: 'SQL', value: CREATE_TYPE.sql, hasBottom: false, child: [],
  },
  {
    permission: permission.createDashboard, icon: (<DashboardIcon />), name: 'Dashboard', value: CREATE_TYPE.dashboard, hasBottom: false, child: [],
  },
]
