import React from 'react'
import { connect } from 'react-redux'
import { setValues } from 'Pages/my-data/list/reducer'
import Tr from './units'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  ellipsisText: name => {
    const maxLength = 20
    const indexMax = (maxLength - 1)
    let checkedName = name

    if (checkedName.length > maxLength * 2) {
      checkedName = `${checkedName.substring(0, indexMax * 2 - 5)}...`
    }

    return checkedName
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Tr)
