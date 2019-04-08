import React from 'react'
import { connect } from 'react-redux'
import ModelDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: dispatch(setToggleModalClose('assetDetail'))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetailModal)
