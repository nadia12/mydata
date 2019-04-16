import React from 'react'
import { connect } from 'react-redux'
import ApiEndpoint from './units'

const mapStateToProps = state => ({
  selected: state._mydataList.selected,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ApiEndpoint)
