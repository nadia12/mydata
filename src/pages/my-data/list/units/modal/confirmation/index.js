import { connect } from 'react-redux'
import ConfirmationModal from './units'
import {
  setConfirmationModalClose,
} from '../../../reducer'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleCloseModal: () => dispatch(setConfirmationModalClose()),
  handleClickSecondary: () => dispatch(setConfirmationModalClose()),
  handleClickPrimary: () => dispatch(setConfirmationModalClose()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
