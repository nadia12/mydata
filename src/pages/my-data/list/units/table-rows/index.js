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
  handleRightClick: (event, entity, _mydataList) => {
    dispatch(handleRightClick(event, entity, _mydataList))
    dispatch(setToggleModal('menubarRight')) //open
  },
  handleSelectList: (event, entity, _mydataList) => {
    dispatch(handleSelectList(event, entity, _mydataList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
