import React from 'react';
import PropTypes from 'prop-types';
import { ModalConfirmation } from 'volantis-ui';

const ConfirmationModal = props => {
  const _mydataList = props._mydataList
  const { type, status } = _mydataList.modalData;
  const confirmationModalProps = { ...CONFIRMATION_CONTENT[type], status };
  if (type === 'failedToMoveDirectory') confirmationModalProps.subtitle = _mydataList.errorMsg;

  return (
    <ModalConfirmation 
      isShow
      onClose={() => handleCloseModal('confirmationModal')} 
      Icon={() => <InfoIcon width="64" height="64" color="#ffd77b" />}
      {...confirmationModalProps}
      onClickPrimary={() => handleCloseModal('confirmationModal')} 
      onClickSecondary={() => handleCloseModal('confirmationModal')}
      reverseBtn
      noBorderSecondaryBtn
    />
  );
}

ConfirmationModal.propTypes = {
  _mydataList: PropTypes.object.isRequired,
}

ConfirmationModal.defaultProps = {
}

export default ConfirmationModal
