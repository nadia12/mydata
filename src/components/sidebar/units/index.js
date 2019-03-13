import { SidebarList, Icon } from './style'
import React from 'react'

const Sidebar = (props) => {
  const { sidebarItems, pathname } = props
  return (
    <SidebarList>
      { Object.values(sidebarItems).map((items, idx) => (
        <div key={`sidebar-key-${idx}`}>
          { 
            Object.values(items).map((item) => (

              <div key={item.alt} title={item.alt} alt={item.alt} id={item.alt}>
                {/* <div className={`li-nested-sidebar ${ pathname === item.href ? 'is-selected' : '' }`} > */}
                <Icon>
                  { item.logo({ color: pathname === item.href ? '#262831' : '#9ea1b4', isSelected: pathname === item.href }) }
                </Icon>
                {/* </div> */}
              </div>
              
            )) 
          }
        </div>
        ))
      }
    </SidebarList>
  )
}

Sidebar.propTypes = {
  sidebarItems: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
}

export default Sidebar
