import React, {useState} from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from '../../../../page-layouts/layout-content-sidebar'
import TableList  from '../../../../components/table-list'
import lifecycle from 'react-pure-lifecycle'
import method from './lifecycle'
import MenuBar from './menu-bar'
// import MenuBarRight from './menu-bar-right'
import NewFolderModal from './modal/new-folder'

const renderNewFolder = props => {
  console.log("renderNewFolder props ==>", props);

  return(
    <NewFolderModal
      rules={props._mydataList.rules.newFolder.fields[0] || {}}
      allFields={props._mydataList.fields || {}}
      allRules={props._mydataList.rules || {}}
      folderName={props._mydataList.fields.newFolder.folderName}
      isValid={props._mydataList.isValid.newFolder}
      allIsValids={props._mydataList.isValid}
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

const List = props => {
  const { _mydataList } = props
  return (
    <>
      { _mydataList.show.menubar && 
        <MenuBar 
          handleChangeMenu = {props.handleChangeMenu} 
          isSensorGroup = {props.isSensorGroup} 
          onMouseLeave = {props.handleMouseLeave}
        />
      }
      {
        /* { _mydataList.show.menubarRight &&
        <div style={{ display: 'inline', position: 'absolute', left: `${_mydataList.position.left}rem`, top: `${_mydataList.position.top}rem` }} id="menuBar">
          <MenuBarRight handleChangeMenu={props.handleRightMenu} menuList={_mydataList.menuList} />
        </div>
      } */
      }
      { _mydataList.show.newFolder && renderNewFolder(props) }
      { _mydataList.show.newSensorGroup && renderNewSensorGroup(props) }
      {/* _mydataList.show.assetDetail && props.renderAssetDetail() }
      { _mydataList.show.confirmationModal && props.renderConfirmationModal() } */}

      <LayoutContentSidebar
        isAddAble = {true}
        handleAddNewData ={props.handleAddNewData}
        addButtonTitle ="Add New Data"
        show={_mydataList.show}
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
            { 
              _mydataList.show.entityContent && 
              <TableList 
                staticFolders={props.staticFolders } 
                renderTrEntities={props.renderTrEntities}
              />
            }
              
              {/* { this.state.show.entityContent && this.renderEntity() */} 
              { !props.inStaticFolders() && _mydataList.show.infoDrawer && props.renderInfoDrawer() } 
            </div>
          </div>
        </div>
      </LayoutContentSidebar>
    </>
  )
}


// All states of _mydata listed on ../constant.js
List.propTypes = {
  _mydataList: PropTypes.object.isRequired,
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

List.propTypes = {
  getDatasetList: PropTypes.func,
}

export default lifecycle(method)(List)