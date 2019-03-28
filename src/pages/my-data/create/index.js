import { connect } from 'react-redux'
import Create from '../../../page-layouts/layout-create/units'
import { getText, getLoadingData } from './function'

const mapStateToProps = state => ({
  title: "halo",
  type: "sql",
  hideStep: false,
  maxStep: 4,
  allowNext: true,
  step: 0,
  isBack: false
})

const mapDispatchToProps = dispatch => ({
  getText,
  getLoadingData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
