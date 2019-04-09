import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Title, Button } from 'volantis-ui'
import Accuracy from './accuracy'
import Detail from './detail'
import ApiToken from './api-token'
import ApiEndpoint from './api-endpoint'
import { ModalStyle } from './style'
// import { refinedMetricPerformance } from './function'

const ModelDetailModal = props => {
  const { asset } = props.selected
  const refinedMetricPerformance = !!asset[0] && props.refinedMetricPerformance(asset[0].metricPerformance)

  return (
    <Modal isShow noPadding>
      <ModalStyle>
        <ModalStyle.Title>
          <Title size="big">Asset Details</Title>
        </ModalStyle.Title>

        <ModalStyle.Content>
          {!!refinedMetricPerformance && !!refinedMetricPerformance.renderAccuracy
            ? <Accuracy refinedMetricPerformance={refinedMetricPerformance} />
            : <Detail /> }
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
  refinedMetricPerformance: PropTypes.func,
  selected: PropTypes.object,
}

ModelDetailModal.defaultProps = {
  selected: {},
  refinedMetricPerformance: () => {},
}

export default ModelDetailModal
