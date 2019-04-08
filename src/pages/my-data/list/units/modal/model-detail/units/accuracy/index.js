import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Label,
  Body,
  Title,
} from 'volantis-ui'
import { InfoIcon } from 'volantis-icon'
import ChartImg from 'Asset/images/chart'

import {
  ModelAccuracyStyled,
  ModelAccuracyHeaderStyled,
  ModelAccuracyContentStyled,
  LeftStyled,
  RightStyled,
  ChartImgStyled,
  IndicatorStyled,
} from './style'

import { Cols, HalfStyled } from '../../style'


const Accuracy = props => {
  const {
    assetName,
    dateCreated,
    metricPerformance,
    model,
  } = props
  let key;
  let value;
  let accuracyContent;
  let isPercentage;
  let tooltipExt;
  let renderAccuracy = true;
  let accuracyValue = 0;
  let rotateNum = 0;

  // if (!!metricPerformance) {
  //   key = Object.keys(metricPerformance)[0] || '';
  //   value = Object.values(metricPerformance)[0] || 0;
  //   accuracyContent = MODEL_ACCURACY[key];
  //   isPercentage = !!accuracyContent && accuracyContent.type === 'percentage';

  //   if(!!accuracyContent) {
  //     renderAccuracy = false;
  //     accuracyValue = ((100 * +value - accuracyContent.bottom_limit) / (accuracyContent.top_limit - accuracyContent.bottom_limit)).toFixed(2);
  //     rotateNum = Math.ceil(accuracyValue / 100 * 180);
  //     tooltipExt = (
  //       <span className="grey-color">
  //         {`Minimum Value: ${accuracyContent.bottom_limit}`}
  //         <br />
  //         {`Maximum Value: ${accuracyContent.top_limit}`}
  //       </span>
  //     );
  //   }
  // } else {
  //   renderAccuracy = false;
  // }

  // if (!renderAccuracy) {
  //   return (
  //     <div className="accuracy columns">
  //       <div className="left column pl0">
  //         <div>
  //           <Label value="MODEL NAME" />
  //           <p>
  //             model name
  //             {/* {model.name} */}
  //           </p>
  //         </div>
  //       </div>
  //       <div className="right column">
  //         <div>
  //           <Label value="DATE UPDATED" />
  //           <p>
  //             model updateat
  //             {/* {model.updatedAt} */}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <HalfStyled padding={0}>
        <LeftStyled>
          <ModelAccuracyStyled>
            <ModelAccuracyHeaderStyled>
              <Subtitle size="big" type="secondary">MODEL ACCURACY</Subtitle>
              <InfoIcon height={24} width={24} />
            </ModelAccuracyHeaderStyled>
            <ModelAccuracyContentStyled>
              <ChartImgStyled>
                <ChartImg />
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
            <Body type="white">{assetName}</Body>
          </Cols>
          <Cols padding={10}>
            <Label>DATE CREATED</Label>
          </Cols>
          <Cols padding={0}>
            <Body type="white">{dateCreated}</Body>
          </Cols>
        </RightStyled>
      </HalfStyled>
    </>
  )
}

Accuracy.propTypes = {
  assetName: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  metricPerformance: PropTypes.object,
  model: PropTypes.object,
}

export default Accuracy
