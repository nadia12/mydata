import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import { Row, Column } from 'volantis-ui'

// component
import LayoutContentSidebar from 'PageLayouts/layout-content-sidebar'
import TableList from 'GlobalComponent/table-list'
import MenuBar from './menu-bar'
import MenuBarRight from './menu-bar-right'
import TableRows from './table-rows'
import InfoDrawer from './info-drawer'
import NewFolderModal from './modal/new-folder'
import ConfirmationModal from './modal/confirmation'
import AssetDetailModal from './modal/asset-detail'
import method from './lifecycle'
import {
  isInSystemFolder,
} from '../local-helper'

const List = props => {
  const { _mydataList } = props

  return (
    <>
      { _mydataList.show.menubar
        && (
        <MenuBar
          handleChangeMenu={props.handleChangeTopMenu}
          isSensorGroup={props.isSensorGroup}
          onMouseLeave={props.handleMouseLeave}
        />
        )
      }
      { _mydataList.show.menubarRight
        && (
        <div
          style={{
            display: 'inline', position: 'absolute', left: `${_mydataList.position.left}rem`, top: `${_mydataList.position.top}rem`,
          }}
          id="menuBar"
        >
          <MenuBarRight
            menuType="right-click"
            handleChangeMenu={props.handleChangeMenuRight}
            menuList={_mydataList.menuList}
          />
        </div>
        )
      }

      { _mydataList.show.newFolder && <NewFolderModal /> }
      {/* { _mydataList.show.newSensorGroup && props.renderNewSensorGroup(props) } */}
      { _mydataList.show.assetDetail && <AssetDetailModal /> }
      { _mydataList.show.confirmationModal && <ConfirmationModal /> }

      <LayoutContentSidebar
        addAction={{
          isActive: !isInSystemFolder(),
          action: props.handleAddNewData,
          title: 'Add New Data',
        }}
        searchAction={{
          isActive: true,
          onChange: props.handleSearchChange,
          onEnter: props.handleSearchList,
          value: _mydataList.search.list,
        }}
        breadcrumbList={props.getBreadcrumbList()}
        footerText={props.setFooterText()}
      >

        <div className="columns m0">
          <div className="column main-content-body fit-table">
            <Row className="columns m0 fit-table">

              {
                _mydataList.show.entityContent
                && (
                <Column xs={_mydataList.show.infoDrawer ? 8 : 12} className="p0">
                  <TableList
                    isSortAble
                    handleSort={props.handleSort}
                    theads={props.THEAD}
                    sort={_mydataList.sort}
                  >
                    <TableRows theads={props.THEAD} />
                  </TableList>
                </Column>
                )
              }

              { !isInSystemFolder() && _mydataList.show.infoDrawer
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
List.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  handleAddNewData: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleChangeTopMenu: PropTypes.func.isRequired,
  THEAD: PropTypes.array.isRequired,
  handleMouseLeave: PropTypes.func,
  handleChangeMenuRight: PropTypes.func,
  handleSearchList: PropTypes.func,
  handleSort: PropTypes.func,
  setFooterText: PropTypes.func,
  getBreadcrumbList: PropTypes.func,
  isSensorGroup: PropTypes.bool,
}

List.defaultProps = {
  isSensorGroup: false,
  handleMouseLeave: null,
  handleChangeMenuRight: () => {},
  handleSort: () => {},
  handleSearchList: () => {},
  getBreadcrumbList: () => {},
  setFooterText: () => {},
}

export default lifecycle(method)(List)

