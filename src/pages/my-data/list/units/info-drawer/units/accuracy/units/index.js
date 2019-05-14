import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Label,
  Title,
  Row, Column,
} from 'volantis-ui'
import { InfoIcon } from 'volantis-icon'

import Chart from 'Asset/images/chart'

import {
  ModelAccuracyStyled,
  ModelAccuracyHeaderStyled,
  ModelAccuracyContentStyled,
  ChartImgStyled,
  IndicatorStyled,
} from './style'

const Accuracy = props => {
  const {
    rotateNum,
    accuracyValue,
  } = props.metricPerformance

  return (
    <>
      <Row paddingBottom="25">
        <Column>
          <ModelAccuracyStyled>
            <ModelAccuracyHeaderStyled>
              <Subtitle size="big" type="secondary">MODEL ACCURACY</Subtitle>
              <InfoIcon height={24} width={24} />
            </ModelAccuracyHeaderStyled>
            <ModelAccuracyContentStyled>
              <ChartImgStyled>
                <Chart />
              </ChartImgStyled>
              <IndicatorStyled rotateNum={rotateNum > 180 ? 180 : rotateNum} />
              <Title size="normal" align="center">{`${accuracyValue} %`}</Title>
            </ModelAccuracyContentStyled>
          </ModelAccuracyStyled>
        </Column>
      </Row>
    </>
  )
}

Accuracy.propTypes = {
  metricPerformance: PropTypes.object.isRequired,
}

Accuracy.defaultProps = {
}

export default Accuracy
