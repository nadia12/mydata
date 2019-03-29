import React from 'react'
import { connect } from 'react-redux'
import TableRows from './units'
import {   
  setNtype,
  getSizeAndStatus,
  getTableRowsParams,
} from './helper'

import{
  handleSelectList,
  handleRightClick,
} from '../../function'

import{
  setToggleModal
} from '../../reducer'

import{
  SYSTEM_FOLDERS,
  THEAD,
  ICON
} from './constant'


const mapStateToProps = state => ({
  _mydataList: state._mydataList,
  entities: state._mydataList.entities,
  SYSTEM_FOLDERS,
  THEAD: THEAD,
  ICON,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setNtype,
  getSizeAndStatus,
  getTableRowsParams,
  handleRightClick: (event, entity) => {
    dispatch(handleRightClick(event, entity))
    dispatch(setToggleModal('menubarRight')) //open
  },
  handleSelectList: (event, entity) => {
    dispatch(handleSelectList(event, entity))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
