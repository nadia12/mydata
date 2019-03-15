import React from 'react'
import { connect } from 'react-redux'
import TableList from './units'
import { getEntityList } from './function'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  getEntityList: () => dispatch(getEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
