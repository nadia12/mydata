import { connect } from 'react-redux'

import ApiManagement from './units'
import { getDatasetList } from './function'

const mapStateToProps = state => ({
  detail: state._apiManagementList.detail
})

const mapDispatchToProps = dispatch => ({
  getDatasetList: (props = {}) => dispatch(getDatasetList(props)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiManagement)