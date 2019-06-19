import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import { Row, Column } from 'volantis-ui'
import { DeleteIcon, MyDataIcon } from 'volantis-icon'

// component
import LayoutContentSidebar from 'PageLayouts/layout-content-sidebar'
import TableList from 'GlobalComponent/table-list'
import COLORS from 'Asset/css/mydata-colors'
import MenuBar from './menu-bar'
import MenuBarRight from './menu-bar-right'
import TableRows from './table-rows'
import InfoDrawer from './info-drawer'
import NewFolderModal from './modal/new-folder'
import ConfirmationModal from './modal/confirmation'
import AssetDetailModal from './modal/asset-detail'
import method from './lifecycle'

const List = props => {
  const {
    filesData,
    files,
    show,
    position,
    menuList,
    search,
    sort,
    isInTrash,
    lastEntitiesLength,
    _mydataList,
  } = props
  const inTrash = isInTrash()

  const fileInformation = {
    ...filesData,
    files,
  }

  console.log('LIST ==> ', _mydataList)

  return (
    <>
      { show.menubar
        && (
        <MenuBar
          handleSetUploadFile={props.handleSetUploadFile}
          handleChangeMenu={props.handleChangeTopMenu}
          isSensorGroup={props.isSensorGroup}
          onMouseLeave={props.handleMouseLeave}
        />
        )
      }
      { show.menubarRight && !!menuList.length
        && (
        <div
          style={{
            display: 'inline', position: 'absolute', left: `${position.left}rem`, top: `${position.top}rem`,
          }}
          id="menuBar"
        >
          <MenuBarRight
            menuType="right-click"
            handleChangeMenu={props.handleChangeMenuRight}
            menuList={menuList}
          />
        </div>
        )
      }

      { show.newFolder && <NewFolderModal linkTo={props.linkTo} /> }
      {/* { show.newSensorGroup && props.renderNewSensorGroup(props) } */}
      { show.assetDetail && <AssetDetailModal handleToApiManagement={props.handleToApiManagement} /> }
      { show.confirmationModal && <ConfirmationModal /> }

      <LayoutContentSidebar
        addAction={{
          isActive: !inTrash,
          action: props.handleAddNewData,
          title: 'Add New Data',
        }}
        searchAction={{
          isActive: !inTrash,
          onChange: props.handleSearchChange,
          onEnter: props.handleSearchList,
          value: search.list,
        }}
        trashAction={{
          isActive: true,
          action: props.onClickTrashBin,
          icon: inTrash ? <MyDataIcon color={COLORS.gold} /> : <DeleteIcon color={COLORS.gold} />,
          title: inTrash ? 'My Data' : 'Trash Bin',
        }}
        breadcrumbList={props.getBreadcrumbList()}
        footerText={props.setFooterText()}
        onOutsideClick={props.onOutsideClick}
        isUpload={show.snackbarUpload}
        fileInformation={fileInformation}
      >
        <div className="columns m0">
          <div className="column main-content-body fit-table">
            <Row className="columns m0 fit-table height-min-40">
              {
                <Column xs={show.infoDrawer ? 8 : 12} className="p0">
                  <TableList
                    sortAction={{ isActive: !inTrash, action: props.handleSort }}
                    scrollAction={{ isActive: (!inTrash && !!lastEntitiesLength), action: props.handleScroll }}
                    theads={props.THEAD}
                    sort={(inTrash && {}) || sort}
                  >
                    <TableRows theads={props.THEAD} linkTo={props.linkTo} />
                  </TableList>
                </Column>
              }

              { show.infoDrawer
                && (
                <Column xs={4} className="border-left-1 p0">
                  <InfoDrawer />
                </Column>
                )
              }
            </Row>
          </div>
        </div>
      </LayoutContentSidebar>
    </>
  )
}

// All states of _mydata listed on ../initial-state.js
// { show, position, menuList, search, sort }

List.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  menuList: PropTypes.array.isRequired,
  search: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  handleAddNewData: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleToApiManagement: PropTypes.func.isRequired,
  handleChangeTopMenu: PropTypes.func.isRequired,
  THEAD: PropTypes.array.isRequired,
  handleMouseLeave: PropTypes.func,
  handleChangeMenuRight: PropTypes.func,
  handleSearchList: PropTypes.func,
  handleSort: PropTypes.func,
  setFooterText: PropTypes.func,
  getBreadcrumbList: PropTypes.func,
  isSensorGroup: PropTypes.bool,
  isInTrash: PropTypes.func,
  onClickTrashBin: PropTypes.func,
  onOutsideClick: PropTypes.func,
  handleScroll: PropTypes.func,
  lastEntitiesLength: PropTypes.number,
  linkTo: PropTypes.func,
  handleSetUploadFile: PropTypes.func,
  filesData: PropTypes.object,
  files: PropTypes.object,
}

List.defaultProps = {
  files: [],
  filesData: {},
  isSensorGroup: false,
  handleMouseLeave: null,
  handleChangeMenuRight: () => {},
  handleSort: () => {},
  handleSearchList: () => {},
  getBreadcrumbList: () => {},
  setFooterText: () => {},
  isInTrash: false,
  lastEntitiesLength: 0,
  onClickTrashBin: () => {},
  onOutsideClick: () => {},
  handleScroll: () => {},
  linkTo: () => {},
  handleSetUploadFile: () => {},
}

export default lifecycle(method)(List)
