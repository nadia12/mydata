import { connect } from 'react-redux'
import EditConfigurationFile from './units'
import { handleChangeInput, putConnectorConfiguration } from '../../../function'
import { setToggleModalClose } from '../../../reducer'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => {
  const {
    isValid: { editConfigurationFile: isValid },
    rules,
    handleCloseModal,
    handleChangeInput,
    handleAdd,
    linkTo,
    fields,
  } = _mydataList

  return {
    isValid,
    rules,
    handleCloseModal,
    handleChangeInput,
    handleAdd,
    linkTo,
    fields,
  }
}

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: () => dispatch(setToggleModalClose('editConfigurationFile')),
  handleSave: param => dispatch(putConnectorConfiguration(param, (res, err) => {
    if (!err) {
      dispatch(setToggleModalClose('editConfigurationFile'))
    }
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditConfigurationFile)

