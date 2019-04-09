import React from 'react'
import { connect } from 'react-redux'
import FunctionDoc from './units'

const mapStateToProps = state => ({
  functionDoc: state._mydataList.functionDoc,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(FunctionDoc)
