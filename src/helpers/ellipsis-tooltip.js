// Ellipsis With Tooltip;
// source: https://github.com/amirfefer/react-ellipsis-with-tooltip/blob/master/src/index.js

import React from 'react'
import { Tooltip } from 'volantis-ui'
import PropTypes from 'prop-types'

const ellipsisDefaultStyle = {
  overflow: 'hidden',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all',
}

class EllipisWithTooltip extends React.Component {
  state = {
    hasOverflowingChildren: false,
    text: undefined,
  }

  updateOverflow = event => {
    const el = event.target
    const { hasOverflowingChildren } = this.state

    if (!hasOverflowingChildren && el.scrollWidth > el.clientWidth) {
      const expectedLength = el.clientWidth * 0.11
      this.setState({
        hasOverflowingChildren: true,
        text: `${el.innerText.substring(0, expectedLength)}...`,
      })
    }
  }

  refCallback = element => {
    if (element) {
      const expectedLength = element.clientWidth * 0.11
      if (element.innerText.length > Math.round(expectedLength)) {
        this.setState({
          hasOverflowingChildren: true,
          text: `${element.innerText.substring(0, expectedLength)}...`,
        })
      } else {
        this.setState({ text: element.innerText })
      }
    }
  }

  render() {
    const { hasOverflowingChildren, text } = this.state
    const {
      children,
      position,
    } = this.props
    const ellipsisStyle = { ...ellipsisDefaultStyle }

    return hasOverflowingChildren ? (
      <>
        <Tooltip message={children} position={position}>
          {text}
        </Tooltip>
      </>
    ) : (
      <div style={ellipsisStyle} onMouseEnter={this.updateOverflow} ref={this.refCallback}>
        {text || children}
      </div>
    )
  }
}

EllipisWithTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
}

EllipisWithTooltip.defaultProps = {
  position: 'right',
}

export default EllipisWithTooltip
