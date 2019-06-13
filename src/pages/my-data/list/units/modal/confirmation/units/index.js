import React from 'react'
import PropTypes from 'prop-types'
import { ModalConfirmation } from 'volantis-ui'
import {
  InfoIcon,
} from 'volantis-icon'

import {
  CONFIRMATION_CONTENT,
} from 'Pages/my-data/list/constant'

const ConfirmationModal = props => {
  const {
    modalData,
    errorMessage,
    handleClickPrimary,
    handleClickSecondary,
    handleCloseModal,
  } = props

  const { type, status } = modalData
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status }
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = errorMessage

  return (
    <ModalConfirmation
      isShow
      icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
      {...confirmationModalProps}
      onClose={() => handleCloseModal()}
      onClickPrimary={() => handleClickPrimary(type)}
      onClickSecondary={() => handleClickSecondary(type)}
      reverseBtn
      noBorderSecondaryBtn
    />
  )
}

ConfirmationModal.propTypes = {
  modalData: PropTypes.object.isRequired,
  errorMessage: PropTypes.object.isRequired,
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
