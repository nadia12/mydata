import { connect } from 'react-redux'
import TableRows from './units'
import {
  setNtype,
  getSizeAndStatus,
  getTableRowsParams,
} from './helper'

import {
  handleSelectList,
  handleRightClick,
} from '../../function'

import {
  setToggleModalOpen,
} from '../../reducer'

import {
  SYSTEM_FOLDERS,
  THEAD,
  SET_ICON,
  ENTITY_ICON,
} from './constant'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
  entities: state._mydataList.entities,
  THEAD,
  SET_ICON,
  ENTITY_ICON,
})

const mapDispatchToProps = dispatch => ({
  setNtype,
  getSizeAndStatus,
  SYSTEM_FOLDERS: () => dispatch(SYSTEM_FOLDERS()),
  getTableRowsParams: (en, _mydataList) => dispatch(getTableRowsParams(en, _mydataList)),
  handleRightClick: (event, entity) => {
    dispatch(handleRightClick(event, entity))
    dispatch(setToggleModalOpen('menubarRight')) // open
  },
  handleSelectList: (event, entity) => {
    dispatch(handleSelectList(event, entity))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
