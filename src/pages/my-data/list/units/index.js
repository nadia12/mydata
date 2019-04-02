import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import method from './lifecycle'
import {Row, Column} from 'volantis-ui'

// component
import LayoutContentSidebar from 'PageLayouts/layout-content-sidebar'
import TableList  from 'GlobalComponent/table-list'
import MenuBar from './menu-bar'
import MenuBarRight from './menu-bar-right'
import TableRows from './table-rows'
import InfoDrawer from './info-drawer';
import NewFolderModal from './modal/new-folder'
import ConfirmationModal from './modal/confirmation'

const List = props => {
  const { _mydataList } = props
  return (
    <>
      { _mydataList.show.menubar && 
        <MenuBar 
          handleChangeMenu = {props.handleChangeTopMenu} 
          isSensorGroup = {props.isSensorGroup} 
          onMouseLeave = {props.handleMouseLeave}
        />
      }
      
      { _mydataList.show.menubarRight &&
        <div style={{ display: 'inline', position: 'absolute', left: `${_mydataList.position.left}rem`, top: `${_mydataList.position.top}rem` }} id="menuBar">
          <MenuBarRight 
            menuType='right-click' 
            handleChangeMenu={props.handleChangeMenuRight} 
            menuList={_mydataList.menuList} />
        </div>
      } 
      
      { _mydataList.show.newFolder && <NewFolderModal /> }
      {/* { _mydataList.show.newSensorGroup && props.renderNewSensorGroup(props) } */}
      {/* _mydataList.show.assetDetail && props.renderAssetDetail() */}
      { _mydataList.show.confirmationModal && <ConfirmationModal /> }

      <LayoutContentSidebar
        isAddAble = {true}
        handleAddNewData ={props.handleAddNewData}
        addButtonTitle ="Add New Data"
        show={_mydataList.show}
        pathname = {'/my-data'}
        isSearchAble = {true}
        handleSearchChange = {props.handleSearchChange}
        handleSearchList = {props.handleSearchList}
        search={_mydataList.search.list || ''}
        handleBreadcrumbChange={null}
        breadcrumbList={[{ title: 'My Data', link: '/my-data' }]}
        renderFooter = {props.renderFooter}
      >

        <div className="columns m0">
          <div className="column main-content-body fit-table">
            <Row className="columns m0 fit-table">
            
              { 
                _mydataList.show.entityContent && 
                <Column xs={ _mydataList.show.infoDrawer ? 8 : 12} className='p0'>
                  <TableList 
                    isSortAble 
                    handleSort={props.handleSort} 
                    thead={props.THEAD} 
                    sort={_mydataList.sort}
                  >
                    <TableRows />
                  </TableList>
                </Column>
              }

              { !props.isInSystemFolder && _mydataList.show.infoDrawer && 
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
  handleChangeTopMenu: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  handleChangeMenuRight: PropTypes.func,
  getBreadcrumbList: PropTypes.func,
  isSensorGroup: PropTypes.bool,
  isInSystemFolder: PropTypes.bool,
  search: PropTypes.string.isRequired
}
  
List.defaultProps = {
  isSensorGroup: false,
  handleChangeMenu: null,
  handleMouseLeave: null,
  handleChangeMenuRight: null,
  getBreadcrumbList: () => {},
}

List.propTypes = {
  getDatasetList: PropTypes.func,
}

export default lifecycle(method)(List)