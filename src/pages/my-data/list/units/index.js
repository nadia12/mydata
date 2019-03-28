import React from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from 'PageLayouts/layout-content-sidebar'
import lifecycle from 'react-pure-lifecycle'
import method from './lifecycle'
import {MainContentStyle} from 'PageLayouts/layout-content-sidebar/units/style'
import {Row, Column} from 'volantis-ui'
// component
import TableList  from 'GlobalComponent/table-list'
import MenuBar from './menu-bar'
import TableRows from './table-rows'
import MenuBarRight from './menu-bar-right'
import NewFolderModal from './modal/new-folder'
import InfoDrawer from './info-drawer';

const renderNewFolder = props => {
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
      
      { _mydataList.show.menubarRight &&
        <div style={{ display: 'inline', position: 'absolute', left: `${_mydataList.position.left}rem`, top: `${_mydataList.position.top}rem` }} id="menuBar">
          <MenuBarRight menuType='right-click' handleChangeMenu={props.handleChangeMenuRight} menuList={_mydataList.menuList} />
        </div>
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
            <Row className="columns m0 fit-table">
            
              { 
                _mydataList.show.entityContent && 
                <Column xs={ _mydataList.show.infoDrawer ? 8 : 12} className='p0'>
                  <TableList isSortAble handleSort={props.handleSort} thead={props.THEAD}>
                    <TableRows />
                  </TableList>
                </Column>
              }

              { !props.isInSystemFolder() && _mydataList.show.infoDrawer && 
                <Column xs={4} className='border-left-1 p0'>
                  <InfoDrawer />
                </Column>
              } 
            
            </Row>
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
  handleChangeMenuRight: PropTypes.func,
  isSensorGroup: PropTypes.bool,
}
  
List.defaultProps = {
  isSensorGroup: false,
  handleChangeMenu: null,
  handleMouseLeave: null,
  handleChangeMenuRight: null,
}

List.propTypes = {
  getDatasetList: PropTypes.func,
}

export default lifecycle(method)(List)