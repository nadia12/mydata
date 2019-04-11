import React from 'react'
import PropTypes from 'prop-types'
import { ModalConfirmation } from 'volantis-ui'
import { CONFIRMATION_CONTENT } from '../constant'

const ConfirmationModal = props => {
  const { type, status, errorMessage } = props._mydataList
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status }
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = errorMessage

  return (
    <ModalConfirmation
      isShow
      onClose={() => props.handleCloseModal('confirmationModal')}
      // Icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
      {...confirmationModalProps}
      onClickPrimary={() => props.handleCloseModal('confirmationModal')}
      onClickSecondary={() => props.handleCloseModal('confirmationModal')}
      reverseBtn
      noBorderSecondaryBtn
    />
  )
}

ConfirmationModal.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  handleCloseModal: PropTypes.func,
}

ConfirmationModal.defaultProps = {
  handleCloseModal: () => {},
}

export default ConfirmationModal
