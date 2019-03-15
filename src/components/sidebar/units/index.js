import { SidebarList } from './style'
import React from 'react'

const Sidebar = (props) => {
  const { sidebarItems, pathname } = props
  return (
    <SidebarList>
      { Object.values(sidebarItems).map((items, idx) => (
        <SidebarList.Section key={`sidebar-key-${idx}`}>
          { 
            Object.values(items).map((item) => (
              <SidebarList.Item 
                key={item.alt} 
                title={item.alt} 
                alt={item.alt} 
                id={item.alt}
                className={`${ pathname === item.href ? 'is-selected' : ''  }`}
              >
                { item.logo({ color: pathname === item.href ? '#262831' : '#9ea1b4', isSelected: pathname === item.href }) }
              </SidebarList.Item>
            )) 
          }
        </SidebarList.Section>
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
