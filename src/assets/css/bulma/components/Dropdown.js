/* stylelint-disable no-descending-specificity */
import styled from 'styled-components'
import { rgba } from 'polished'
import Vars from '../utilities/vars'
import { fromTheme } from '../utilities/functions'


Vars.addDerivedDefault(vars => ({
  'dropdown-content-background-color': vars['white'],
  'dropdown-content-arrow': vars['link'],
  'dropdown-content-offset': '4px',
  'dropdown-content-radius': vars['radius'],
  'dropdown-content-shadow': `0 2px 3px ${rgba(vars['black'], 0.1)}, 0 0 0 1px ${rgba(vars['black'], 0.1)}`,
  'dropdown-content-z': 20,

  'dropdown-item-color': vars['grey-dark'],
  'dropdown-item-hover-color': vars['black'],
  'dropdown-item-hover-background-color': vars['background'],
  'dropdown-item-active-color': vars['link-invert'],
  'dropdown-item-active-background-color': vars['link'],

  'dropdown-divider-background-color': vars['border'],
}))
const defaultProps = { theme: Vars.getVariables() }

export const DropdownMenu = styled.div`
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: ${fromTheme('dropdown-content-offset')};
  position: absolute;
  top: 100%;
  z-index: ${fromTheme('dropdown-content-z')};
`
DropdownMenu.defaultProps = defaultProps

export const Dropdown = styled.div`
  display: inline;
  position: relative;
  vertical-align: top;
  &.is-active,
  &.is-hoverable:hover {
    ${/* sc-custom ".dropdown-menu" */DropdownMenu} {
      display: block;
    }
  }
  &.is-right {
    ${/* sc-custom ".dropdown-menu" */DropdownMenu} {
      left: auto;
      right: 0;
    }
  }
  &.is-up {
    ${/* sc-custom ".dropdown-menu" */DropdownMenu} {
      bottom: 100%;
      padding-bottom: ${fromTheme('dropdown-content-offset')};
      padding-top: initial;
      top: auto;
    }
  }
`
Dropdown.defaultProps = defaultProps
Dropdown.Menu = DropdownMenu

export const DropdownContent = styled.div`
  background-color: ${fromTheme('dropdown-content-background-color')};
  border-radius: ${fromTheme('dropdown-content-radius')};
  box-shadow: ${fromTheme('dropdown-content-shadow')};
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`
DropdownContent.defaultProps = defaultProps
Dropdown.Content = DropdownContent

export const DropdownItem = styled.a`
  color: ${fromTheme('dropdown-item-color')};
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;
  a& {
    padding-right: 3rem;
    white-space: nowrap;
    &:hover {
      background-color: ${fromTheme('dropdown-item-hover-background-color')};
      color: ${fromTheme('dropdown-item-hover-color')};
    }
    &.is-active {
      background-color: ${fromTheme('dropdown-item-active-background-color')};
      color: ${fromTheme('dropdown-item-active-color')};
    }
  }
`
DropdownItem.defaultProps = defaultProps
Dropdown.Item = DropdownItem

export const DropdownDivider = styled.hr`
  background-color: ${fromTheme('dropdown-divider-background-color')};
  border: none;
  display: block;
  height: 1px;
  margin: 0.5rem 0;
`
DropdownDivider.defaultProps = defaultProps
Dropdown.Divider = DropdownDivider
