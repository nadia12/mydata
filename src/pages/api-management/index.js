import { connect } from 'react-redux'

import ApiManagement from './units'
import { getDatasetList, setAuthCookie } from './function'

const mapStateToProps = state => ({
  fields: state._apiManagementOverview.fields
})

const mapDispatchToProps = dispatch => ({
  getDatasetList: () => dispatch(getDatasetList()),
  setAuthCookie: (props) => dispatch(setAuthCookie(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiManagement)