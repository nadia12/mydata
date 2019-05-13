import { connect } from 'react-redux'
import {
  setToggleModalClose,
  setValue,
} from 'Pages/my-data/list/reducer'
import InfoDrawer from './units'
import {
  getInfoAccuracy,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  selected: _mydataList.selected,
  asset: _mydataList.selected.asset,
  assetDetail: _mydataList.assetDetail,
})

const mapDispatchToProps = dispatch => ({
  handleToggleModal: () => {
    dispatch(setToggleModalClose('infoDrawer'))
    dispatch(setValue('assetDetail', { show: false, mp: {} }))
  },
  getInfoAccuracy: assetId => dispatch(getInfoAccuracy(assetId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoDrawer)
