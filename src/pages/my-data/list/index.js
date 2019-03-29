import React from 'react'
import { connect } from 'react-redux'
import List from './units'
import uuidv4 from 'uuid/v4';
// import { getPermisson } from 'Helper/'

import {
  LOCATIONS,
  FILE_TYPES,
} from './constant'

import {
  DEFAULT_STATE
} from './initial-states'

import { 
  setHeaders,
  setEntityList, 
  postConnectorData,
  handleChangeMenuRight,
  handleChangeTopMenu,
  handleChangeInput,
} from './function'

import {
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValues,
  setValue,
} from './reducer'

import {
  location,
  isInSystemFolder,
} from './local-helper'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
  isInSystemFolder: isInSystemFolder
})

const mapDispatchToProps = (dispatch) => ({
  setHeaders: () => {
    dispatch(setHeaders())
  },
  handleToggleModal: (modalType) => {
    dispatch(setToggleModal(modalType))
  },
  handleAddNewData: () => { 
    dispatch(setToggleModalOpen('menubar'))
    dispatch(setToggleModalClose('menubarRight'))
  },
  handleChangeTopMenu: (menu) => {
    console.log("MENUUUU==>", menu)
    dispatch(setToggleModalClose('menubar'))
    dispatch(dispatch(handleChangeTopMenu(menu)))
  },
  handleChangeMenuRight: (menu, value) => {
    console.log("MENUUUU!===>", menu, value)
    dispatch(setToggleModalClose('menubarRight'))
    dispatch(handleChangeMenuRight(menu, value))
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
    dispatch(setToggleModalClose('newSensorGroup')) //close it
  },
  handleChangeInput: (params) => dispatch(handleChangeInput(params)),
  handleMouseLeave() {
    dispatch(setToggleModalClose('menubar'))
    document.getElementById('mouse-leave').style.display = 'none'
  },
  // isInSystemFolder() {
  //   const location = window.localStorage.getItem('MYDATA.location');

  //   const isTrash = location === LOCATIONS.TRASH;
  //   const isModel = location === LOCATIONS.MODEL;
  //   const isPretrainedModel = location === LOCATIONS.PRETRAINED_MODEL;
  //   const isDataset = location === LOCATIONS.DATASET;

  //   return isModel || isPretrainedModel || isDataset || isTrash;
  // },
  setEntityList: () => dispatch(setEntityList()),
  getPermission: () => dispatch(setValue("actionPermission", "")),
  postConnectorData: (connectorIds) => { 
    dispatch(postConnectorData(connectorIds, (res)=>{
      dispatch(setToggleModalOpen("entityContent")) //show entityContent Table
      dispatch(setValue("connectorsData", res))
    }))
  },
  setBreadcrumb: () => {
    // const location = window.localStorage.getItem('MYDATA.location');
    // const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');
    console.log("setBreadcrumb")
    // localBreadcrumb.setOnLocal()
    // dispatch(setValue("inFilteredResult", localBreadcrumb()))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
