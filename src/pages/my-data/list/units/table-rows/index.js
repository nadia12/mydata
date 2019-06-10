import { connect } from 'react-redux'

import {
  getTableRowActions,
} from './function'

import TableRows from './units'

import {
  SET_ICON,
  ENTITY_ICON,
} from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataList } }) => ({
  entities: _mydataList.entities,
  show: _mydataList.show,
  isEntitiesLoading: _mydataList.isEntitiesLoading,
  SET_ICON,
  ENTITY_ICON,
})

const mapDispatchToProps = (dispatch, props) => ({
  getTableRowActions: en => dispatch(getTableRowActions(en, props.linkTo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableRows)
