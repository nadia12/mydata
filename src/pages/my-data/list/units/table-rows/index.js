import { connect } from 'react-redux'
import {
  handleSelectList,
  handleRightClick,
} from '../../function'

import TableRows from './units'

import {
  getTableRowsParams,
} from './function'

import {
  setToggleModalOpen,
} from '../../reducer'

import {
  SET_ICON,
  ENTITY_ICON,
} from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  _mydataList,
  entities: _mydataList.entities,
  SET_ICON,
  ENTITY_ICON,
})

const mapDispatchToProps = dispatch => ({
  getTableRowsParams: en => dispatch(getTableRowsParams(en)),
  handleRightClick: (event, entity) => {
    dispatch(handleRightClick(event, entity))
    dispatch(setToggleModalOpen('menubarRight'))
  },
  handleSelectList: (event, entity) => dispatch(handleSelectList(event, entity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
