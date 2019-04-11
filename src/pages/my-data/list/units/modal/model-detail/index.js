import { connect } from 'react-redux'
import ModelDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'
import {
  refinedMetricPerformance,
} from './function'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
  functionDoc: state._mydataList.functionDoc,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: () => dispatch(setToggleModalClose('modelDetail')),
  refinedMetricPerformance: () => dispatch(refinedMetricPerformance()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetailModal)
