import { connect } from 'react-redux'
import { handleActionTrash } from 'MyData/list/units/table-rows/right-click-helper/rc-handlers'
import ConfirmationModal from './units'
import { setConfirmationModalClose } from '../../../reducer'
import {
  setSync,
} from '../../../function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  _mydataList,
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
    if (key === 'failedMoveToTrash') {
      return dispatch(setConfirmationModalClose())
    }
    if (key === 'failedRestoreTrash') {
      dispatch(handleActionTrash('restore', true))

      return dispatch(setConfirmationModalClose())
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
