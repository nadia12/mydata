
import React from 'react'
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'
import {
  Button,
} from 'volantis-ui'

// import colors from 'Asset/css/colors'
// import {
//   TextStyled,
// } from 'GlobalComponent/icon-label/units/style'

const IconLabel = props => {
  const {
    icon: Icon,
    text,
    label,
  } = props

  return (
    <CopyToClipboard text={text}>
      <Button
        label={label}
        icon={props => <Icon {...props} width={16} />}
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
