import React from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from '../../../../page-layouts/layout-content-sidebar'
import TableList  from '../../../../components/table-list'
import MenuBar from './menu-bar'
// import MenuBarRight from './menu-bar-right'
import NewFolderModal from './modal/new-folder'

const renderNewFolder = props => {
  console.log("renderNewFolder props ==>", props);

  return(
    <NewFolderModal
      rules={props._mydata.rules.newFolder.fields[0] || {}}
      allFields={props._mydata.fields || {}}
      allRules={props._mydata.rules || {}}
      folderName={props._mydata.fields.newFolder.folderName}
      isValid={props._mydata.isValid.newFolder}
      handleChangeInput={props.handleChangeInput}
      handleAdd={null} 
      handleCloseModal={props.handleToggleModal}
    />
  )
};

const renderNewSensorGroup = props => {
  // let { sensors } = props.list;
  // // if (sensors.length > 0) sensors = sensors.filter((sensor) => sensor.status === SENSOR_STATUS.mappingRequired);
  // return (
  //   // <NewSensorGroupModal
  //   //   fields={props._mydata.fields.newSensorGroup}
  //   //   rules={props._mydata.rules.newSensorGroup}
  //   //   sensors={sensors}
  //   //   isValid={props._mydata.isValid.newSensorGroup}
  //   //   handleChangeInput={this.handleChangeInput}
  //   //   handleSelectSensor={this.handleNewSensorGroupSelectSensor}
  //   //   search={props._mydata.search.newSensorGroup}
  //   //   handleAdd={this.handleNewSensorGroupAdd}
  //   //   handleCloseModal={props.handleToggleModal}
  //   //   handleChangeSearch={this.handleNewSensorGroupChangeSearch}
  //   // />
  // );
};

const List = props => {
  const { _mydata } = props
  console.log("_mydata ====", _mydata)
  return (
    <>
      { _mydata.show.menubar && 
        <MenuBar 
          handleChangeMenu = {props.handleChangeMenu} 
          isSensorGroup = {props.isSensorGroup} 
          onMouseLeave = {props.handleMouseLeave}
        />
      }
      {
        /* { _mydata.show.menubarRight &&
        <div style={{ display: 'inline', position: 'absolute', left: `${_mydata.position.left}rem`, top: `${_mydata.position.top}rem` }} id="menuBar">
          <MenuBarRight handleChangeMenu={props.handleRightMenu} menuList={_mydata.menuList} />
        </div>
      } */
      }
      { _mydata.show.newFolder && renderNewFolder(props) }
      { _mydata.show.newSensorGroup && renderNewSensorGroup(props) }
      {/* _mydata.show.assetDetail && props.renderAssetDetail() }
      { _mydata.show.confirmationModal && props.renderConfirmationModal() } */}

      <LayoutContentSidebar
        isAddAble = {true}
        handleAddNewData ={props.handleAddNewData}
        addButtonTitle ="Add New Data"
        show={_mydata.show}
        pathname = {'/my-data'}
        isSearchAble = {true}
        handleSearchChange = {null}
        handleSearchList = {null}
        search={''}
        handleBreadcrumbChange={null}
        breadcrumbList={[{ title: 'My Data', link: '/my-data' }]}
      >

        <div className="columns m0">
          <div className="column main-content-body fit-table">
            <div className="columns m0 fit-table">
              <TableList staticFolders={props.staticFolders }/>
              
              {/* { this.state.show.entityContent && this.renderEntity() */} 
              { !props.inStaticFolders() && _mydata.show.infoDrawer && props.renderInfoDrawer() } 
            </div>
          </div>
        </div>
      </LayoutContentSidebar>
    </>
  )
}


// All states of _mydata listed on ../constant.js
List.propTypes = {
  _mydata: PropTypes.object.isRequired,
  staticFolders: PropTypes.array.isRequired,
  inStaticFolders: PropTypes.bool.isRequired,
  handleAddNewData: PropTypes.func.isRequired,
  handleToggleModal: PropTypes.func,isRequired,
  handleNewSensorGroupAdd: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  isSensorGroup: PropTypes.bool,
}

List.defaultProps = {
  isSensorGroup: false,
  handleChangeMenu: null,
  handleMouseLeave: null,
}

export default List