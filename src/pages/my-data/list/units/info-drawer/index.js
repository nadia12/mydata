import { connect } from 'react-redux'
import InfoDrawer from './units'
import {
  setToggleModal,
} from '../../reducer'

const mapStateToProps = ({ volantisMyData: { _mydataList }, volantisConstant }) => ({
  selected: _mydataList.selected,
})

const mapDispatchToProps = dispatch => ({
  handleToggleModal: modalType => {
    dispatch(setToggleModal(modalType))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoDrawer)
