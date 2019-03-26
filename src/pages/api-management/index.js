import { connect } from 'react-redux'

import ApiManagement from './units'
import { getDatasetList, setAuthCookie, setShowModal } from './function'

const mapStateToProps = state => ({
  fields: state._apiManagementOverview.fields,
  showModal: state._apiManagementGlobal.showModal
})

const mapDispatchToProps = dispatch => ({
  getDatasetList: () => dispatch(getDatasetList()),
  setAuthCookie: (props) => dispatch(setAuthCookie(props)),
  handleToggleModal: ({ key }) => dispatch(setShowModal({ key }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiManagement)