import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import { Row, Column } from 'volantis-ui'
import { DeleteIcon, MyDataIcon } from 'volantis-icon'

// component
import LayoutContentSidebar from 'PageLayouts/layout-content-sidebar'
import TableList from 'GlobalComponent/table-list'
import COLORS from 'Asset/css/colors'
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
    show,
    position,
    menuList,
    search,
    sort,
    isInTrash,
    lastEntitiesLength,
  } = props
  const inTrash = isInTrash()

  return (
    <>
      { show.menubar
        && (
        <MenuBar
          handleChangeMenu={props.handleChangeTopMenu}
          isSensorGroup={props.isSensorGroup}
          onMouseLeave={props.handleMouseLeave}
        />
        )
      }
      { show.menubarRight
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

      { show.newFolder && <NewFolderModal /> }
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
          action: props.onClickTrash,
          icon: inTrash ? <MyDataIcon color={COLORS.gold} /> : <DeleteIcon color={COLORS.gold} />,
          title: inTrash ? 'My Data' : 'Trash Bin',
        }}
        breadcrumbList={props.getBreadcrumbList()}
        footerText={props.setFooterText()}
        onOutsideClick={props.onOutsideClick}
      >
        <div className="columns m0">
          <div className="column main-content-body fit-table">
            <Row className="columns m0 fit-table">
              {
                <Column xs={show.infoDrawer ? 8 : 12} className="p0">
                  <TableList
                    sortAction={{ isActive: !inTrash, action: props.handleSort }}
                    scrollAction={{ isActive: (!inTrash && !!lastEntitiesLength), action: props.handleScroll }}
                    theads={props.THEAD}
                    sort={(inTrash && {}) || sort}
                  >
                    <TableRows theads={props.THEAD} />
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
  show: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  menuList: PropTypes.object.isRequired,
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
  onClickTrash: PropTypes.func,
  onOutsideClick: PropTypes.func,
  handleScroll: PropTypes.func,
  lastEntitiesLength: PropTypes.number,
}

List.defaultProps = {
  isSensorGroup: false,
  handleMouseLeave: null,
  handleChangeMenuRight: () => {},
  handleSort: () => {},
  handleSearchList: () => {},
  getBreadcrumbList: () => {},
  setFooterText: () => {},
  isInTrash: false,
  lastEntitiesLength: 0,
  onClickTrash: () => {},
  onOutsideClick: () => {},
  handleScroll: () => {},
}

export default lifecycle(method)(List)
