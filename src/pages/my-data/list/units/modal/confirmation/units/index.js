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
  } = props

  const { type, status } = _mydataList.modalData
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status }
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = _mydataList.errorMsg

  return (
    <ModalConfirmation
      isShow
      Icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
      {...confirmationModalProps}
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
}

ConfirmationModal.defaultProps = {
  handleClickPrimary: () => {},
  handleClickSecondary: () => {},
}

export default ConfirmationModal
