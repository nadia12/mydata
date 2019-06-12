import { connect } from 'react-redux'
import { handleActionTrash } from 'MyData/list/units/table-rows/right-click-helper/rc-handlers'
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
      sync: () => dispatch(setSync()),
      addToPipelineEmpty: () => dispatch(setConfirmationModalClose()),
      failedMoveToTrash: () => dispatch(setConfirmationModalClose()),
      failedRestoreTrash: () => {
        dispatch(handleActionTrash('restore', true))

        return dispatch(setConfirmationModalClose())
      },
      default: () => {},
    }

    return actions[key]() || actions.default()
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
