import { H3Styled, ColumnStyled, OptionTokenStyled, TabTokenStyled, BoxToken, BoxTokenContent, BoxTokenContentWordWrap } from './style'
import React, { useState } from 'react'
import { Label } from 'volantis-ui'
import { CopyIcon } from 'volantis-icon'
import {
  TOKEN_CONTENT,
  labelToken
} from '../constant'
import IconLabel from '../../../../../../../../components/icon-label/units';
// import RadioGroup from '../../../../radio-group'

const SET_BOX_TOKEN = (accessToken) => ({
  HTTP: {
    URL: `http://http.iot.volantis.io/api/v1/${accessToken}/telemetry`,
    'USER ACCESS TOKEN': accessToken
  },
  CoAP: {
    URL: `coap://coap.iot.volantis.io/api/v1/${accessToken}/telemetry`,
    'USER ACCESS TOKEN': accessToken
  },
  MQTT: {
    HOST: 'mqtt.iot.volantis.io',
    TOPIC: 'v1/devices/me/telemetry',
    'USER ACCESS TOKEN': accessToken
  }
});

const StepThreeIot = (props) => {
  const { token } = props
  const [currentToken, setCurrentToken] = useState('HTTP')
  const [boxToken, setBoxToken] = useState(SET_BOX_TOKEN(token))
  
  const renderBox = () => {
    const renderItem = boxToken[currentToken];
    if (typeof renderItem === 'undefined' || renderItem === null) return null;
    return (
      <>
        {Object.entries(renderItem).map(([key, value]) => (
          <ColumnStyled key={key}>
            <BoxToken>
              <BoxTokenContent>
                <span>
                  <Label>{key}</Label>
                </span>
                {/* <span className="tooltip">
                  <CopyText text={value} />
                  <span className="tooltiptext">Copied</span>
                </span> */}
                <IconLabel text={value} icon={CopyIcon} label="Copy"/>
              </BoxTokenContent>
              <BoxTokenContentWordWrap>
                <code>{value}</code>
              </BoxTokenContentWordWrap>
            </BoxToken>
          </ColumnStyled>
        ))}
      </>
    );
  }
  return (
    <>
      <H3Styled>Get Token</H3Styled>
      <ColumnStyled>
        To connect your device, you need to get the token below so you can insert the token to your sensor/broker
      </ColumnStyled>
      <ColumnStyled>
        <TabTokenStyled>
          {
            labelToken.map((label) => (
              <OptionTokenStyled key={label} isSelected={currentToken === label} onClick={() => setCurrentToken(label)}>
                {label}
              </OptionTokenStyled>
            ))
          }
        </TabTokenStyled>
      </ColumnStyled>
      {renderBox()}
      <ColumnStyled>
        { Object.entries(TOKEN_CONTENT[currentToken]).map(([key, value], idx) => (
          <React.Fragment key={idx}>
            <div className="column is-12 sub-title">
              {key}
            </div>
            <div className="column is-12 sub-content">
              {value}
            </div>
          </React.Fragment>))}
      </ColumnStyled>
    </>
  )
}

StepThreeIot.propTypes = {
  token: PropTypes.string.isRequired
}

export default StepThreeIot
