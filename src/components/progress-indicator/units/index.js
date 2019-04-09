import React from 'react'
import PropTypes from 'prop-types'

import {
  ProgressIndicatorStyle
} from 'GlobalComponent/progress-indicator/units/style'

const ProgressIndicator = props => {
  const {
    currentStep,
    progressIndicatorText
  } = props

  return (
    <ProgressIndicatorStyle>
      {
        !!progressIndicatorText && progressIndicatorText.map((step, idx) => (
          <li key={idx} className={idx === currentStep ? 'active' : ''}>{step}</li>
        ))
      }
    </ProgressIndicatorStyle>
  )
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number,
  progressIndicatorText: PropTypes.array
}

ProgressIndicator.defaultProps = {
  currentStep: 0,
  progressIndicatorText: []
}

export default ProgressIndicator
