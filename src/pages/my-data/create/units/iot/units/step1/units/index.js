import React from 'react'
import {
  Label,
  Subtitle,
  Body,
  Radio,
} from 'volantis-ui'

import RadioGroup from 'GlobalComponent/radio-group'
import {
  H3Styled,
  Cols,
} from 'Pages/my-data/create/units/style'
import {
  RADIO_LISTS,
} from 'Pages/my-data/create/units/iot/units/step1/constant'

const StepOneIot = props => {
  const {
    handleChangeInput,
    fields,
  } = props

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          Device Type
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body colorType="secondary">
          Please select your IoT Device type that you want to connect to the system.
        </Body>
      </Cols>
      <Cols padding={0}>
        <Label>WHICH DEVICE TYPE DO YOU WANT TO USE?</Label>
        <RadioGroup
          handleChangeInput={() => handleChangeInput()}
          value={fields.deviceType || 'sensor'}
          name="deviceType"
          radioLists={RADIO_LISTS}
        />
      </Cols>
    </>
  )
}

StepOneIot.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default StepOneIot
