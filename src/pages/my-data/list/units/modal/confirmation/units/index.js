import React from 'react'
import PropTypes from 'prop-types'
import { ModalConfirmation } from 'volantis-ui'
import {
  InfoIcon,
} from 'volantis-icon'
import { CONFIRMATION_CONTENT } from '../constant'

const ConfirmationModal = props => {
  const {
    _mydataList,
    handleClickPrimary,
    handleClickSecondary,
    handleCloseModal,
  } = props

  console.log('handleCloseModal ===> ', handleCloseModal)
  const { modalData: { type, status }, errorMessage } = _mydataList
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status }
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = errorMessage

  return (
    <ModalConfirmation
      isShow
      onClose={() => handleCloseModal()}
      Icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
      {...confirmationModalProps}
      onClickPrimary={() => handleClickPrimary(type)}
      onClickSecondary={() => handleClickSecondary()}
      reverseBtn
      noBorderSecondaryBtn
    />
  )
}

ConfirmationModal.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  handleClickPrimary: PropTypes.func,
  handleClickSecondary: PropTypes.func,
  handleCloseModal: PropTypes.func,
}

ConfirmationModal.defaultProps = {
  handleClickPrimary: () => {},
  handleClickSecondary: () => {},
  handleCloseModal: () => {},
}

export default ConfirmationModal
