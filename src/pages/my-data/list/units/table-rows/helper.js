import filesize from 'filesize'

import {
  FILE_TYPES,
} from 'Config/constants'
import {
  ENTITY_TYPES,
  NTYPES,
} from './constant'

import { handleCollectionClick, setEntityList } from '../../function'
// ///////////----LOCAL CONSTANT----///////////
const setNtypeItem = (entityType = '') => {
  const ntypes = {
    [ENTITY_TYPES.DEVICE_SENSOR]: NTYPES.SENSOR,
    [ENTITY_TYPES.DEVICE_GROUP_SENSOR]: NTYPES.SENSORGROUP,
    default: NTYPES.DATASOURCE,
  }

  return ntypes[entityType] || ntypes.default
}

const setSensorStatus = (en, sensors) => {
  let status = '-'

  if (sensors.length > 0) {
    const currSensor = sensors.find(sensor => sensor.id === en.id)
    if (currSensor && currSensor !== 'null' && currSensor.status) {
      status = `${currSensor.status}`.replace(/_/g, ' ')
    }
  }

  return status
}

const setDatasourceSizeStatus = (en, connectorsData) => {
  let size = '-'
  let status = '-'

  if (connectorsData.length > 0) {
    const currDatasource = connectorsData.find(con => con.connectorId === en.id)

    if (currDatasource && currDatasource !== null && typeof currDatasource.scheduledJob !== 'undefined'
          && currDatasource.scheduledJob !== null
          && typeof currDatasource.scheduledJob.lastRunStatus !== 'undefined') {
      status = `${currDatasource.scheduledJob.lastRunStatus}`.replace(/_/g, ' ')
    }

    if (!!currDatasource && !!currDatasource.dataIntegrationMeta && !!currDatasource.dataIntegrationMeta.size) {
      en.origSize = currDatasource.dataIntegrationMeta.size
      size = filesize(currDatasource.dataIntegrationMeta.size)
    }
  }

  return { size, status }
}

// === NO DISPATCH REQUIRED FOR THESE FUNCS BELOW == //
export const setNtype = (fileType, entityType = '') => {
  const ntypes = {
    [FILE_TYPES.ITEM]: setNtypeItem(entityType),
    [FILE_TYPES.COLLECTION]: NTYPES.FOLDER,
    [FILE_TYPES.MODEL]: NTYPES.ASSET,
    [FILE_TYPES.DATASET]: NTYPES.ASSET,
  }

  return ntypes[fileType] || ''
}

export const getSizeAndStatus = (en, _mydataList) => {
  const sizes = {
    [NTYPES.DATASOURCE]: setDatasourceSizeStatus(en, _mydataList.connectorsData),
    [NTYPES.SENSOR]: { size: '-', status: setSensorStatus(en, _mydataList.sensors) },
    [NTYPES.ASSET]: { size: en.size, status: en.status },
    default: { size: '-', status: '-' },
  }

  return sizes[en.ntype] || sizes.default
}

export const getTableRowsParams = en => (dispatch, getState) => {
  const { selected: selectedCol } = getState()._mydataList
  const isSelected = !!en.id && !!selectedCol[en.ntype] && selectedCol[en.ntype].length > 0 && selectedCol[en.ntype].findIndex(select => `${select.id}` === `${en.id}`) > -1
  const tableRows = {
    folder: {
      en,
      isSelected,
      handleDoubleClick: () => {
        dispatch(handleCollectionClick({ entity: en }))

        return dispatch(setEntityList())
      },
    },
    sensorgroup: {
      en,
      isSelected,
      handleDoubleClick: () => {
        // this.handleChangeLocation('Sensor Group');
        dispatch(handleCollectionClick({ entity: en }))
      },
    },
    asset: {
      en,
      isSelected,
      handleDoubleClick: null,
    },
    default: {
      en,
      isSelected,
      handleDoubleClick: null,
    },
  }

  return tableRows[en.ntype] || tableRows.default
}

// === END == //
