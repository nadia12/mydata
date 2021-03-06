import React from 'react'
import PropTypes from 'prop-types'
import { ArrowDroprightIcon } from 'volantis-icon'
import { MenuStyle } from './style'

const handleChangeParent = (props, menu) => {
  const val = props.menuType === 'right-click' ? menu.menu : menu.value
  props.handleChangeMenu(val)
}

const handleChangeChild = (props, child) => {
  const { menuType, handleChangeMenu } = props

  const action = menuType === 'right-click' ? handleChangeMenu(child.menu, child.value)
    : handleChangeMenu(child.value)

  return action
}

const Menu = props => {
  const { menus } = props

  return (
    <MenuStyle>
      <MenuStyle.Ul>
        {
          !!menus && menus.length > 0 && menus.map((menu, idx) => (
            <li key={idx} className={`li-list-item ${menu.hasBottom ? 'bottom-border' : ''}`}>
              <div
                role="presentation"
                className={`div-item${menu.disable ? ' disable' : ''}`}
                onClick={() => handleChangeParent(props, menu)}
              >
                {menu.icon}
                <p className="menu-name">{menu.name}</p>
                { !!menu.child && menu.child.length > 0 && (<div className="arrow"><ArrowDroprightIcon /></div>)}
              </div>
              {
                !!menu.child && menu.child.length > 0 && (
                  <ul className="nested-ul-list-item">
                    {
                      menu.child.map((child, idx2) => (
                        <li key={idx2} className={`li-list-item ${child.hasBottom ? 'bottom-border' : ''}`}>
                          <div
                            role="presentation"
                            className="div-item"
                            onClick={() => handleChangeChild(props, child)}
                          >
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

Menu.propTypes = {
  menus: PropTypes.array.isRequired,
}

export default Menu
