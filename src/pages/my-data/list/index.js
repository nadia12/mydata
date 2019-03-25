import React from 'react'
import { connect } from 'react-redux'
import List from './units'
import InfoDrawer from './units/info-drawer'
import uuidv4 from 'uuid/v4';
import inputReplacer from '../../../config/lib/input-replacer';
import checkRequired from '../../../config/lib/input-check-required';

import {
  staticFolders,
  LOCATIONS,
  DEFAULT_STATE,
  FILE_TYPES,
} from './constant'

import {
  setToggleModal,
  setValues,
  setValue,
} from './reducer'

const mapStateToProps = state => ({
  _mydata: state._mydataList,
  staticFolders: staticFolders,
})

const mapDispatchToProps = dispatch => ({
  /* 1. AddModalNew */
  handleToggleModal: (modalType) => {
    dispatch(setToggleModal(modalType))
  },
  handleAddNewData: () => {
    dispatch(setToggleModal('menubar'))
  },
  handleChangeMenu: (menu) => {
    const lmenu = menu.toLowerCase();
    // dispatch(setToggleModal('menubar')) //close it

    // const { list: { entity } } = this.props;
    // let createHeader;

    // if (entity.length > 0) {
    //   const { driveId, name, parentId } = entity[0];
    //   createHeader = { driveId, name, parentId };
    // } else {
    //   createHeader = { driveId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT };
    // }
    // window.localStorage.setItem('MYDATA.create', JSON.stringify(createHeader));

    // if (['file', 'sql', 'device', 'media'].includes(lmenu)) router.push(`${RoutePath.createMyData}?type=${menu.toLowerCase()}`);
    if (lmenu === 'folder') {
      dispatch(setValue('fields', DEFAULT_STATE.fields ))
      dispatch(setToggleModal('newFolder')) //open it
      
    } else if (lmenu === 'sensorgroup') {
      // this.fetchSensorList();
      dispatch(setValue('fields', { ...DEFAULT_STATE.fields }))
      dispatch(setToggleModal('newSensorGroup')) //open it
    }
  },
  handleNewSensorGroupAdd: async (tHeaders, sensorGroupFields) => {
    const groupMappingId = uuidv4();

    const reqDataSG = {
      name: sensorGroupFields.sensorGroupName,
      description: sensorGroupFields.description,
      mappingScheme: null,
      groupMappingId
    };

    const headers = { ...tHeaders, 'V-NAME': sensorGroupFields.sensorGroupName };
    // this.props.createNewSensorGroup({ reqData: reqDataSG, headers });
    // await this.props.addToSensorGroup({
    //   reqData: {
    //     groupMappingId,
    //     sensors: sensorGroupFields.sensors || null
    //   },
    //   headers
    // });
    // this.handleSearchTypeChange(DEFAULT_TYPE_LABEL); // return the default search to all type
    // this.fetchEntityList();
    // this.toggleShow('newSensorGroup');
    dispatch(setToggleModal('newSensorGroup')) //close it
  },
  handleNewFolderAdd: async (headers, newFolderFields) => {
    dispatch(setToggleModal('newFolder')) //close it

    const location = window.localStorage.getItem('MYDATA.location');
    const locationExist = typeof location !== 'undefined' && !!location;
    const data = {
      type: FILE_TYPES.COLLECTION,
      name: newFolderFields.newFolder.folderName,
      parentId: locationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT,
      creatorName: headers['V-CREATORNAME'],
      creatorId: headers['V-CREATORID'],
      size: 0,
      driveId: headers['V-DRIVEID'],
      entityType: null,
      additionalData: null,
      id: uuidv4()
    };

    dispatch

    await new Promise(resolve => setImmediate(resolve));
    // await this.props.createNewEntity(data);
    // this.handleSearchTypeChange(DEFAULT_TYPE_LABEL); // return the default search to all type
    // if (this.props.list.errorMsg !== '') this.toggleShow('failedCreateEntity', { type: 'failedCreateEntity' });
  },
  handleChangeInput: ({ allFields, allRules, allIsValids, fieldName, key, value, replacer = '', valueReplacer = '' }) => {
    // const { fields, rules } = props._mydata;
    const currentData = { ...allFields[fieldName], [key]: replacer === '' ? value : inputReplacer(replacer, value, valueReplacer) };
    const currentRules = { ...allRules };
    currentRules[fieldName].touched = { ...currentRules[fieldName].touched, [key]: true };
    const isValid = !checkRequired(currentData, currentRules[fieldName].required);
    const values = 
    {
      isValid: { ...allIsValids, [fieldName]: isValid },
      rules: currentRules,
      fields: {
        ...allFields,
        [fieldName]: currentData
      }
    }

    dispatch(setValues(values))
  },
  handleMouseLeave() {
    dispatch(setToggleModal('menubar'))
    document.getElementById('mouse-leave').style.display = 'none'
  },
  
  renderInfoDrawer(selected) {
    // const { selected } = this.state;
    let selectedItem = '';
    const location = window.localStorage.getItem('MYDATA.location');
    const path = JSON.parse(location).name === 'ROOT' ? 'My Data' : JSON.parse(location).name;

    if (selected.sensorgroup.length === 1) selectedItem = selected.sensorgroup[0];
    else if (selected.sensor.length === 1) selectedItem = selected.sensor[0];
    else if (selected.datasource.length === 1) selectedItem = selected.datasource[0];
    else if (selected.folder.length === 1) selectedItem = selected.folder[0];
    else if (selected.asset.length === 1) selectedItem = selected.asset[0];
    else return null;

    return (
      <InfoDrawer selectedItem setToggleModal path/>
    );
  },
  inStaticFolders() {
    const location = window.localStorage.getItem('MYDATA.location');

    const isTrash = location === LOCATIONS.TRASH;
    const isModel = location === LOCATIONS.MODEL;
    const isPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL;
    const isDataset = location === LOCATIONS.DATASET;

    return isModel || isPretrainedModel || isDataset || isTrash;
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
