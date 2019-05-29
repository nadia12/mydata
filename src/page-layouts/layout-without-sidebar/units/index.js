import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyles, Helper } from 'Asset/css/main.js'
import { MainContent } from './style'

const LayoutWithoutSidebar = props => (
  <>
    {/* ==== Styling=== */}
    <GlobalStyles />
    <Helper />
    {/* ==== Styling=== */}

    <MainContent>
      <MainContent.Body>
        {props.children}
      </MainContent.Body>
    </MainContent>
  </>
)

LayoutWithoutSidebar.defaultProps = {
  children: null,
}

LayoutWithoutSidebar.propTypes = {
  children: PropTypes.any,
}

export default LayoutWithoutSidebar
