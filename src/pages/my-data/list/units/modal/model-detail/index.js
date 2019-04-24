import { connect } from 'react-redux'
import ModelDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'
import {
  refinedMetricPerformance,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList }, volantisConstant }) => ({
  selected: _mydataList.selected,
  functionDoc: _mydataList.functionDoc,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: () => dispatch(setToggleModalClose('modelDetail')),
  refinedMetricPerformance: () => dispatch(refinedMetricPerformance()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetailModal)
