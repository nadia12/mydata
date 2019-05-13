import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Label,
  Body,
  Title,
} from 'volantis-ui'
import { InfoIcon } from 'volantis-icon'
import Chart from 'Asset/images/chart'

import {
  ModelAccuracyStyled,
  ModelAccuracyHeaderStyled,
  ModelAccuracyContentStyled,
  LeftStyled,
  RightStyled,
  ChartImgStyled,
  IndicatorStyled,
} from './style'

import {
  Cols,
  HalfStyled,
} from '../../../style'

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
      <HalfStyled paddingBottom="25">
        <LeftStyled>
          <ModelAccuracyStyled>
            <ModelAccuracyHeaderStyled>
              <Subtitle size="big" colorType="secondary">MODEL ACCURACY</Subtitle>
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
        </LeftStyled>
        <RightStyled>
          <Cols padding={10}>
            <Label>MODEL NAME</Label>
          </Cols>
          <Cols padding={27}>
            <Body colorType="white">{name}</Body>
          </Cols>
          <Cols padding={10}>
            <Label>DATE CREATED</Label>
          </Cols>
          <Cols padding={0}>
            <Body colorType="white">{createdAt}</Body>
          </Cols>
        </RightStyled>
      </HalfStyled>
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
