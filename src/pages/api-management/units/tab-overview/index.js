import { connect } from 'react-redux'

import TabOverview from './units'
import { getPreview, putApp } from './function'

const mapStateToProps = state => ({
  overview: state._apiManagementOverview,
  detail: state._apiManagementList.detail
})

const mapDispatchToProps = dispatch => ({
  getPreview: (datasetId) => dispatch(getPreview({ datasetId })),
  putApp: (props) => dispatch(putApp(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabOverview)