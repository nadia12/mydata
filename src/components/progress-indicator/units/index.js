import {
  ProgressIndicatorStyle,
} from './style'
import React from 'react'

// const CREATE_TYPE = {
//   sql: 'sql',
//   device: 'device',
//   file: 'file',
//   user: 'user',
// }

// const STEPS = {
//   sql: ['Choose database type', 'Configuration', 'Synchronization'],
//   device: ['Choose device type', 'Choose Device Detail', 'Get Token'],
//   // device: ['Choose device type', 'Choose Device Detail', 'Get Token', 'Synchronization'],
//   file: ['Choose File', 'Upload File']
//   // file: ['Choose File', 'Upload File', 'Data Type Mapping', 'Synchronization']
// };

const ProgressIndicator = (props) => {
  const { currentStep, progressIndicatorText, } = props
  return (
    <ProgressIndicatorStyle>
      {
        !!progressIndicatorText && progressIndicatorText.length > 0 && progressIndicatorText.map((step, idx) => (
          <li key={idx} className={idx === currentStep ? 'active' : ''}>{step}</li>
        ))
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