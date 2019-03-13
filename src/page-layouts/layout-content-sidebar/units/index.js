import React from 'react'
import { GlobalStyles } from '../../../assets/css/main.js'
import Sidebar from '../../../components/sidebar'
// import { Breadcrumb } from 'volantis-ui'
import {BulmaStyledTheme, Hero, Navbar, Container, Title, Subtitle, Button, Icon, Tabs} from '../../../assets/css/bulma'
// import BulmaStyledTheme from 'bulma-styled-components'

const LayoutContentSidebar = props => (
  <>
    <GlobalStyles />
    <Sidebar />

    <BulmaStyledTheme>
      <Hero className="is-primary is-large is-bold">
          {props.children}
      </Hero>
    </BulmaStyledTheme>
  </>
)

LayoutContentSidebar.defaultProps = {
  children: {},
}

LayoutContentSidebar.propTypes = {
  children: PropTypes.element
}

export default LayoutContentSidebar