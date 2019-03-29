import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'GlobalComponent/menu';

const MenuBarRight = props => {
  return (
    <Menu 
      handleChangeMenu={props.handleChangeMenu} 
      menus={props.menuList} 
      menuType={props.menuType} 
    />
  )
}

MenuBarRight.propTypes = {
  handleChangeMenu: PropTypes.func.isRequired,
  menuList: PropTypes.array.isRequired,
  menuType: PropTypes.string.isRequired
}

MenuBarRight.defaultProps = {
}

export default MenuBarRight
