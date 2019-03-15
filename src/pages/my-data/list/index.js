import React from 'react'
import { connect } from 'react-redux'
import MyData from './units'

import {
  staticFolders
} from './constant'

import {
  setModalShow,
} from './reducer'

const mapStateToProps = state => ({
  _mydata: state._mydataList,
  staticFolders: staticFolders
})

const mapDispatchToProps = dispatch => ({
  handleAddNewData() {
    dispatch(setModalShow('menubar', true))
  },
  renderMouseLeave() {
    dispatch(setModalShow('menubar', false))
    document.getElementById('mouse-leave').style.display = 'none'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MyData)
