import React from 'react';
import PropTypes from 'prop-types';
import { ApiTokenStyle } from './style'

const ApiToken = props => {
  return (
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
        <div>{props.accessToken}</div>
      </ApiTokenStyle.Content>
    </ApiTokenStyle>
  )
}

ApiToken.propTypes = {
  accessToken: PropTypes.string
}

ApiToken.defaultProps = {
  accessToken: 'dwferfrefre'
}

export default ApiToken
 