import { connect } from 'react-redux'
import AssetDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
  appLists: state._mydataList.appLists,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: () => dispatch(setToggleModalClose('assetDetail')),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailModal)
