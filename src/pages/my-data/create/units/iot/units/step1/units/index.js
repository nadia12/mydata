import { H3Styled, ColumnStyled } from './style'
import React from 'react'
import { Label } from 'volantis-ui'
import {
  radioLists
} from '../constant'
import RadioGroup from '../../../../../../../../components/radio-group'

const StepOneIot = (props) => {
  const { handleChangeInput, fields } = props
  return (
    <>
      <H3Styled>Device Type</H3Styled>
      <ColumnStyled>
        Please select your IoT Device type that you want to connect to the system.
      </ColumnStyled>
      <ColumnStyled>
        <Label>Which device type do you want to use?</Label>
        <RadioGroup handleChangeInput={() => null} value={fields.deviceType || 'sensor'} name="deviceType" radioLists={radioLists} />
      </ColumnStyled>
    </>
  )
}

StepOneIot.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired
}

export default StepOneIot
