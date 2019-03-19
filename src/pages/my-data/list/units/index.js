import React, {useState} from 'react'
import PropTypes from 'prop-types'
import LayoutContentSidebar from '../../../../page-layouts/layout-content-sidebar'
import TableList  from '../../../../components/table-list'
import lifecycle from 'react-pure-lifecycle'
import method from './lifecycle'
import { DEFAULT_STATE } from '../constant'


const List = props => {
  // useEffect(() => {
  //   getEntityList()
  // }, [])
  const [defaultState, setDefaultState] = useState({ ...DEFAULT_STATE })

  return (
    <LayoutContentSidebar>
    <div className="columns m0">
      <div className="column main-content-body fit-table">
        <div className="columns m0 fit-table">
          <TableList hasStaticFolders listMyData={props}/>
          {/* { this.state.show.entityContent && this.renderEntity() }
          { !notAbleToaddNewData && show.infoDrawer && this.renderInfoDrawer() } */}
        </div>
      </div>
    </div>
  </LayoutContentSidebar>
  )
}
  
List.defaultProps = {
}

List.propTypes = {
  getDatasetList: PropTypes.func,
}

export default lifecycle(method)(List)