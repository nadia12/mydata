import { connect } from 'react-redux'
import NewFolderModal from './units'
import { handleChangeInput } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
import { handleAddNewFolder } from './function'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
})

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: () => dispatch(setToggleModalClose('newFolder')),
  handleAdd: () => dispatch(handleAddNewFolder()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewFolderModal)
