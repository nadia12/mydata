import { connect } from 'react-redux'
import {
  ENTITY_TYPE_LABEL,
} from 'Config/constants'

import TableRows from './units'

import {
  getTableRowsParams,
} from './function'

import {
  handleSelectList,
  handleRightClick,
} from '../../function'

import {
  setToggleModalOpen,
} from '../../reducer'

import {
  SET_ICON,
  ENTITY_ICON,
} from './constant'

const mapStateToProps = state => ({
  _mydataList: state._mydataList,
  entities: state._mydataList.entities,
  SET_ICON,
  ENTITY_ICON,
  ENTITY_TYPE_LABEL,
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
