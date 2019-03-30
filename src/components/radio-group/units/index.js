import { RadioInline, LabelStyled } from './style'
import React from 'react'
import {
  RadioButtonCheckedIcon,
  RadioButtonEmptyIcon
} from 'volantis-icon'

const RadioGroup = (props) => {
  const { name, radioLists, value, handleChangeInput } = props
  return (
    radioLists.map((chk, idx) => (
      <RadioInline cursorDisabled={chk.disabled} key={idx} onClick={() => handleChangeInput({ key: name, value: chk.value })}>
        {
          value === chk.value && !chk.disabled ? <RadioButtonCheckedIcon color="#ffd77b" /> : <RadioButtonEmptyIcon />
        }
        <LabelStyled cursorDisabled={chk.disabled}>{` ${chk.label}`}</LabelStyled>
        <br />
      </RadioInline>
    ))
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  radioLists: PropTypes.array.isRequired,
  value: PropTypes.string,
  handleChangeInput: PropTypes.func.isRequired
}

export default RadioGroup
