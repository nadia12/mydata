import React from 'react'
import { FILE_TYPES, ENTITY_TYPES, NTYPES, ENTITY_TYPE_LABEL } from './constant'
import filesize from 'filesize';

const setNtypeItem = (entityType = '') => {
    const ntypes = {
      [ENTITY_TYPES.DEVICE_SENSOR]: NTYPES.SENSOR,
      [ENTITY_TYPES.DEVICE_GROUP_SENSOR]: NTYPES.SENSORGROUP,
      default: NTYPES.DATASOURCE
    };
  
    return ntypes[entityType] || ntypes.default;
  }
  
  export const setNtype = (fileType, entityType = '') => {
    const ntypes = {
      [FILE_TYPES.ITEM]: setNtypeItem(entityType),
      [FILE_TYPES.COLLECTION]: NTYPES.FOLDER,
      [FILE_TYPES.MODEL]: NTYPES.ASSET,
      [FILE_TYPES.DATASET]: NTYPES.ASSET
    };
  
    return ntypes[fileType] || '';
  }

export const getSizeAndStatus = (en, listMyData) => {
  const sizes = {
    [NTYPES.DATASOURCE]: setDatasourceSizeStatus(en, listMyData.connectorsData),
    [NTYPES.SENSOR]: { size: '-', status: setSensorStatus(en, listMyData.sensors) },
    [NTYPES.ASSET]: { size: en.size, status: en.status },
    default: { size: '-', status: '-' }
  };
  
  return sizes[en.ntype] || sizes.default;
}
  
const setSensorStatus = (en, sensors) => {
  let status = '-';
  
  if (sensors.length > 0) {
    const currSensor = sensors.find((sensor) => sensor.id === en.id);
    if (currSensor && currSensor !== 'null' && currSensor.status) {
      status = `${currSensor.status}`.replace(/_/g, ' ');
    }
  }
  return status;
}

const setDatasourceSizeStatus = (en, connectorsData) => {
  let size = '-';
  let status = '-';

  if (connectorsData.length > 0) {
    const currDatasource = connectorsData.find((con) => con.connectorId === en.id);

    if (currDatasource && currDatasource !== null && typeof currDatasource.scheduledJob !== 'undefined'
        && currDatasource.scheduledJob !== null
        && typeof currDatasource.scheduledJob.lastRunStatus !== 'undefined') {
      status = `${currDatasource.scheduledJob.lastRunStatus}`.replace(/_/g, ' ');
    }

    if (currDatasource && currDatasource !== null && typeof currDatasource.dataIntegrationMeta !== 'undefined'
        && currDatasource.dataIntegrationMeta !== null && typeof currDatasource.dataIntegrationMeta.size !== 'undefined'
        && currDatasource.dataIntegrationMeta.size !== null) {
      en.origSize = currDatasource.dataIntegrationMeta.size;
      size = filesize(currDatasource.dataIntegrationMeta.size);
    }
  }
  return { size, status };
}

export const getTableRowsParams = (en, listMyData) => {
  const { selected: selectedCol } = listMyData;
  const isSelected = en.id && selectedCol[en.ntype] && selectedCol[en.ntype].length > 0 && selectedCol[en.ntype].findIndex((select) => `${select.id}` === `${en.id}`) > -1;
  const tableRows = {
    folder: {
      en,
      isSelected,
      // handleClick: (event) => handleSelectList(event, en),
      // handleDoubleClick: () => this.fetchDetailList({ entity: en })
    },
    sensorgroup: {
      en,
      isSelected,
      // handleClick: (event) => this.handleSelectList(event, en),
      // handleDoubleClick: () => {
      //   this.handleChangeLocation('Sensor Group');
      //   this.fetchDetailList({ entity: en });
      // }
    },
    asset: {
      en,
      isSelected,
      // handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: null
    },
    default: {
      en,
      isSelected,
      // handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: null
    }
  };

  return tableRows[en.ntype] || tableRows.default;
}

export const renderTableRow = (en) => {
  const isSelected = true;
  // const icon = ENTITY_ICON[en.type] || ENTITY_ICON[en.entityType] || ENTITY_ICON[en.name];
  en.labelType = ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type;

  return (
    <React.Fragment key={en.id}>
      <tr key={en.id} className={ isSelected && 'is-active' }>
        <td style={{ width: '25.84%' }}><div className={`table-icon ${isSelected ? 'icon-selected' : '' }`}>{} &nbsp;&nbsp; {en.name}</div></td>
        <td style={{ width: '15.94%' }}><div> {en.creatorName} </div></td>
        <td style={{ width: '15.94%' }}>{ENTITY_TYPE_LABEL[en.type] || ENTITY_TYPE_LABEL[en.entityType] || en.type}</td>
        <td style={{ width: '7.9%' }}>{en.size}</td>
        <td style={{ width: '15.94%' }}>{en.updatedAt}</td>
        <td style={{ width: '18.34%' }}>{en.status || '-'}</td>
      </tr>
    </React.Fragment>
  );
};