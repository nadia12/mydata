import React from 'react'
import { connect } from 'react-redux'
import ModelDetailModal from './units'
import { setToggleModalClose } from '../../../reducer'
import { refinedMetricPerformance } from './function'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
})

const mapDispatchToProps = dispatch => ({
  setToggleModalClose: dispatch(setToggleModalClose('assetDetail')),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetailModal)
