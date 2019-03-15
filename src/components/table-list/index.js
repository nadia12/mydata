import React from 'react'
import { connect } from 'react-redux'
import TableList from './units'
import { getDatasetList } from './function'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  getDatasetList: (props = {}) => dispatch(getDatasetList(props)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
