import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Label,
  Subtitle,
  Body,
  Snippet,
} from 'volantis-ui'
import {
  CopyIcon,
} from 'volantis-icon'

import IconLabel from 'GlobalComponent/icon-label/units'
import {
  OptionTokenStyled,
  TabTokenStyled,
  BoxToken,
  BoxTokenContent,
  BoxTokenContentWordWrap,
} from 'Pages/my-data/create/units/iot/units/step3/units/style'
import {
  Cols,
} from 'Pages/my-data/create/units/style'
import {
  TOKEN_CONTENT,
  labelToken,
} from 'Pages/my-data/create/units/iot/units/step3/constant'

const SET_BOX_TOKEN = accessToken => ({
  HTTP: {
    URL: `http://http.iot.volantis.io/api/v1/${accessToken}/telemetry`,
    'USER ACCESS TOKEN': accessToken,
  },
  CoAP: {
    URL: `coap://coap.iot.volantis.io/api/v1/${accessToken}/telemetry`,
    'USER ACCESS TOKEN': accessToken,
  },
  MQTT: {
    HOST: 'mqtt.iot.volantis.io',
    TOPIC: 'v1/devices/me/telemetry',
    'USER ACCESS TOKEN': accessToken,
  },
})

const StepThreeIot = props => {
  const { token } = props
  const [currentToken, setCurrentToken] = useState('HTTP')
  const [boxToken] = useState(SET_BOX_TOKEN(token))

  const renderBox = () => {
    const renderItem = boxToken[currentToken]
    if (!renderItem) return null

    return (
      <>
        {Object.entries(renderItem).map(([key, value]) => (
          <Cols padding={16} key={key}>
            <BoxToken>
              <BoxTokenContent>
                <span>
                  <Label>{key}</Label>
                </span>
                <IconLabel text={value} icon={CopyIcon} label="Copy" />
              </BoxTokenContent>
              <BoxTokenContentWordWrap>
                <Snippet>{value}</Snippet>
              </BoxTokenContentWordWrap>
            </BoxToken>
          </Cols>
        ))}
      </>
    )
  }

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          Get Token
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body colorType="secondary">
          To connect your device, you need to get the token below so you can insert the token to your sensor/broker
        </Body>
      </Cols>
      <Cols padding={16}>
        <TabTokenStyled>
          {
            labelToken.map(label => (
              <OptionTokenStyled key={label} isSelected={currentToken === label} onClick={() => setCurrentToken(label)}>
                {label}
              </OptionTokenStyled>
            ))
          }
        </TabTokenStyled>
      </Cols>
      {renderBox()}
      <Cols padding={0}>
        { Object.entries(TOKEN_CONTENT[currentToken]).map(([key, value], idx) => (
          <React.Fragment key={idx}>
            <Cols padding={10}>
              <Label>
                {key}
              </Label>
            </Cols>
            <Cols padding={16}>
              <Body colorType="white">
                {value}
              </Body>
            </Cols>
          </React.Fragment>
        ))}
      </Cols>
    </>
  )
}

StepThreeIot.propTypes = {
  token: PropTypes.string.isRequired,
}

export default StepThreeIot
