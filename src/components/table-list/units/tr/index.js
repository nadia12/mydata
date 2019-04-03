import React from 'react'
import { connect } from 'react-redux'
import Tr from './units'

const mapStateToProps = state => ({
  _mydataList: state._mydataList
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Tr)
