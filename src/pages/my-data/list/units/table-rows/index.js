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
  entities: _mydataList.entities,
  show: _mydataList.show,
  SET_ICON,
  ENTITY_ICON,
  isEntitiesLoading: _mydataList.isEntitiesLoading,
})

const mapDispatchToProps = (dispatch, props) => ({
  getTableRowsParams: en => dispatch(getTableRowsParams(en, props.linkTo)),
  handleRightClick: (event, entity) => {
    dispatch(handleRightClick(event, entity))
    dispatch(setToggleModalOpen('menubarRight'))
  },
  handleSelectList: (event, entity) => dispatch(handleSelectList(event, entity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
