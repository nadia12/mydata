import React from 'react'
import { Breadcrumb, Input, Button } from 'volantis-ui'
import { SearchIcon, AddIcon } from 'volantis-icon'
import { GlobalStyles, Helper } from '../../../assets/css/main.js'
import Sidebar from '../../../components/sidebar'
import { MainContent } from './style'
import { Columns, Column } from '../../../assets/css/bulma'


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
  hasFooter: true,
}

LayoutWithoutSidebar.propTypes = {
  children: PropTypes.any,
  hasFooter: PropTypes,
}

export default LayoutWithoutSidebar