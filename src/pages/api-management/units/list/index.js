import { connect } from 'react-redux'

import List from './units'
import {
  getAppList, getFilteredAppList, getAppDetail, setSelectedApp
} from './function'

const mapStateToProps = state => ({
  list: state._apiManagementList
})

const mapDispatchToProps = dispatch => ({
  getAppList: (props = {}) => dispatch(getAppList(props)),
  getFilteredAppList: (search = '') => dispatch(getFilteredAppList({ search })),
  handleAppSelected: (id = '') => {
    dispatch(setSelectedApp({ id }))
    dispatch(getAppDetail({ id }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)