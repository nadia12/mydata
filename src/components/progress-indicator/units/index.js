import { ProgressIndicatorStyle } from './style'
import React from 'react'

const CREATE_TYPE = {
  sql: 'sql',
  device: 'device',
  file: 'file',
  user: 'user',
}

const STEPS = {
  sql: ['Choose database type', 'Configuration', 'Synchronization'],
  device: ['Choose device type', 'Choose Device Detail', 'Get Token'],
  // device: ['Choose device type', 'Choose Device Detail', 'Get Token', 'Synchronization'],
  file: ['Choose File', 'Upload File']
  // file: ['Choose File', 'Upload File', 'Data Type Mapping', 'Synchronization']
};

const ProgressIndicator = (props) => {
  const { currentStep, type } = props
  return (
    <ProgressIndicatorStyle>
      {
        STEPS[type] && STEPS[type].map((step, idx) => (
          <li key={idx} className={idx === currentStep ? 'active' : ''}>{step}</li>
        ))
      }
    </ProgressIndicatorStyle>
  )
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number,
  type: CREATE_TYPE.sql,
}

export default ProgressIndicator
