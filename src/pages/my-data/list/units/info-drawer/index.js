import { connect } from 'react-redux'
import {
  setToggleModal,
} from 'Pages/my-data/list/reducer'
import InfoDrawer from './units'
import {
  getInfoAccuracy,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  selected: _mydataList.selected,
  asset: _mydataList.selected.asset,
})

const mapDispatchToProps = dispatch => ({
  handleToggleModal: modalType => {
    dispatch(setToggleModal(modalType))
  },
  getInfoAccuracy: assetId => dispatch(getInfoAccuracy(assetId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoDrawer)
