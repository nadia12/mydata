import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Vars from '../utilities/vars'
import minireset from './minireset'
import getGeneric from './generic'
import Helpers from './helper'

const BulmaStyledContainer = styled.div`
  ${Helpers}
`

class BulmaStyledTheme extends React.PureComponent {
  static propTypes = {
    overrides: () => {},
  }

  static defaultProps = {
    overrides: {},
  }

  componentWillMount() {
    this.vars = Vars.getVariables(this.props.overrides)
    return createGlobalStyle`
      ${minireset}
      ${getGeneric(this.vars)}
    `
  }

  vars = Vars.getVariables();

  render() {
    const { overrides, ...props } = this.props
    return (
      <ThemeProvider theme={this.vars}>
        <BulmaStyledContainer {...props} />
      </ThemeProvider>
    )
  }
}

export default BulmaStyledTheme
