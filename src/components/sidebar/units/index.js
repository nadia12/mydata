import React from 'react'
import PropTypes from 'prop-types'
import colors from 'Asset/css/colors'

import { SidebarList } from './style'

const Sidebar = props => {
  const { sidebarItems, pathname } = props

  return (
    <SidebarList>
      { Object.values(sidebarItems).map((items, idx) => (
        <SidebarList.Section key={`sidebar-key-${idx}`}>
          {
            Object.values(items).map(item => (
              <SidebarList.Item
                key={item.alt}
                title={item.alt}
                alt={item.alt}
                id={item.alt}
                className={`${pathname === item.href ? 'is-selected' : ''}`}
              >
                {
                  item.logo({
                    color: pathname === item.href ? colors.black : colors.gray,
                    isSelected: pathname === item.href,
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
  pathname: PropTypes.string,
}

Sidebar.defaultProps = {
  pathname: '',
}
export default Sidebar
