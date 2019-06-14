import { connect } from 'react-redux'
import EditConfigurationSQL from './units'
import { handleChangeInput } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
import {
  postCheckSqlCredential,
  putConnectorConfiguration,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => {
  const {
    isValid: { editConfigurationSQL: isValid },
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
  handleCloseModal: () => dispatch(setToggleModalClose('editConfigurationSQL')),
  handleSave: param => dispatch(postCheckSqlCredential(param, (res, err) => {
    if (!err) dispatch(putConnectorConfiguration(param))
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditConfigurationSQL)
