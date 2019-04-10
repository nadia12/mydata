import React from 'react'
import PropTypes from 'prop-types'
import { ApiTokenStyle } from './style'

const ApiToken = props => (
  <ApiTokenStyle>
    <ApiTokenStyle.Header>
      <span>ACCESS TOKEN</span>
      <ApiTokenStyle.Copy>
        <ApiTokenStyle.Tooltip>
          {/* <CopyText text={props.accessToken} /> */}
          <span>Copied</span>
        </ApiTokenStyle.Tooltip>
      </ApiTokenStyle.Copy>
    </ApiTokenStyle.Header>
    <ApiTokenStyle.Content>
      <div>{props.getAccessToken()}</div>
    </ApiTokenStyle.Content>
  </ApiTokenStyle>
)

ApiToken.propTypes = {
  getAccessToken: PropTypes.func,
}

ApiToken.defaultProps = {
  getAccessToken: () => {},
}

export default ApiToken
