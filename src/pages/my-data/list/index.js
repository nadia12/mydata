import React from 'react'
import { connect } from 'react-redux'
import List from './units'
import uuidv4 from 'uuid/v4';
// import { getPermisson } from 'Helper/'

import { 
  setHeaders,
  setEntityList, 
  postConnectorData,
  handleChangeMenuRight,
  handleChangeTopMenu,
  handleChangeInput,
  handleSort,
} from './function'

import {
  setToggleModal,
  setToggleModalClose,
  setToggleModalOpen,
  setValues,
  setValue,
  setAuthCookie,
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
  setHeaders: () => dispatch(setHeaders()),
  setAuthCookie: (props) => dispatch(setAuthCookie(props)),
  handleSort: (name) => {
    return dispatch(handleSort(name))
  },
  handleToggleModal: (modalType) => dispatch(setToggleModal(modalType)),
  handleAddNewData: () => { 
    dispatch(setToggleModalOpen('menubar'))
    return dispatch(setToggleModalClose('menubarRight'))
  },
  handleChangeTopMenu: (menu) => {
    dispatch(setToggleModalClose('menubar'))
    return dispatch(handleChangeTopMenu(menu))
  },
  handleChangeMenuRight: (menu, value) => {
    dispatch(setToggleModalClose('menubarRight'))
    return dispatch(handleChangeMenuRight(menu, value))
  },
  handleNewSensorGroupAdd: async (tHeaders, sensorGroupFields) => {
    //ini belum yaa
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
  setEntityList: () => dispatch(setEntityList()),
  getPermission: () => dispatch(setValue("actionPermission", "")),
  postConnectorData: (connectorIds) => { 
    return dispatch(postConnectorData(connectorIds, (res)=>{
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
