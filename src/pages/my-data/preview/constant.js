import React from 'react'
import COLORS from 'Asset/css/mydata-colors'

import {
  FileIcon,
  DatabaseIcon,
  ImageIcon,
  FileCsvIcon,
  FileXlsIcon,
} from 'volantis-icon'

export const ENTITY_ICON = {
  'SQL Database': 'sql',
  'CSV File': 'csv',
  'XLS File': 'xls',
  'XLSX File': 'xls',
  'Image File': 'image',
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
