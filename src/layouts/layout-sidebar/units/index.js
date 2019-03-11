import React from 'react'
import { GlobalStyles } from '../../../assets/css/main.js'
import Sidebar from '../../components/sidebar'

const LayoutSidebar = props => (
  <div>
    <GlobalStyles />
    <Sidebar />
  </div>
)

LayoutSidebar.defaultProps = {
  children: {},
}

LayoutSidebar.propTypes = {
  children: PropTypes.element
}

export default LayoutSidebar