import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Label,
  Body,
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
  } = props.refinedMetricPerformance

  const {
    name,
    createdAt,
  } = props.selected.asset[0]

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
              <IndicatorStyled rotateNum={rotateNum > 180 ? 180 : rotateNum}>
                <div />
              </IndicatorStyled>
              <Title size="normal" align="center">{`${accuracyValue} %`}</Title>
            </ModelAccuracyContentStyled>
          </ModelAccuracyStyled>
        </Column>
        <Column>
          <Column padding={10}>
            <Label>MODEL NAME</Label>
          </Column>
          <Column padding={27}>
            <Body type="white">{name}</Body>
          </Column>
          <Column padding={10}>
            <Label>DATE CREATED</Label>
          </Column>
          <Column padding={0}>
            <Body type="white">{createdAt}</Body>
          </Column>
        </Column>
      </Row>
    </>
  )
}

Accuracy.propTypes = {
  selected: PropTypes.object,
  refinedMetricPerformance: PropTypes.object.isRequired,
}

Accuracy.defaultProps = {
  selected: {},
}

export default Accuracy
