import { connect } from 'react-redux'
import {
  handleSelectList,
} from 'MyData/list/function'

import {
  setToggleModalOpen,
} from 'MyData/list/reducer'

import {
  handleRightClick,
  getTableRowsParams,
} from './function'

import TableRows from './units'

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
