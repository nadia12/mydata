import {
  GET_ENTITY_REQUEST,
  GET_ENTITY_SUCCESS,
  GET_ENTITY_ERROR,

  POST_CONNECTOR_REQUEST,
  POST_CONNECTOR_SUCCESS,
  POST_CONNECTOR_ERROR,

  GET_FUNCTION_DOC_REQUEST,
  GET_FUNCTION_DOC_SUCCESS,
  GET_FUNCTION_DOC_ERROR,

  GET_ACCURACY_REQUEST,
  GET_ACCURACY_SUCCESS,
  GET_ACCURACY_ERROR,

  SET_PREVIEW_ASSET,
} from './action-type'
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'
import { 
  setValue, 
  setValues, 
  setToggleModal,
  setToggleModalClose,
  setPreviewAsset,
} from './reducer'
import { getMenuList } from './menu-list-helper'
import { 
  LOCATIONS, 
  FILE_TYPES, 
  DATASOURCE_STATUS,
  ENTITY_TYPES
} from './constant'
import { dispatch } from 'rxjs/internal/observable/pairs';

// === ENTITIES 
  export const getEntityList = (params, cb) => {
    //sample authCookie, akan dihapus
    const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
    //

    return {
      type: [
        GET_ENTITY_REQUEST,
        GET_ENTITY_SUCCESS,
        GET_ENTITY_ERROR,
      ],
      shuttle: {
        path: `/v1/directory/${params.driveId}/${params.entityId}/contents/?access_token=${authCookie}`,
        method: Method.get,
        endpoint: Hostname.root,
      },
      authCookie,
      nextAction: (res, err) => cb(res, err)
    }
  }
//====

export const postConnectorData = (connectorIds = [], cb) => {
  const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
  return {
    type: [
      POST_CONNECTOR_REQUEST,
      POST_CONNECTOR_SUCCESS,
      POST_CONNECTOR_ERROR
    ],
    shuttle: {
      path: `/v1/connector?access_token=${authCookie}`,
      method: Method.post,
      endpoint: Hostname.root,
      payloads: connectorIds
    },
    authCookie,
    nextAction: (res, err) => cb(res, err)
  }
}


// === Action on TableRows My Data == //

const isSelectedAllError = (selected) => {
  const arraySelected = [...Object.values(selected)];
  const findSuccess = arraySelected.findIndex((select) => select.status !== DATASOURCE_STATUS.ERROR) > -1;
  return !findSuccess;
}

const rightClickMenus = (selected, _mydataList) => {
  const { /*actionPermission,*/ location, entities } = _mydataList;
  console.log("rightClickMenus==>", selected)
  const inSensorGroup = location === LOCATIONS.SENSOR_GROUP;
  const inModel = location === LOCATIONS.MODEL;
  const inPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL;
  const inDataset = location === LOCATIONS.DATASET;
  const inTrash = location === LOCATIONS.TRASH;

  // const permissionAsset = (inModel && actionPermission.viewModel)
  //                         || (inDataset && actionPermission.viewDataset)
  //                         || (inPretrainedModel && actionPermission.viewPretrainedModel);

  // const permissionRemove = actionPermission.removeDatabase && actionPermission.removeFolder && actionPermission.removeIot;
  // const permissionRestore = permissionRemove;
  // const permissionAddToPipeline = actionPermission.addToPipeline;

  const cDataSource = selected.datasource.length;
  const cAsset = selected.asset.length;
  const cAssetSuccess = cAsset > 0 ? selected.asset.filter((et) => et.status === ASSET_STATUS.SUCCESS || et.status === ASSET_STATUS.DONE).length : 0;
  const cSensor = selected.sensor.length;
  const cFolder = selected.folder.length;
  const cSensorGroup = selected.sensorgroup.length;

  const hasSelectedItem = cSensor + cFolder + cDataSource + cAsset + cSensorGroup > 0;

  const hasSensorSelected = cSensor + cSensorGroup >= 1;
  const showAddToPipeline = hasSelectedItem;
  const showAddToFolder = hasSelectedItem;
  const folders = entities.length === 0 ? [] : entities.filter((et) => et.entityType === null && et.type === FILE_TYPES.COLLECTION).map((et) => ({ label: et.name, value: et.id }));
  const showInfo = (cSensor === 1 || cSensorGroup === 1 || cDataSource === 1) && (cSensor + cSensorGroup + cDataSource === 1);
  const showTrash = cDataSource >= 1 && cSensor === 0 && cFolder === 0 && cAsset === 0 && cSensorGroup === 0 && isSelectedAllError(selected.datasource);
  const showSync = cSensor === 0 && cSensorGroup === 0 && cDataSource === 1 && !selected.datasource[0].entityType.startsWith('FILE_');
  const sensorgroup = entities.length === 0 ? [] : entities.filter((et) => et.entityType === ENTITY_TYPES.DEVICE_GROUP_SENSOR && et.type === FILE_TYPES.ITEM).map((et) => ({ label: et.name, value: et.id }));
  const showAddToSensorGroup = !inSensorGroup && (cSensor > 0 && cSensorGroup === 0 && cDataSource === 0 && selected.sensor.every((sensor) => sensor.type === selected.sensor[0].type));
  const showDetailAssets = (cAsset === 1 && cAssetSuccess === 1);

  // const show = {
  //   pipeline: permissionAddToPipeline && showAddToPipeline && !hasSensorSelected,
  //   pipelineSensor: permissionAddToPipeline && showAddToPipeline && hasSensorSelected,
  //   createApp: inDataset && showDetailAssets && actionPermission && actionPermission.createApp,
  //   info: showInfo,
  //   sync: showSync,
  //   folders: showAddToFolder && folders && folders.length > 0,
  //   delete: permissionRemove && showTrash,
  //   sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
  //   detailAsset: permissionAsset && showDetailAssets,
  //   asset: permissionAsset && showDetailAssets,
  //   restore: inTrash && permissionRestore && hasSelectedItem
  // };

  const show = {
    pipeline: showAddToPipeline && !hasSensorSelected,
    pipelineSensor: showAddToPipeline && hasSensorSelected,
    createApp: inDataset && showDetailAssets && actionPermission && actionPermission.createApp,
    info: showInfo,
    sync: showSync,
    folders: showAddToFolder && folders && folders.length > 0,
    delete: showTrash,
    sensorgroup: showAddToSensorGroup && sensorgroup && sensorgroup.length > 0,
    detailAsset: showDetailAssets,
    asset: showDetailAssets,
    restore: inTrash && permissionRestore && hasSelectedItem
  };

  const submenu = {
    folders: folders || [],
    sensorgroup: sensorgroup || []
  };

  const menuList = getMenuList(show, submenu)
  return menuList
}
const eventName = () => {
  let name = 'default'
  if (event.metaKey || event.ctrlKey) name = 'ctrl'
  if (event.shiftKey) name = 'shift'

  return name
}
const selectedByEvent = (event, en, _mydataList) => {
  const { ntype, id, idx: enIdx } = en;
  const { lastSelected, selected, entities  } = _mydataList;
  let newSelected = {...selected};

  const eventActions = {
    'ctrl': ()=>{
      const detail = selected[ntype].find((det) => det.id === id);
      let newSelectedType = selected[ntype];
      const exist = detail && newSelectedType.findIndex((select) => select.id === detail.id) > -1;

      if (exist) newSelectedType = newSelectedType.filter((select) => select.id !== detail.id);
      else newSelectedType.push({ ...en });

      newSelected[ntype] = newSelectedType

      return newSelected
    },

    'shift': () => {
      document.getSelection().removeAllRanges();
      const selectedEntities = lastSelected < enIdx ? entities.slice(lastSelected, enIdx + 1) : entities.slice(enIdx, lastSelected + 1);
      selectedEntities.forEach((selectedEn) => {
        const selectedType = newSelected[selectedEn.ntype];
        const exist = selectedType.findIndex(({ id: selectId }) => selectId === selectedEn.id) > -1;
        if (!exist) newSelected[selectedEn.ntype].push({ ...selectedEn });
      });

      return newSelected
    },
    'default': () =>{
      newSelected =  {
        sensorgroup: [],
        sensor: [],
        datasource: [],
        folder: [],
        asset: [],
        [ntype]: [en]
      };

      return newSelected
    }
  }
  
  return eventActions[eventName(event)]
}

export const handleSelectList = (event, en, _mydataList, position={left: 0, top: 0}) => {
  const { idx: enIdx } = en
  const { show  } = _mydataList
  const newSelected = selectedByEvent(event, en, _mydataList)()
  const menuList = rightClickMenus(newSelected, _mydataList)

  const values = {
    selected: newSelected,
    show: { ...show, menubarRight: false, infoDrawer: false },
    lastSelected: enIdx,
    menuList,
    position
  }

  return setValues(values)
}

export const handleRightClick = (evt, en, _mydataList) => {
  console.log("handleRightClick")
  evt.preventDefault();
  let { position: { left, top } } = _mydataList;

  const screenY = (window.outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280;
  const screenX = (window.outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120;
  top = Math.ceil(screenY / 16);
  left = Math.ceil(screenX / 16);

  return handleSelectList(evt, en, _mydataList, {left, top})
}

const handleShowInfoDrawer = () => {
  return setToggleModal('infoDrawer')
}

export const handleChangeMenuRight = (menu = '', value ='') => {
  const lmenu = menu.toLowerCase()
  let action = () => null

  if(!!lmenu){
    if (lmenu === 'info') action = handleShowInfoDrawer();
    if (lmenu === 'preview') action = handleFunctionDoc();
    // if (lmenu === 'pipeline sensor') this.handleConfirmationModal({ type: 'addToPipeline' });
    if (lmenu === 'pipeline') action = handleCreatePipeline();
    // if (lmenu === 'sensors') this.handleConfirmationModal({ type: 'addToSensorGroup' });
    if (lmenu === 'folder') this.handleMoveDirectory(value);
    // if (lmenu === 'create app') this.handleCreateApp();
    // if (lmenu === 'delete') this.handleActionTrash('move');
    // if (lmenu === 'sync') this.handleSync();
    // if (lmenu === 'asset') this.fetchFunctionDoc();
    // if (lmenu === 'restore') this.handleActionTrash('restore');
    // if (lmenu === 'telemetry') this.handleTelemetryMapping();
  }

  return action
}

const handleFunctionDoc = () => {
  const { selected: { asset } } = _mydataList;
  getFunctionDoc(asset[0].id, componentType,()=>{
    let accuracy = 0;
    if (asset[0].type === 'Model') {
      getAccuracy( asset[0] ,(res) => {
        return setPreviewAsset(accuracy, 'assetDetail')
      }); 
    }
     return setPreviewAsset(accuracy, 'assetDetail')
  })
}

const getFunctionDoc = (assetId, componentType, cb) => {
  //sample authCookie, akan dihapus
  const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
  //

  return {
    type: [
      GET_FUNCTION_DOC_REQUEST,
      GET_FUNCTION_DOC_SUCCESS,
      GET_FUNCTION_DOC_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/function-doc/${assetId}?component_type=${componentType}/?access_token=${authCookie}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res && typeof res.error === 'undefined' ? res : [];
      cb(data, err)
    }
  }
}

const getAccuracy = (assetId,  cb) => {
  //sample authCookie, akan dihapus
  const authCookie = "z5PyGqlECp7ZRrF4eOLVWAzc9eICRTSeNDOJYDmNcPVwtr3vyQDkrACp6uv6vsU2"
  //

  return {
    type: [
      GET_ACCURACY_REQUEST,
      GET_ACCURACY_SUCCESS,
      GET_ACCURACY_ERROR,
    ],
    shuttle: {
      path: `/manages/assets/ml-models/accuracy/${assetId}`,
      method: Method.get,
      endpoint: Hostname.web,
    },
    authCookie,
    nextAction: (res, err) => {
      const data = typeof res !== 'undefined' && !!res ? res : 0;
      cb(data, err)
    }
  }
};

// === END == //