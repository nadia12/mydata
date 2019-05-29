import React from 'react'
import PropTypes from 'prop-types'
import {
  RadioButtonCheckedIcon,
  RadioButtonEmptyIcon,
} from 'volantis-icon'

import {
  COLORS,
} from 'Config/constants'

import {
  RadioInline,
  LabelStyled,
} from 'GlobalComponent/radio-group/units/style'

const RadioGroup = props => {
  const {
    name,
    radioLists,
    value,
    handleChangeInput,
  } = props

  return (
    radioLists.map((chk, idx) => (
      <RadioInline cursorDisabled={chk.disabled} key={idx} onClick={() => handleChangeInput({ key: name, value: chk.value })}>
        {
          value === chk.value && !chk.disabled
            ? <RadioButtonCheckedIcon color={COLORS.gold} />
            : <RadioButtonEmptyIcon />
        }
        <LabelStyled cursorDisabled={chk.disabled}>{` ${chk.label}`}</LabelStyled>
        <br />
      </RadioInline>
    ))
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  radioLists: PropTypes.array.isRequired,
  value: PropTypes.string,
  handleChangeInput: PropTypes.func.isRequired,
}

RadioGroup.defaultProps = {
  name: '',
}

export default RadioGroup
