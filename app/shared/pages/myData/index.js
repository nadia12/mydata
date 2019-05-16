import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MyDataList } from 'volantis-mydata'
import Container from '../../components/container/styled'
import LeftSidebar from '../../components/left-sidebar'

const MyDataListApp = props => {
  const listProps = {
    linkTo: pathname => {
      props.history.push(pathname)
    },
    lastChangeLocation: ((props.location || {}).state || {}).lastChangeLocation,
  }

  return (
    <Container>
      <LeftSidebar {...props} />
      <MyDataList {...listProps} />
    </Container>
  )
}

MyDataListApp.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect()(MyDataListApp)

