import { connect } from 'react-redux'

import List from './units'
import {
  getAppList, getFilteredAppList, setSelectedApp, setSearch
} from './function'

import {
  getAppDetail
} from '../tab-overview/function'

const mapStateToProps = state => ({
  apps: state._apiManagementList.apps,
  search: state._apiManagementList.search
})

const mapDispatchToProps = dispatch => ({
  getAppList: (props = {}) => dispatch(getAppList(props)),
  getFilteredAppList: (search = '') => dispatch(getFilteredAppList({ search })),
  handleAppSelected: (id = '') => {
    dispatch(setSelectedApp({ id }))
    dispatch(getAppDetail({ id }))
  },
  setSearch: (search = '') => dispatch(setSearch({ search }))
})

export default connect(mapStateToProps, mapDispatchToProps)(List)