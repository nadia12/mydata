import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MyDataPreview } from 'volantis-mydata'
import Container from '../../components/container/styled'
import LeftSidebar from '../../components/sidebar'

const MyDataPreviewApp = props => {
  const previewProps = {
    linkTo: pathname => {
      props.history.push(pathname)
    },
    lastChangeLocation: ((props.location || {}).state || {}).lastChangeLocation,
  }

  return (
    <Container>
      <LeftSidebar {...props} />
      <MyDataPreview {...previewProps} />
    </Container>
  )
}

MyDataPreviewApp.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object.isRequired,
}

MyDataPreviewApp.defaultProps = {
  history: [],
}

export default connect()(MyDataPreviewApp)
