import { connect } from 'react-redux'
import { handleActionTrash } from 'MyData/list/units/table-rows/right-click-helper/rc-handlers'
import { setConfirmationModalClose, setToggleModalClose } from 'MyData/list/reducer'
import ConfirmationModal from './units'
import { setSync, setCancelUpload } from './function'

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
      permanentDelete: () => {
        dispatch(handleActionTrash('delete'))

        return dispatch(setConfirmationModalClose())
      },
      cancelUpload: () => {
        dispatch(setCancelUpload())
        dispatch(setConfirmationModalClose())
        dispatch(setToggleModalClose('snackbarUpload'))
      },
      default: () => {},
    }

    return actions[key]() || actions.default()
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
