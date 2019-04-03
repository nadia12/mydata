import React from 'react'

import {
  ProgressIndicatorStyle,
} from 'GlobalComponent/progress-indicator/units/style'

const ProgressIndicator = (props) => {
  const {
    currentStep,
    progressIndicatorText,
  } = props
  return (
    <ProgressIndicatorStyle>
      {
        !!progressIndicatorText && progressIndicatorText.map((step, idx) => {
          if (!!step) return
          return (
            <li key={idx} className={idx === currentStep ? 'active' : ''}>{step}</li>
          )
        })
      }
    </ProgressIndicatorStyle>
  )
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number,
  progressIndicatorText: PropTypes.array,
}

ProgressIndicator.defaultProps = {
  currentStep: 0,
  progressIndicatorText: ['Choose database type', 'Configuration', 'Synchronization'],
}

export default ProgressIndicator
