import React from 'react'
import PropTypes from 'prop-types'

import {
  AnimatedStyle,
} from './style'

const PlaceholderLoader = props => <AnimatedStyle {...props} />

PlaceholderLoader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}

PlaceholderLoader.defaultProps = {
  width: '100%',
  height: '12px',
}

export default PlaceholderLoader
