import React from 'react'
import PropTypes from 'prop-types'

import Menu from 'GlobalComponent/menu'
import { MENU_LIST } from '../constant'

const MenuBar = props => (
  // <div style={{ position: 'absolute' }} onMouseLeave={props.onMouseLeave} id="mouse-leave">
  <div style={{ position: 'absolute' }}>
    <Menu
      handleChangeMenu={props.handleChangeMenu}
      menus={MENU_LIST}
      menuType={props.menuType}
      handleSetUploadFile={props.handleSetUploadFile}
    />
  </div>
)

MenuBar.propTypes = {
  // onMouseLeave: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func.isRequired,
  menuType: PropTypes.string,
  handleSetUploadFile: PropTypes.func.isRequired,
}

MenuBar.defaultProps = {
  menuType: 'default',
}

export default MenuBar
