import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Title, Button } from 'volantis-ui'
import Accuracy from './accuracy'
import Detail from './detail'
import ApiToken from './api-token'
import ApiEndpoint from './api-endpoint'
import { ModalStyle } from './style'

const ModelDetailModal = props => {

  return (
    <Modal isShow noPadding>
      <ModalStyle>
        <ModalStyle.Title>
          <Title size="big">Asset Details</Title>
        </ModalStyle.Title>

        <ModalStyle.Content>
          <Accuracy />
          <Detail />
          <ApiToken />
          <ApiEndpoint />
        </ModalStyle.Content>

        <ModalStyle.Footer>
          <Button
            label="Close"
            onClose={() => props.setToggleModalClose()}
          />
        </ModalStyle.Footer>
        
      </ModalStyle>
    </Modal>
  )
}

ModelDetailModal.propTypes = {
  setToggleModalClose: PropTypes.func.isRequired,
}

ModelDetailModal.defaultProps = {
}

export default ModelDetailModal
