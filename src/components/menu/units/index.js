
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDroprightIcon } from 'volantis-icon';
import { MenuStyle } from './style'

const Menu = (props) => {
  return (
    <MenuStyle>
      <MenuStyle.Ul>
        {
          props.menus && props.menus.length > 0 && props.menus.map((menu, idx) => (
            <li key={idx} className={`li-list-item ${menu.hasBottom ? 'bottom-border' : ''}` }>
              <div role="button" className={`div-item${menu.disable ? ' disable' : ''}`} onClick={() => props.handleChangeMenu(menu.value) }>
                {menu.icon}
                <p className="menu-name">{menu.name}</p>
                { menu.child.length > 0 && (<div className="arrow"><ArrowDroprightIcon /></div>)}
              </div>
              {
                menu.child.length > 0 &&
                (
                  <ul className="nested-ul-list-item">
                    {
                      menu.child.map((child, idx2) => (
                        <li key={idx2} className={`li-list-item ${child.hasBottom ? 'bottom-border' : ''}` }>
                          <div role="button" className="div-item" onClick={() => props.handleChangeMenu(child.value) }>
                            {child.icon}
                            <p className="menu-name">{child.name}</p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
            </li>
          ))
        }
      </MenuStyle.Ul>
    </MenuStyle>
  )
}

Menu.defaultProps = {
  handleChangeMenu: null,
}


Menu.propTypes = {
  menus: PropTypes.array.isRequired,
  handleChangeMenu: PropTypes.func
}

export default Menu




