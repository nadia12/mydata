import React from 'react'
import {
  connect,
} from 'react-redux'

import StepTwoFile from 'Pages/my-data/create/units/file/units/step2/units'

const mapStateToProps = state => ({
  files: state.files,
  tusPercentage: state.tusPercentage,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(StepTwoFile)
