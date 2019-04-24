import { connect } from 'react-redux'
import NewFolderModal from './units'
import { handleChangeInput } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
import { handleAddNewFolder } from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  _mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: () => dispatch(setToggleModalClose('newFolder')),
  handleAdd: () => dispatch(handleAddNewFolder()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewFolderModal)
