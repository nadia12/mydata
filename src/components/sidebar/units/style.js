import styled from 'styled-components'
import colors from 'Asset/css/colors'

export const SidebarList = styled.div`
  height: 100%;
  width: 4rem;
  position: fixed;
  overflow: hidden;
  color: #9ea1b4;
  margin: 0 auto;
  background-color: #1b1c21;
  padding: 2rem 0 0 0;
  list-style-type: none;
  text-align: center;
  z-index: 3;
`

export const SidebarListSection = styled.div`
  display: block;
  border-bottom: 2px solid #262831;
  outline: 0;
  cursor: pointer; 
    .is-selected {
      background-color: ${colors.gold};
    }
`

export const SidebarListItem = styled.div`
  padding: 1em;
  cursor: pointer;
    &:hover {
      background-color: ${colors.gold};
    }
    svg {
      cursor: pointer;
    }
`

SidebarList.Section = SidebarListSection;
SidebarList.Item = SidebarListItem;