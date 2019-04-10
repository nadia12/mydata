import React from 'react'
import PropTypes from 'prop-types'

import {
  ProgressBarStyled,
} from 'GlobalComponent/progress-bar/units/style'

const ProgressBar = props => {
  const {
    progress,
    max,
  } = props

  return (
    <ProgressBarStyled value={progress} max={max} />
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
  max: PropTypes.number,
}

ProgressBar.defaultProps = {
  progress: 0,
  max: 100,
}

export default ProgressBar
