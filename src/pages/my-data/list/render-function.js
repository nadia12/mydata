import React from 'react';
import { ModalConfirmation } from 'volantis-ui'
import NewFolderModal from './units/modal'
import { CONFIRMATION_CONTENT } from './constant'
import { handleCloseModal } from './function'

// show: {
//   menubar: false,
//   newFolder: false,
//   newSensorGroup: false,
//   confirmationModal: false,
//   assetDetail: false,
//   infoDrawer: false,
//   entityContent: false,
//   menubarRight: false
// },

const actionOnConfirm = (modalData) => {
  const { type, menu } = modalData;
  const actions = {
    addToSensorGroup: () => this.handleAddToSensorGroup(menu),
    addToPipeline: () => this.handleCreatePipeline()
  };

  return actions[type];
};


const renderNewSensorGroup = props => {
  // let { sensors } = props._mydataList;
  // // if (sensors.length > 0) sensors = sensors.filter((sensor) => sensor.status === SENSOR_STATUS.mappingRequired);
  // return (
  //   // <NewSensorGroupModal
  //   //   fields={props._mydataList.fields.newSensorGroup}
  //   //   rules={props._mydataList.rules.newSensorGroup}
  //   //   sensors={sensors}
  //   //   isValid={props._mydataList.isValid.newSensorGroup}
  //   //   handleChangeInput={this.handleChangeInput}
  //   //   handleSelectSensor={this.handleNewSensorGroupSelectSensor}
  //   //   search={props._mydataList.search.newSensorGroup}
  //   //   handleAdd={this.handleNewSensorGroupAdd}
  //   //   handleCloseModal={props.handleToggleModal}
  //   //   handleChangeSearch={this.handleNewSensorGroupChangeSearch}
  //   // />
  // );
};