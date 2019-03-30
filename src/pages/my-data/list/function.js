import inputReplacer from 'Config/lib/input-replacer';
import checkRequired from 'Config/lib/input-check-required';
import queryString from 'query-string';

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

  PUT_MOVE_DIRECTORY_REQUEST,
  PUT_MOVE_DIRECTORY_SUCCESS,
  PUT_MOVE_DIRECTORY_ERROR,

  SET_AUTH_COOKIE,
  SET_HEADERS,
} from './action-type'
import Method from 'Config/constants/request-method'
import Hostname from 'Config/constants/hostname'
import sortColumn from 'Config/lib/sort-column'
import { 
  setValue, 
  setValues, 
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setPreviewAsset,
} from './reducer'
import { getMenuList } from './menu-right-helper'
import { 
  LOCATIONS, 
  FILE_TYPES, 
  DATASOURCE_STATUS,
  ENTITY_TYPES,
  DEFAULT_TYPE_LABEL
} from './constant'

import{
  DEFAULT_STATE
} from './initial-states'

import {
  doRefineEntities
} from './helper'

export const setAuthCookie = ({ authCookie = 'SID_IQ' }) => ({
  type: SET_AUTH_COOKIE,
  payload: authCookie,
})

export const setHeaders = () => (dispatch, getState) => {
  let headers = {
    'V-DRIVEID': '' || 'f15acdba-e37d-4eff-90d4-1e95e21fe64f',
    'V-CREATORNAME': '',
    'V-CREATORID': '',
    'V-PARENTID': '',
    'V-PATH': ''
  }

  dispatch(setValue('headers', headers))
}

//=== REQUEST ENTITIES ON ROOT and postConnectorData
  export const getEntityList = (params, cb) => (dispatch, getState) => {
    const authCookie = getState()._mydataList.authCookie

    return dispatch({
      type: [
        GET_ENTITY_REQUEST,
        GET_ENTITY_SUCCESS,
        GET_ENTITY_ERROR,
      ],
      shuttle: {
        path: `/v1/directory/${params.driveId}/${params.entityId}/contents`,
        method: Method.get,
        endpoint: Hostname.root,
      },
      authCookie,
      nextAction: (res, err) => cb(res, err)
    })
  }

  export const setEntityList = () => (dispatch, getState) =>{
    console.log("setEntityList")
    const _mydataList = getState()._mydataList

    const params = {
      driveId: _mydataList.headers['V-DRIVEID'],
      entityId: "ROOT"
    };

    dispatch(getEntityList(params, (res) => {
      dispatch(setValue("entities", doRefineEntities(res)))
    }))
  }

  export const postConnectorData = (connectorIds = [], cb) => (dispatch, getState) => {
    const authCookie = getState()._mydataList.authCookie

    return dispatch({
      type: [
        POST_CONNECTOR_REQUEST,
        POST_CONNECTOR_SUCCESS,
        POST_CONNECTOR_ERROR
      ],
      shuttle: {
        path: `/v1/connector`,
        method: Method.post,
        endpoint: Hostname.root,
        payloads: connectorIds
      },
      authCookie,
      nextAction: (res, err) => cb(res, err)
    })
  }
//===== END REQUEST ENTITIES ON ROOT 

//==== SEARCH
  export const handleSearchTypeChange = (value) => (dispatch, getState) => {
    let inFilteredResult = true;
    const { headers, show } = getState()._mydataList

    if (value === DEFAULT_TYPE_LABEL) {
      if (headers['V-PATH'] === '') inFilteredResult = false;
      dispatch(setEntityList())
    } else {
      this.props.searchEntityTypePath({
        driveId: headers['V-DRIVEID'],
        entityType: value,
        parentPath: headers['V-PATH']
      });
    }
    const values =  {
      search: { newSensorGroup: '', list: '', listType: value, inFilteredResult },
      show: { ...show, entityContent: false }
    };

    console.log("handleSearchTypeChange", values)
    dispatch(setValues(values))
  }
//==== END SEARCH

export const handleChangeInput = ({ fieldName, key, value, replacer = '', valueReplacer = '' }) => (dispatch, getState) =>  {
  const { fields, rules } = getState()._mydataList;
  const currentData = { ...fields[fieldName], [key]: replacer === '' ? value : inputReplacer(replacer, value, valueReplacer) };
  const currentRules = { ...rules };
  currentRules[fieldName].touched = { ...currentRules[fieldName].touched, [key]: true };
  const isValid = !checkRequired(currentData, currentRules[fieldName].required);
  
  const values = {
    isValid: { ...getState()._mydataList.isValid, [fieldName]: isValid },
    rules: currentRules,
    fields: {
      ...fields,
      [fieldName]: currentData
    }
  };

  dispatch(setValues(values))
}

// ****** Action on Entity TableRows My Data ***** //
  // ==== ONECLICK, RIGHTCLICK, DOUBLECLICK

    const isSelectedAllError = (selected) => {
      const arraySelected = [...Object.values(selected)];
      const findSuccess = arraySelected.findIndex((select) => select.status !== DATASOURCE_STATUS.ERROR) > -1;
      return !findSuccess;
    }

    const rightClickMenus = (selected, _mydataList) => {
      console.log("rightClickMenus==>", _mydataList)
      const { /*actionPermission,*/ location, entities } = _mydataList;
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
      console.log("menuList==>", menuList)
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

      const actions = {
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

      console.log("selectedByEvent==>", eventName(event))
      
      return actions[eventName(event)]
    }

    export const handleSelectList = (event, en, position={left: 0, top: 0}) => (dispatch, getState) => {
      const _mydataList = getState()._mydataList
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

      console.log("handleSelectList==>", values)

      dispatch(setValues(values))
    }

    export const handleRightClick = (evt, en) => (dispatch, getState) => {
      evt.preventDefault();

      const _mydataList = getState()._mydataList
      let { position: { left, top } } = _mydataList;

      const screenY = (window.outerHeight - evt.screenY) < 300 ? evt.screenY - 400 : evt.screenY - 280;
      const screenX = (window.outerWidth - evt.screenX) < 700 ? evt.screenX - 450 : evt.screenX - 120;
      top = Math.ceil(screenY / 16);
      left = Math.ceil(screenX / 16);

      console.log("handleRightClick==>", evt, en, {left, top})

      dispatch(handleSelectList(evt, en, {left, top}))
    }

    export const handleChangeMenuRight = (menu = '', value ='') => {
      console.log("handleChangeMenuRight", menu, value)
      const lmenu = menu.toLowerCase()
      let action = () => null

      if(!!lmenu){
        if (lmenu === 'info') action = handleShowInfoDrawer();
        if (lmenu === 'preview') action = handleFunctionDoc();
        // if (lmenu === 'pipeline sensor') this.handleConfirmationModal({ type: 'addToPipeline' });
        if (lmenu === 'pipeline') action = handleCreatePipeline()
        // if (lmenu === 'sensors') this.handleConfirmationModal({ type: 'addToSensorGroup' });
        if (lmenu === 'folder') action = handleMoveDirectory(value);
        // if (lmenu === 'create app') this.handleCreateApp();
        if (lmenu === 'delete') action = handleActionTrash('move');
        if (lmenu === 'sync') action = handleSync();
        if (lmenu === 'asset') action = handleFunctionDoc();
        if (lmenu === 'restore') this.handleActionTrash('restore');
        // if (lmenu === 'telemetry') this.handleTelemetryMapping();
      }

      return action
    }
    
    export const handleChangeTopMenu = (menu = '') => (dispatch, getState) => {
      console.log("handleChangeTopMenu", menu)
      const lmenu = menu.toLowerCase()
      const { entities } = getState()._mydataList
      let headers = {};
  
      if (entities.length > 0) {
        const { driveId, name, parentId } = entities[0];
        headers = { driveId, name, parentId };
      } else {
        headers = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT };
      }
      window.localStorage.setItem('MYDATA.create', JSON.stringify(headers));
  
      if (['file', 'sql', 'device', 'media'].includes(lmenu)) router.push(`/create?type=${lmenu}`);
      if (lmenu === 'folder') {
        dispatch(setValue('fields', DEFAULT_STATE.fields ))
        dispatch(setToggleModalOpen('newFolder')) //open it
        
      } else if (lmenu === 'sensorgroup') {
        // this.fetchSensorList();
        dispatch(setValue('fields', { ...DEFAULT_STATE.fields }))
        dispatch(setToggleModalOpen('newSensorGroup')) //open it
      }
    }
    
  //====

  //ALL OF THESE ACTION WILL BE CALLED ON MENURIGHT CLICK (handleChangeMenuRight)
    // ======= CREATE PIPELINE
      const handleCreatePipeline = () => (dispatch, getState) => {
        const { selected: { datasource }, selected } = getState()._mydataList;

        delete selected.menu;

        const newSelected = {
          ...selected
        };

        if(datasource && datasource.length > 0) {
          const filteredDatasource = datasource.filter((d) => d.status === DATASOURCE_STATUS.SUCCESS || d.status === DATASOURCE_STATUS.SYNC_SUCCESS || d.status === DATASOURCE_STATUS.SYNC_FAILED);
          newSelected.datasource = filteredDatasource;
        }

        const flattenSelect = Object.values(newSelected).flatMap((select) => select);
        const ids = flattenSelect.map(({ id }) => encodeURIComponent(id));
        const names = flattenSelect.map(({ name }) => encodeURIComponent(name));

        if (ids.length === 0) {
          // this.handleConfirmationModal({ type: 'addToPipelineEmpty' });
        } else {
          const qs = `${queryString.stringify({ ids })}&${queryString.stringify({ name: names })}`;
          if (typeof window !== 'undefined' && typeof window.location !== 'undefined') {
            // window.location.href = `${RoutePath.pipeline}?${qs}`;
            window.location.href = `/pipeline?${qs}`; //routr pipeline perlu di define
          }
        }
      }

    // ======= MOVE DIRECTORY
      const putMoveDirectory = ({driveId, entityId, targetCollectionId}, cb) => (dispatch, getState) => {
        const authCookie = getState()._mydataList.authCookie
        console.log("putM==>", {driveId, entityId, targetCollectionId})
        return dispatch({
          type: [
            PUT_MOVE_DIRECTORY_REQUEST,
            PUT_MOVE_DIRECTORY_SUCCESS,
            PUT_MOVE_DIRECTORY_ERROR
          ],
          shuttle: {
            path: `/v1/directory/${driveId}/${entityId}/into/${targetCollectionId}`,
            method: Method.put,
            endpoint: Hostname.root,
          },
          authCookie,
          nextAction: (res, err) => cb(res, err)
        })
      }

      const handleMoveDirectory = (menu) => (dispatch, getState) => {
        const _mydataList = getState()._mydataList
        
        const selecteds = [...Object.values(_mydataList.selected)];
        console.log("selected=>", selecteds)
        selecteds.forEach((select) => {
          console.log("select=>", select)
          select.forEach((s) => {
            if (!!s && s.id) {
              const data = {
                driveId: _mydataList.headers['V-DRIVEID'],
                entityId: s.id,
                name: s.name, 
                targetCollectionId: menu
              };
              dispatch(putMoveDirectory(data, (res) =>{
                if(!!res) dispatch(setEntityList())
              }))
            }
          });
        });
      }
    // ======= 

    //======= TRASH ACTION
      // type = move || restore
      const postMoveToTrash = ({driveId, ids }, cb) => (dispatch, getState) => {
        const authCookie = getState()._mydataList.authCookie

        return dispatch({
          type: [
            POST_MOVE_TRASH_REQUEST,
            POST_MOVE_TRASH_SUCCESS,
            POST_MOVE_TRASH_ERROR
          ],
          shuttle: {
            path: `/v1/directory/trash/${driveId}`,
            method: Method.post,
            endpoint: Hostname.root,
            payloads: ids,
          },
          authCookie,
          nextAction: (res, err) => cb(res, err)
        })
      }

      const postrestoreFromTrash = ({driveId, ids }, cb) => (dispatch, getState) => {
        const authCookie = getState()._mydataList.authCookie

        return dispatch({
          type: [
            POST_RESTORE_TRASH_REQUEST,
            POST_RESTORE_TRASH_SUCCESS,
            POST_RESTORE_TRASH_ERROR
          ],  
          shuttle: {
            path: `/v1/directory/trash/${driveId}/restore`,
            method: Method.post,
            endpoint: Hostname.root,
            payloads: ids,
          },
          authCookie,
          nextAction: (res, err) => cb(res, err)
        })
      }   

      const handleActionTrash = (type = 'move') => (dispatch, getState) => {
        const _mydataList = getState()._mydataList
        const {selected} = _mydataList

        const selecteds = [...Object.values(selected)];
        const driveId = _mydataList.headers['V-DRIVEID'] || '"f15acdba-e37d-4eff-90d4-1e95e21fe64f"';

        const flattenSelect = Object.values(selecteds).flatMap((select) => select);
        const ids = flattenSelect.map((s) => (s.id));

        if (type === 'move') {
          dispatch(postMoveToTrash({ driveId, ids }))
        } else {
          dispatch(postrestoreFromTrash({ driveId, ids }))
        }
      }
    //=======

    //======= ASSET 
      const handleFunctionDoc = () => {
        getFunctionDoc(componentType,(res, asset)=>{
          let accuracy = 0;
          if (asset[0].type === 'Model') {
            getAccuracy(asset[0] ,(resAccuracy) => {
              return setPreviewAsset(resAccuracy, 'assetDetail')
            }); 
          }
          return setPreviewAsset(accuracy, 'assetDetail')
        })
      }

      const getFunctionDoc = (cb) => (dispatch, getState) => {
        const authCookie = getState()._mydataList.authCookie
        const _mydataList = getState()._mydataList
  
        const { selected: { asset } } = _mydataList
        return dispatch({
          type: [
            GET_FUNCTION_DOC_REQUEST,
            GET_FUNCTION_DOC_SUCCESS,
            GET_FUNCTION_DOC_ERROR,
          ],
          shuttle: {
            path: `/manages/assets/function-doc/${asset[0].id}?component_type=${`${asset.type}`.toUpperCase()}&access_token=${authCookie}`,
            method: Method.get,
            endpoint: Hostname.web,
          },
          authCookie,
          nextAction: (res, err) => {
            const data = typeof res !== 'undefined' && !!res && typeof res.error === 'undefined' ? res : [];
            cb(data, asset, err)
          }
        })
      }
      
      const getAccuracy = (assetId,  cb) => (dispatch, getState) => {
        //sample authCookie, akan dihapus
        const authCookie = getState()._mydataList.authCookie
        //

        return dispatch({
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
        })
      }
    //==========


    //==========INFO DRAWER
      const handleShowInfoDrawer = () => {
        return setToggleModal('infoDrawer')
      }
    //==========

    // ====== ConfirmationModal 
      const handleConfirmationModal = (props) => {
        return setToggleModal('confirmationModal')  //harus ada yang diset lagi
      }
    //=======

    // ====== Syncro 
      const putSyncDatasource = () => (dispatch, getState) => {
        //sample authCookie, akan dihapus
        const authCookie = getState()._mydataList.authCookie
        const connectorId = getState()._mydataList.selected.datasource[0].id

        return dispatch({
          type: [
            PUT_SYNC_DATASOURCE_REQUEST,
            PUT_SYNC_DATASOURCE_SUCCESS,
            PUT_SYNC_DATASOURCE_ERROR,
          ],
          shuttle: {
            path: `/v1/connector/${connectorId}/sync`,
            method: Method.put,
            endpoint: Hostname.root,
          },
          authCookie,
          nextAction: (res, err) => {
            cb(res, err)
          }
        })
      }
    
      const handleSync = () => {
        putSyncDatasource((res) =>{
          if(!!res){
            setToggleModal('sync')
            setEntityList()
          }
        })
      }
    //======

  //END ACTIONS ON MENURIGHT CLICK
// ****** END Action on Entity TableRows My Data ***** //


const entitiesbyLocation = (_mydataList) => {
  const { models, datasets, entities } = _mydataList;
  const newEntities = {
    [LOCATIONS.DATASET]: datasets,
    [LOCATIONS.MODEL]: models,
    default: entities
  };
  return newEntities[location] || newEntities.default;
}

const entityTypebyLocation = () => {
  const entities = {
    [LOCATIONS.DATASET]: 'datasets',
    [LOCATIONS.MODEL]: 'models',
    default: 'entity'
  };
  return entities[location] || entities.default;
}

export const handleSort = (name) => (dispatch, getState) => {
  const _mydataList = getState()._mydataList
  const inActiveField = _mydataList.activeField === name;

  const sort = {
    activeField: name,
    isAsc: inActiveField ? !_mydataList.sort.isAsc : false
  }

  const entities = sortColumn({
    name,
    entities: entitiesbyLocation(_mydataList),
    entityType: entityTypebyLocation(),
    sortType: (_mydataList.sort.isAsc ? 'asc' : 'desc')
  });

  const values = {sort, entities}
  dispatch(setValues(values))
}