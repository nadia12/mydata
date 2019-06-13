import { connect } from 'react-redux'
import EditConfigurationSQL from './units'
import { handleChangeInput } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
// import { handleEditInput } from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  _mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: () => dispatch(setToggleModalClose('editConfigurationSQL')),
//   handleAdd: linkTo => dispatch(handleAddNewFolder(linkTo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditConfigurationSQL)
