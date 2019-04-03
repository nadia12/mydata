import React from 'react'
import { connect } from 'react-redux'
import ConfirmationModal from './units'
import { setToggleModalClose } from '../../../reducer';

const mapStateToProps = state => ({
  _mydataList: state._mydataList
})

const mapDispatchToProps = dispatch => ({
  handleCloseModal: () => dispatch(setToggleModalClose)
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)
