import { connect } from 'react-redux'
import { setConfirmationModalClose } from 'MyData/list/reducer'
import ConfirmationModal from './units'
import { setSync } from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  modalData: _mydataList.modalData,
  errorMessage: _mydataList.errorMessage,
})

const mapDispatchToProps = dispatch => ({
  handleCloseModal: () => dispatch(setConfirmationModalClose()),
  handleClickSecondary: () => dispatch(setConfirmationModalClose()),
  handleClickPrimary: key => {
    const actions = {
      sync: setSync(),
      addToPipelineEmpty: setConfirmationModalClose(),
      moveToTrash: setConfirmationModalClose(),
      default: '',
    }

    return dispatch(actions[key]) || actions.default
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
