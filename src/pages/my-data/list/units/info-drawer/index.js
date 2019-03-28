import React from 'react'
import { connect } from 'react-redux'
import InfoDrawer from './units'
import {
  setToggleModal
} from '../../reducer'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
})

const mapDispatchToProps = dispatch => ({
  handleToggleModal: (modalType) => {
    dispatch(setToggleModal(modalType))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoDrawer)
