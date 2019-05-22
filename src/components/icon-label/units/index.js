
import React from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'
import {
  Button,
} from 'volantis-ui'

const IconLabel = props => {
  const {
    icon,
    text,
    label,
  } = props

  return (
    <CopyToClipboard text={text}>
      <Button
        label={label}
        icon={props => <icon {...props} width={16} />}
        size="compact"
        theme="no-border"
      />
    </CopyToClipboard>
  )
}

IconLabel.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default IconLabel
