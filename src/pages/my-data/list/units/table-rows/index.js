import React from 'react'
import { connect } from 'react-redux'
import TableRows from './units'
import {   
  setNtype,
  getSizeAndStatus,
  getTableRowsParams,
  setIcon
} from './helper'
import{
  systemFolders
} from './constant'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
  entities: state._mydataList.entities,
  systemFolders: systemFolders,
})

const mapDispatchToProps = dispatch => ({
  setNtype,
  getSizeAndStatus,
  getTableRowsParams,
  setIcon,
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
