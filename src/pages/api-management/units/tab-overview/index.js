/*
Location: api-management > units > tab-overview > index.js
*/

import { connect } from 'react-redux'

import TabOverview from './units'
import {
  getPreview,
  putApp,
  setInput,
  setToggle,
} from './function'

import {
  setShowModal
} from '../../function'

const mapStateToProps = state => ({
  rules: state._apiManagementOverview.rules,
  fields: state._apiManagementOverview.fields,
  fieldsError: state._apiManagementOverview.fieldsError,
  showModal: state._apiManagementOverview.showModal,
  isValid: state._apiManagementOverview.isValid,
  optFields: state._apiManagementOverview.optFields,
  detail: state._apiManagementOverview.detail
})

const mapDispatchToProps = dispatch => ({
  getPreview: (datasetId) => dispatch(getPreview({ datasetId })),
  putApp: () => dispatch(putApp()),
  handleChangeInput: ({ key, value, replacer = '', valueReplacer = '' }) => {
    if (key === 'callbackUrl') dispatch(setShowModal({ key }))
    dispatch(setInput({ key, value, replacer, valueReplacer }))
  },
  handleChangeToggle: (key) => dispatch(setToggle({ key: 'isEnabled' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabOverview)