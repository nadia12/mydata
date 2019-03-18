import { SidebarList } from './style'
import React from 'react'
import colors from '../../../assets/css/colors'

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
                { 
                  item.logo({ 
                    color: pathname === item.href ? colors.black : colors.gray, 
                    isSelected: pathname === item.href 
                  }) 
                }
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
