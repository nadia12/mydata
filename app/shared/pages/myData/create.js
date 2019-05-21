import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MyDataCreate } from 'volantis-mydata'

const MyDataCreateApp = props => {
  const createProps = {
    linkTo: pathname => {
      props.history.push(pathname)
    },
  }

  return (
    <MyDataCreate {...createProps} />
  )
}

MyDataCreateApp.propTypes = {
  history: PropTypes.object,
}

MyDataCreateApp.defaultProps = {
  history: [],
}

export default connect()(MyDataCreateApp)
