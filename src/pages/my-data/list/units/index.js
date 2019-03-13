import React from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from '../../../../page-layouts/layout-content-sidebar'
import TableList  from '../../../../components/table-list'

const List = props => (
  <LayoutContentSidebar>
    <div className="columns m0">
      <div className="column main-content-body fit-table">
        <div className="columns m0 fit-table">
          <TableList hasStaticFolders/>
          {/* { this.state.show.entityContent && this.renderEntity() }
          { !notAbleToaddNewData && show.infoDrawer && this.renderInfoDrawer() } */}
        </div>
      </div>
    </div>
  </LayoutContentSidebar>
)

List.propTypes = {

}

List.defaultProps = {
}

export default List