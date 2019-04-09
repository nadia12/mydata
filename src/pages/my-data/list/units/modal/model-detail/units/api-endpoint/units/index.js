import React from 'react';
import PropTypes from 'prop-types';
import { ApiEndpointStyle } from './style'

const ApiEndpoint = props => {
  const { asset } = props.selected
  const { endPoints } = asset[0]

  return (
    <ApiEndpointStyle>
      <ApiEndpointStyle.Header><span>API ENDPOINTS</span></ApiEndpointStyle.Header>
      {
        !!endPoints && endPoints.length > 0 && endPoints.map(({ url, type }, idx) => (
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
  selected: PropTypes.object.isRequired,
}

ApiEndpoint.defaultProps = {
}

export default ApiEndpoint
