import React from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from '../../../../page-layouts/layout-content-sidebar'
import TableList  from '../../../../components/table-list'
import MenuBar from './menu-bar'

const toggleShow = (name, data = {}) => {
  this.setState(({ show, modalData }) => {
    const newModalData = name === 'confirmationModal' ? data : modalData;
    return { modalData: { ...newModalData }, show: { ...show, [name]: !show[name] } };
  });
}

const List = props => {
  const { _mydata } = props
  console.log("_mydata ====", _mydata)
  return (
    <>
      { _mydata.show.menubar && 
        <MenuBar 
          handleChangeMenu = {props.handleChangeMenu} 
          isSensorGroup = {props.isSensorGroup} 
          onMouseLeave = {props.renderMouseLeave}
        />
      }

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
              
              {/* { this.state.show.entityContent && this.renderEntity() }
              { !notAbleToaddNewData && show.infoDrawer && this.renderInfoDrawer() } */}
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
  isSensorGroup: PropTypes.bool,
  handleAddNewData: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func,
  renderMouseLeave: PropTypes.func,
}

List.defaultProps = {
  isSensorGroup: false,
  handleChangeMenu: null,
  renderMouseLeave: null,
}

export default List