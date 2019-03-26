import React from 'react'
import { connect } from 'react-redux'
import StepTwoFile from './units'

const mapStateToProps = state => ({
  files: state.files,
  tusPercentage: state.tusPercentage,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(StepTwoFile)
