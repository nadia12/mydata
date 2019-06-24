import React from 'react'
import COLORS from 'Asset/css/mydata-colors'
import { UI_ENTITY_TYPES } from 'config/constants'

import {
  FileIcon,
  DatabaseIcon,
  ImageIcon,
  FileCsvIcon,
  FileXlsIcon,
} from 'volantis-icon'

export const TABULAR_TYPES = [
  UI_ENTITY_TYPES.SQL_TABLE,
  UI_ENTITY_TYPES.CSV,
  UI_ENTITY_TYPES.XLS,
  UI_ENTITY_TYPES.XLSX,
]

const ENTITY_ICON = {
  [UI_ENTITY_TYPES.SQL_DATABASE]: 'sql',
  [UI_ENTITY_TYPES.CSV]: 'csv',
  [UI_ENTITY_TYPES.XLS]: 'xls',
  [UI_ENTITY_TYPES.XLSX]: 'xls',
  [UI_ENTITY_TYPES.IMAGE_FILE]: 'image',
  [UI_ENTITY_TYPES.VIDEO_FILE]: 'video',
}

const heightWidth = { width: '24px', height: '24px' }

export const SET_ICON = iconName => {
  const icons = {
    image: <ImageIcon color={COLORS.gold} {...heightWidth} className="mr8px" />,
    sql: <DatabaseIcon color={COLORS.gold} {...heightWidth} className="mr8px" />,
    csv: <FileCsvIcon color={COLORS.gold} {...heightWidth} className="mr8px" />,
    xls: <FileXlsIcon color={COLORS.gold} {...heightWidth} className="mr8px" />,
    default: <FileIcon color={COLORS.gold} {...heightWidth} className="mr8px" />,
  }

  return icons[ENTITY_ICON[iconName]] || icons.default
}
