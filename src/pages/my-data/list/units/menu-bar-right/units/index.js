import React from 'react';
import PropTypes from 'prop-types';
import MenuSub from './menu-sub';

const MenuBarRight = props => {
  return (
    <MenuSub handleChangeMenu={props.handleChangeMenu} menus={props.menuList} />
  )
}

MenuBarRight.propTypes = {
  handleChangeMenu: PropTypes.func.isRequired,
  menuList: PropTypes.array.isRequired
}

MenuBarRight.defaultProps = {
}

export default MenuBarRight
