import React from 'react';
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
  RestoreIcon
} from 'UI/elements/icons';

const MENU_LIST = {
  createApp: {
    icon: (<VisibilityIcon />), name: 'Create App', menu: 'create app', hasBottom: false, child: []
  },
  // preview: {
  //   icon: (<VisibilityIcon />), name: 'Preview', menu: 'preview', hasBottom: false, child: []
  // },
  pipelineSensor: {
    icon: (<PipelineIcon />), name: 'Open with Pipeline', menu: 'pipeline sensor', hasBottom: true, child: []
  },
  pipeline: {
    icon: (<PipelineIcon />), name: 'Open with Pipeline', menu: 'pipeline', hasBottom: true, child: []
  },
  share: {
    icon: (<InfoIcon />), name: 'Share', menu: 'share', hasBottom: false, child: []
  },
  folders: {
    icon: (<FolderIcon />), name: 'Move To', menu: 'folder', hasBottom: false, child: []
  },
  star: {
    icon: (<StarIcon />), name: 'Star item', menu: 'star', hasBottom: false, child: []
  },
  info: {
    icon: (<InfoIcon />), name: 'View details', menu: 'info', hasBottom: true, child: []
  },
  sync: {
    icon: (<SyncIcon />), name: 'Synchronise', menu: 'synchronise', hasBottom: false, child: []
  },
  telemetry: {
    icon: (<MappingTelemetryIcon />), name: 'Map Telemetry', menu: 'map', hasBottom: true, child: []
  },
  delete: {
    icon: (<DeleteIcon />), name: 'Move To Trash', menu: 'delete', hasBottom: true, child: []
  },
  restore: {
    icon: (<RestoreIcon />), name: 'Restore', menu: 'restore', hasBottom: true, child: []
  },
  sensorgroup: {
    icon: (<SensorGroupIcon />), name: 'Sensors Group', menu: 'sensors', hasBottom: true, child: []
  },
  asset: {
    icon: (<VisibilityIcon />), name: 'View asset details', menu: 'asset', hasBottom: true, child: []
  }
};

const getMenuList = (datas, submenu) => {
  const menuList = Object.entries(datas)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const data = MENU_LIST[key] || {};
      if (key === 'folders' || key === 'sensorgroup') {
        data.child = submenu[key].map((item) => ({ ...MENU_LIST[key], hasBottom: false, name: item.label, value: item.value }));
      }
      return data;
    });
  return menuList || [];
};

export {
  getMenuList
};

