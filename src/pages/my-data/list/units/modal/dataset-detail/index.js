import { connect } from 'react-redux'
import DatasetDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: () => dispatch(setToggleModalClose('assetDetail')),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailModal)
