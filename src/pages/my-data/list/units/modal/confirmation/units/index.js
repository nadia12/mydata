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
    _mydataList,
    handleClickPrimary,
    handleClickSecondary,
    handleCloseModal,
  } = props

  const { modalData: { type, status }, errorMessage } = _mydataList
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status }
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = errorMessage

  return (
    <ModalConfirmation
      isShow
      Icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
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
