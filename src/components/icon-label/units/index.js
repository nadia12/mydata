
import React from 'react';
import PropTypes from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'
import { TextStyled } from './style';

const IconLabel = (props) => {
  const { icon: Icon, text, label } = props
  return (
    <CopyToClipboard text={text}>
      <TextStyled data-tooltip="copied to clipboard" className="copy-text" role="button" tabIndex="-1">
        {
          Icon && <Icon width={18} height={18} color="#ffd77b" />
        }
        &nbsp;
        {label}
      </TextStyled>
    </CopyToClipboard>
  )
}

IconLabel.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default IconLabel
