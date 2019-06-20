/**
 * === RIGHT CLICK MENUS Mapping of Conditions with Icon ===
 * EXPORTED function: getRightClickMenus(selected, entities, allFolders)
 * Called on function handleSelectList()
 */

import React from 'react'
import {
  DeleteIcon,
  PipelineIcon,
  SyncIcon,
  FolderIcon,
  MappingTelemetryIcon,
  InfoIcon,
  VisibilityIcon,
  StarIcon,
  SensorGroupIcon,
  RestoreFromTrashIcon,
  EditIcon,
  ConfigurationIcon,
} from 'volantis-icon'

import {
  countSelected,
  mappedFolders,
  mappedSensorGroups,
  mappedConditions,
} from './rc-conditions'

const MENU_LIST = {
  createApp: {
    icon: (<VisibilityIcon />), name: 'Create App', menu: 'create app', hasBottom: false, child: [],
  },
  pipelineEdit: {
    icon: (<PipelineIcon />), name: 'Edit in Pipeline', menu: 'pipeline edit', hasBottom: false, child: [],
  },
  pipelineSensor: {
    icon: (<PipelineIcon />), name: 'Add To Pipeline', menu: 'pipeline sensor', hasBottom: true, child: [],
  },
  pipeline: {
    icon: (<PipelineIcon />), name: 'Add To Pipeline', menu: 'pipeline', hasBottom: true, child: [],
  },
  editDashboard: {
    icon: (<EditIcon />), name: 'Edit in Xplorer', menu: 'edit dashboard', hasBottom: true, child: [],
  },
  share: {
    icon: (<InfoIcon />), name: 'Share', menu: 'share', hasBottom: false, child: [],
  },
  moveToFolder: {
    icon: (<FolderIcon />), name: 'Move To', menu: 'move to folder', hasBottom: false, child: [],
  },
  star: {
    icon: (<StarIcon />), name: 'Star item', menu: 'star', hasBottom: false, child: [],
  },
  info: {
    icon: (<InfoIcon />), name: 'View Data Info', menu: 'info', hasBottom: true, child: [],
  },
  sync: {
    icon: (<SyncIcon />), name: 'Synchronise', menu: 'sync', hasBottom: false, child: [],
  },
  telemetry: {
    icon: (<MappingTelemetryIcon />), name: 'Map Telemetry', menu: 'map', hasBottom: true, child: [],
  },
  moveToTrash: {
    icon: (<DeleteIcon />), name: 'Move To Trash', menu: 'moveToTrash', hasBottom: true, child: [],
  },
  delete: {
    icon: (<DeleteIcon />), name: 'Delete', menu: 'delete', hasBottom: true, child: [],
  },
  restore: {
    icon: (<RestoreFromTrashIcon />), name: 'Restore', menu: 'restore', hasBottom: true, child: [],
  },
  sensorgroup: {
    icon: (<SensorGroupIcon />), name: 'Sensors Group', menu: 'sensors', hasBottom: true, child: [],
  },
  asset: {
    icon: (<VisibilityIcon />), name: 'View asset details', menu: 'asset', hasBottom: true, child: [],
  },
  editConfiguration: {
    icon: (<ConfigurationIcon />), name: 'Edit connector', menu: 'editConfiguration', hasBottom: true, child: [],
  },
}

const submenuKey = {
  moveToFolder: 'folders',
  sensorgroup: 'sensorgroup',
}

const mappingWithConditions = (menuConditions, submenu) => {
  const menuList = Object.entries(menuConditions)
    .filter(([, value]) => value)
    .map(([key]) => {
      const data = MENU_LIST[key] || {}
      if (key === 'moveToFolder' || key === 'sensorgroup') {
        const sbKey = submenuKey[key]
        data.child = submenu[sbKey].map(item => ({
          ...MENU_LIST[key],
          hasBottom: false,
          name: item.label,
          value: item.value,
        }))
      }

      return data
    })

  return menuList || []
}

const getRightClickMenus = (selected, entities, allFolders) => {
  const count = countSelected(selected)
  const mFolders = mappedFolders(selected, allFolders)
  const mSensorGroups = mappedSensorGroups(entities)
  const showConditions = mappedConditions(count, selected, mFolders, mSensorGroups)

  const submenu = {
    folders: mFolders || [],
    sensorgroup: mSensorGroups || [],
  }

  return mappingWithConditions(showConditions, submenu)
}

export default getRightClickMenus

