import { connect } from 'react-redux'
import NewSensorGroupModal from './units'
import { handleChangeInput } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
// import { handleAddNewFolder } from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList }, volantisConstant })=> ({
  _mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: () => dispatch(setToggleModalClose('sensor')),
  // handleAdd: () => dispatch(handleAddNewFolder),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewSensorGroupModal)
