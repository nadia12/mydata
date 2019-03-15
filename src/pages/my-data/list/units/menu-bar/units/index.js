import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../../../../../../components/menu';
import { MENU_LIST } from '../constant'

const MenuBar = props => {
  return (
    <div style={{ position: 'absolute' }} onMouseLeave={props.onMouseLeave} id="mouse-leave">
      <Menu handleChangeMenu={props.handleChangeMenu} menus={MENU_LIST} />
    </div>
  )
}

MenuBar.propTypes = {
  
}

MenuBar.propTypes = {
  onMouseLeave: PropTypes.func.isRequired,
  handleChangeMenu: PropTypes.func.isRequired
}

MenuBar.defaultProps = {
}

export default MenuBar
