import { H3Styled, Cols } from '../../../../style'
import React from 'react'
import {
  Label, Subtitle, Body,
  Radio
} from 'volantis-ui'
import {
  radioLists
} from '../constant'
import RadioGroup from '../../../../../../../../components/radio-group'

const StepOneIot = (props) => {
  const { handleChangeInput, fields } = props
  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          Device Type
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          Please select your IoT Device type that you want to connect to the system.
        </Body>
      </Cols>
      <Cols padding={0}>
        <Label>WHICH DEVICE TYPE DO YOU WANT TO USE?</Label>
        <RadioGroup handleChangeInput={() => null} value={fields.deviceType || 'sensor'} name="deviceType" radioLists={radioLists} />
      </Cols>
    </>
  )
}

StepOneIot.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default StepOneIot
