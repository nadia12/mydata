import { connect } from 'react-redux'
import AssetDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'

const mapStateToProps = state => ({
  selected: state.volantisMyData._mydataList.selected,
  appLists: state.volantisMyData._mydataList.appLists,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: () => dispatch(setToggleModalClose('assetDetail')),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetDetailModal)
