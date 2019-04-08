import React from 'react';
import PropTypes from 'prop-types';
import { ApiEndpointStyle } from './style'

const ApiEndpoint = props => {
  return (
    <ApiEndpointStyle>
      <ApiEndpointStyle.Header><span>API ENDPOINTS</span></ApiEndpointStyle.Header>
      {
        props.endpoints && props.endpoints.length > 0 && props.endpoints.map(({ url, type }, idx) => (
          <ApiEndpointStyle.Content key={idx}>
            <div>{idx + 1}</div>
            <ApiEndpointStyle.Url>{url}</ApiEndpointStyle.Url>
            <ApiEndpointStyle.Type>{type}</ApiEndpointStyle.Type>
            <div className="is-pulled-right has-text-gold">
              <ApiEndpointStyle.Tooltip>
                {/* <CopyText text={url} /> */}
                <span className="tooltiptext-api-endpoints">Copied</span>
              </ApiEndpointStyle.Tooltip>
            </div>
          </ApiEndpointStyle.Content>
        ))
      }
     </ApiEndpointStyle>
  )
}

ApiEndpoint.propTypes = {
  endpoints: PropTypes.array
}

ApiEndpoint.defaultProps = {
  endpoints: [{url: 'xxxx', type: 'yyyy'}]
}

export default ApiEndpoint
 