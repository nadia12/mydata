import { connect } from 'react-redux'
import ConfirmationModal from './units'
import { setConfirmationModalClose } from '../../../reducer'
import {
  setSync,
} from '../../../function'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleCloseModal: () => dispatch(setConfirmationModalClose()),
  handleClickSecondary: () => dispatch(setConfirmationModalClose()),
  handleClickPrimary: key => {
    if (key === 'sync') {
      return dispatch(setSync())
    }
    if (key === 'addToPipelineEmpty') {
      return dispatch(setConfirmationModalClose())
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
