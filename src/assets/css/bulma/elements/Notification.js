/* stylelint-disable no-descending-specificity */
import styled, { css } from 'styled-components'
import Vars from '../utilities/vars'
import { block } from '../utilities/mixins'
import { fromTheme } from '../utilities/functions'
import Button from './Button'
import Delete from './Delete'
import Title from './Title'
import Subtitle from './Subtitle'
import Content from './Content'
import { DropdownItem } from '../components/Dropdown'

Vars.addDerivedDefault(vars => ({
  'notification-background-color': vars['background'],
  'notification-radius': vars['radius'],
  'notification-padding': '1.25rem 2.5rem 1.25rem 1.5rem',
}))

const colorClasses = props => Object.entries(props.theme.colors).reduce((acc, [name, [color, color_invert]]) => css`
  ${acc}
  &.is-${name} {
    background-color: ${color};
    color: ${color_invert};
  }
`, '')

const Notification = styled.div`
  ${block}
  background-color: ${fromTheme('notification-background-color')};
  border-radius: ${fromTheme('notification-radius')};
  padding: ${fromTheme('notification-padding')};
  position: relative;
  a:not(${Button}):not(${DropdownItem}) { /* stylelint-disable-line */
    color: currentColor;
    text-decoration: underline;
  }
  strong {
    color: currentColor;
  }
  code,
  pre {
    background: ${fromTheme('white')};
  }
  pre code {
    background: transparent;
  }
  & > ${Delete} { /* stylelint-disable-line */
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
  ${/* sc-custom '.title' */Title},
  ${/* sc-custom '.subtitle' */Subtitle},
  ${/* sc-custom '.content' */Content} {
    color: currentColor;
  }
  ${colorClasses}
`
Notification.defaultProps = { theme: Vars.getVariables() }

export default Notification
