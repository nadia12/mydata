import React from 'react'
import { connect } from 'react-redux'
import { PipelineApp } from 'volantis-pipeline'
import PropTypes from 'prop-types'

const Pipeline = props => <PipelineApp linkTo={props.history.push} />

Pipeline.propTypes = {
  history: PropTypes.object,
}

Pipeline.defaultProps = {
  history: {},
}

export default connect()(Pipeline)
