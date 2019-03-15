import filesize from 'filesize';
import { FILE_TYPES, ENTITY_TYPES, NTYPES } from './constant'

import {
  GET_DATASET_REQUEST,
  GET_DATASET_SUCCESS,
  GET_DATASET_ERROR,
} from './action-type'
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'

export const getEntityList = (driveId = "bc0d3416-2441-466d-acf1-69b7b082a3bf", entityId = "ROOT", authCookie = 'SID_IQ' ) => {
  return {
    type: [
      GET_DATASET_REQUEST,
      GET_DATASET_SUCCESS,
      GET_DATASET_ERROR
    ],
    shuttle: {
      path: `/v1/directory/${driveId}/${entityId}/contents`,
      method: Method.get,
      endpoint: Hostname.root,
    },
    authCookie
  }
}

// export const getEntityList = ({ driveId, entityId }) => async (dispatch, getState) => {
//   dispatch(doLoading(GET_ENTITY_LIST, 'getEntityListState'));
//   try {
//     const { root: rootAPI } = getState().service;
//     const entity = await getRequest({
//       url: `${rootAPI}/v1/directory/${driveId}/${entityId}/contents`
//     });
//     let refinedEntity = typeof entity.data !== 'undefined' && entity.data !== null ? entity.data : [];
//     if (refinedEntity.length > 0) {
//       refinedEntity = refinedEntity.map((en) => {
//         const end = moment(en.updatedAt).format('YYYY-MM-DD');
//         const isToday = now === end;
//         const origUpdatedAt = new Date(en.updatedAt);
//         const origSize = en.size;
//         const size = en.size === 0 ? '-' : en.size;
//         const labelType = '';
//         const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm');
//         const dateModified = moment(en.updatedAt).format('MMM D, YYYY');
//         return { ...en, size, updatedAt, dateModified, origSize, origUpdatedAt, labelType };
//       });
//     }

//     return dispatch(doSuccess(GET_ENTITY_LIST, 'getEntityListState', 'entity', refinedEntity));
//   } catch(ex) {
//     return dispatch(doError(GET_ENTITY_LIST, 'getEntityListState', 'entity', [], 'Failed to fetch data'));
//   }
// };


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

const setDatasourceSizeStatus = (en, entities) => {
  const { connectorsData } = entities;
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

export const getSizeAndStatus = (en, entities) => {
  const sizes = {
    [NTYPES.DATASOURCE]: setDatasourceSizeStatus(en, entities),
    [NTYPES.SENSOR]: { size: '-', status: setSensorStatus(en) },
    [NTYPES.ASSET]: { size: en.size, status: en.status },
    default: { size: '-', status: '-' }
  };

  return sizes[en.ntype] || sizes.default;
}

const setSensorStatus = (en) => {
  const { sensors } = entities;
  let status = '-';

  if (sensors.length > 0) {
    const currSensor = sensors.find((sensor) => sensor.id === en.id);
    if (currSensor && currSensor !== 'null' && currSensor.status) {
      status = `${currSensor.status}`.replace(/_/g, ' ');
    }
  }

  return status;
}

const getTableRowsParams = (en, state) => {
  const { selected: selectedCol } = state;
  const isSelected = en.id && selectedCol[en.ntype] && selectedCol[en.ntype].length > 0 && selectedCol[en.ntype].findIndex((select) => `${select.id}` === `${en.id}`) > -1;
  const tableRows = {
    folder: {
      en,
      isSelected,
      handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: () => this.fetchDetailList({ entity: en })
    },
    sensorgroup: {
      en,
      isSelected,
      handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: () => {
        this.handleChangeLocation('Sensor Group');
        this.fetchDetailList({ entity: en });
      }
    },
    asset: {
      en,
      isSelected,
      handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: null
    },
    default: {
      en,
      isSelected,
      handleClick: (event) => this.handleSelectList(event, en),
      handleDoubleClick: null
    }
  };
}

// handleSelectList = (event, en) => {
//   const isCtrl = event.metaKey || event.ctrlKey;
//   const isShift = event.shiftKey;
//   const { ntype, id, idx: enIdx } = en;
//   const { list: { entity } } = this.props;
//   const { lastSelected } = this.state;
//   if (isShift) document.getSelection().removeAllRanges();

//   this.setState((prevState) => {
//     const { selected } = prevState;
//     let newSelected = { ...selected };

//     if (isCtrl) {
//       const detail = selected[ntype].find((det) => det.id === id);
//       let newSelectedType = selected[ntype];
//       const exist = detail && newSelectedType.findIndex((select) => select.id === detail.id) > -1;

//       if (exist) newSelectedType = newSelectedType.filter((select) => select.id !== detail.id);
//       else newSelectedType.push({ ...en });
//       newSelected[ntype] = newSelectedType;
//     } else if (isShift) {
//       const selectedEntities = lastSelected < en.idx ? entity.slice(lastSelected, en.idx + 1) : entity.slice(en.idx, lastSelected + 1);
//       selectedEntities.forEach((selectedEn, idx) => {
//         const selectedType = newSelected[selectedEn.ntype];
//         const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1;
//         if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn });
//       });
//     } else {
//       newSelected = {
//         sensorgroup: [],
//         sensor: [],
//         datasource: [],
//         folder: [],
//         asset: [],
//         [ntype]: [en]
//       };
//     }

//     this.renderRightClickAction(newSelected);
//     return {
//       selected: newSelected,
//       show: { ...prevState.show, menubarRight: false, infoDrawer: false },
//       lastSelected: enIdx
//     };
//   });
// }

