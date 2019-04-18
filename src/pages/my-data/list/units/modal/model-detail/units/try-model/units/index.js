import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Subtitle, Button, Snippet } from 'volantis-ui'
import { PlayCircleIcon } from 'volantis-icon'
// import ReactTooltip from 'volantis-tooltips'
// import SyntaxHighlighter from 'react-syntax-highlighter'

import {
  ModelSampleStyled,
  ModelSampleHeaderStyled,
  ModelSampleContentStyled,
  LeftStyled,
  RightStyled,
  ModelSampleTitleStyled,
  ModelSampleBoxStyled,
} from './style'

// import { getRequest, otherRequest } from 'Helpers/request';
// import { StyleBulma, StyleComponent } from 'PageComponents/css';

const getTryModelURL = '/manages/assets/ml-models/try-model'
const getSampleModelURL = '/manages/assets/ml-studios/sample-data'

const isValidJSON = input => {
  try {
    const jsonObject = JSON.parse(input)
    if (typeof jsonObject !== 'object' && !Array.isArray(jsonObject)) return { isJSON: false }

    return { isJSON: true, data: jsonObject }
  } catch (e) {
    return { isJSON: false }
  }
}

const TryModel = props => {
  const { webAPI, assetId } = props
  const { outputContent, setOutputContent } = useState({})
  const { isValid, setIsValid } = useState(false)
  const { inputContent, setInputContent } = useState(`"${webAPI}${getSampleModelURL}/${assetId}"`)
  const { tryLoading, setTryLoading } = useState(false)

  const isValidNotLoading = isValid && !tryLoading

  return (
    <ModelSampleStyled>
      <ModelSampleHeaderStyled>
        <Subtitle size="big" type="secondary">MODEL SAMPLE</Subtitle>
      </ModelSampleHeaderStyled>
      <ModelSampleContentStyled>
        <LeftStyled>
          <ModelSampleTitleStyled>
            <Subtitle size="normal" type="secondary">INPUT</Subtitle>
            <Button
              label="Run"
              theme="no-border"
              size="compact"
              icon={props => <PlayCircleIcon {...props} width="16" />}
            />
          </ModelSampleTitleStyled>
          <ModelSampleBoxStyled>
            <Snippet>https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg</Snippet>
          </ModelSampleBoxStyled>
        </LeftStyled>
        <RightStyled>
          <ModelSampleTitleStyled>
            <Subtitle size="normal" type="secondary">OUTPUT</Subtitle>
          </ModelSampleTitleStyled>
          <ModelSampleBoxStyled>
            <Snippet>
              {JSON.stringify(
                {
                  url: 'https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg',
                  confidence: 1,
                  animal: true,
                }
              )}
            </Snippet>
          </ModelSampleBoxStyled>
        </RightStyled>
      </ModelSampleContentStyled>
    </ModelSampleStyled>
  )
}

TryModel.propTypes = {
  webAPI: PropTypes.string.isRequired,
  assetId: PropTypes.string.isRequired,
}

export default TryModel
