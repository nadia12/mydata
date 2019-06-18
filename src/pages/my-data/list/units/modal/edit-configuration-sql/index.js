import { connect } from 'react-redux'
import EditConfigurationSQL from './units'
import { handleChangeInput, putConnectorConfiguration } from '../../../function'
import { setToggleModalClose } from '../../../reducer'
import {
  postCheckSqlCredentialConnector,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => {
  const {
    show: { errorToast },
    isValid: { editConfigurationSQL: isValid },
    rules,
    handleCloseModal,
    handleChangeInput,
    handleAdd,
    linkTo,
    fields,
    errorMessage,
  } = _mydataList

  return {
    isValid,
    rules,
    handleCloseModal,
    handleChangeInput,
    handleAdd,
    linkTo,
    fields,
    errorToast,
    errorMessage,
  }
}

const mapDispatchToProps = dispatch => ({
  handleChangeInput: params => dispatch(handleChangeInput(params)),
  handleCloseModal: param => dispatch(setToggleModalClose(param)),
  handleSave: param => dispatch(postCheckSqlCredentialConnector(param, (res, err) => {
    if (!err) {
      dispatch(putConnectorConfiguration(param, (res, err) => {
        if (!err) {
          dispatch(setToggleModalClose('editConfigurationSQL'))
        } else {
          dispatch(setToggleModalClose('errorToast'))
        }
      }))
    }
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditConfigurationSQL)

