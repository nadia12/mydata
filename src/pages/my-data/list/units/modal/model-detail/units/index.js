import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Title, Button } from 'volantis-ui'
import Accuracy from './accuracy'
import Detail from './detail'
import ApiToken from './api-token'
import ApiEndpoint from './api-endpoint'
import FunctionDoc from './function-doc'
import { ModalStyle } from './style'

const ModelDetailModal = props => {
  const {
    functionDoc,
    selected,
    refinedMetricPerformance,
    setToggleModalClose,
  } = props

  const { asset } = selected
  const mp = !!asset[0] && refinedMetricPerformance(asset[0].metricPerformance)

  return (
    <Modal isShow noPadding>
      <ModalStyle>
        <ModalStyle.Title>
          <Title>Asset details</Title>
        </ModalStyle.Title>

        <ModalStyle.Content>
          {!!mp && !!mp.renderAccuracy
            ? <Accuracy refinedMetricPerformance={mp} />
            : <Detail /> }
          <ApiToken />
          <ApiEndpoint />
          {!!functionDoc && <FunctionDoc />}
        </ModalStyle.Content>

        <ModalStyle.Footer>
          <Button
            label="Close"
            onClick={() => setToggleModalClose()}
          />
        </ModalStyle.Footer>
      </ModalStyle>
    </Modal>
  )
}

ModelDetailModal.propTypes = {
  setToggleModalClose: PropTypes.func.isRequired,
  refinedMetricPerformance: PropTypes.func,
  selected: PropTypes.object,
  functionDoc: PropTypes.object,
}

ModelDetailModal.defaultProps = {
  selected: {},
  refinedMetricPerformance: () => {},
  functionDoc: {},
}

export default ModelDetailModal
